import Button from '../Button'
import { Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import BreadCrumb from '../BreadCrumb';
import { createProject } from '../../server/script';

export default function ProjectCreate() {
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [projectDescription, setProjectDescription] = useState("");
	const [errors, setErrors] = useState({})
	const navigate = useNavigate();

	function handleSubmit(event){
		event.preventDefault();
		const validationErrors = validateForm();
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length > 0) {
			return;
		}

		const formData = new FormData();
		formData.append('title', title);

		formData.append('description', projectDescription);
		if (image) {
			formData.append('image', image);
		}
		createProject(formData)
			.then(() => {
				navigate('/projects');
			})
			.catch(e => {
				setErrors({
					send: e.message === 'NetworkError when attempting to fetch resource.' ? 'Ошибка отправки! Не удалось подключиться к серверу' : e.message});
		})
	}

	function validateForm() {
		const newErrors = {}
		if (!title.trim()) newErrors.title = "Название обязательно";
		if (title.length > 255)
			newErrors.title = "Название не должно превышать 255 символов";
		if (!projectDescription.trim()) newErrors.description = "Описание обязательно";
		return newErrors
	}

	return (
		<div className='container'>
			<h1>Созднаие проекта</h1>
			<BreadCrumb />
			<form onSubmit={handleSubmit}>
				<div className='mb-3'>
					<img src='...' alt='...' width='150' height='150' />
				</div>
				<div className='mb-3'>
					<label htmlFor='inputProjectTitle' className='form-label'>
						Название
					</label>
					<input
						type='text'
						className='form-control'
						id='inputProjectTitle'
						aria-describedby='inputProjectTitleHelp'
						onChange={e => setTitle(e.target.value)}
					/>
					{errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}
					<div id='inputProjectTitleHelp' className='form-text'>
						Не более 255 символов
					</div>
				</div>
				<div className='mb-3'>
					<label htmlFor='inputDescription' className='form-label'>
						Описание проекта
					</label>
					<textarea
						type='textarea'
						className='form-control'
						id='inputDescription'
						onChange={e => setProjectDescription(e.target.value)}
					/>
					{errors.description && (
						<div style={{ color: 'red' }}>{errors.description}</div>
					)}
				</div>
				<div className='mb-3'>
					<label htmlFor='inputImage' className='form-label'>
						Новая фотография
					</label>
					<input
						id='InputImage'
						type='file'
						accept='image/*'
						onChange={e => setImage(e.target.files[0])}
						style={{ display: 'block' }}
					/>
				</div>
				<Link to='/projects' className='btn btn-secondary me-1'>
					Назад
				</Link>
				<Button type='submit' className='btn btn-primary'>
					Сохранить
				</Button>
				{errors.send && <div style={{ color: 'red' }}>{errors.send}</div>}
			</form>
		</div>
	)
}

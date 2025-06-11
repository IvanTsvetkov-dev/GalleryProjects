import Button from '../Button'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import BreadCrumb from '../BreadCrumb'
import { fetchProject, updateProject} from '../../server/script'
import NotFoundPage from '../NotFoundPage'

export default function ProjectEdit() {
	const { id } = useParams();
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [projectDescription, setProjectDescription] = useState('');
	const [deleteImage, setDeleteImage] = useState(false);
	const [load, setLoad] = useState(false);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		fetchProject(id).then(data => {
			setTitle(data.title);
			setImage(data.image);
			setProjectDescription(data.description);
			setLoad(true);
		}).catch((e) =>{
			setErrors({ fetch: e.message });
	})
	}, [id])

	function handleSubmit(event){
		event.preventDefault();
		const validationErrors = validateForm();
		setErrors(validationErrors)
		if (Object.keys(validationErrors).length > 0) {
			return
		}
		const formData = new FormData();
		formData.append('title', title);
	
		formData.append('description', projectDescription);
		if (deleteImage) {
			formData.append('image', '')
		} else if (image && typeof image !== 'string') {
			formData.append('image', image)
		}
		updateProject(id, formData)
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
		if (!title.trim()) newErrors.title = 'Название обязательно';
		if (title.length > 255)
			newErrors.title = 'Название не должно превышать 255 символов';
		if (!projectDescription.trim())
			newErrors.description = 'Описание обязательно';
		return newErrors
	}

	if (errors.fetch) {
		return <NotFoundPage />
	}

	return load && (
		<div className='container'>
			<h1>{'Редактирование проекта'}</h1>
			<BreadCrumb id={id} />
			<form onSubmit={handleSubmit}>
				<div className='mb-3'>
					<img
						src={image || null}
						alt='Фотография отстутствует'
						width='250'
						height='250'
					/>
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
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<div id='inputProjectTitleHelp' className='form-text'>
						Не более 255 символов
					</div>
					{errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}
				</div>
				<div className='mb-3'>
					<label htmlFor='inputDescription' className='form-label'>
						Описание проекта
					</label>
					<textarea
						className='form-control'
						id='inputDescription'
						value={projectDescription}
						onChange={e => setProjectDescription(e.target.value)}
					/>
					{errors.description && (
						<div style={{ color: 'red' }}>{errors.description}</div>
					)}
				</div>
				<div className='mb-3 form-check'>
					<input
						type='checkbox'
						className='form-check-input'
						id='CheckDeleteImage'
						disabled={id === undefined}
						checked={deleteImage}
						onChange={e => setDeleteImage(e.target.checked)}
					/>
					<label className='form-check-label' htmlFor='CheckDeleteImage'>
						Удалить фотографию
					</label>
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

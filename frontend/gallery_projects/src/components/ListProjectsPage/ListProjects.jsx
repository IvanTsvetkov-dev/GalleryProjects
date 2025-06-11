import ItemListProjects from './ItemListProjects'
import Button from '../Button'
import { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import ModalWindow from './ModalWindow'
import Breadcrumb from '../BreadCrumb'
import { fetchListProjects, deleteSelectedProjects } from '../../server/script'
import PaginationBar from './PaginationBar'

export default function ListProjects() {
	const [searchParams, setSearchParams] = useSearchParams()
	const pageFromUrl = Number(searchParams.get('page')) || 1
	const [currentPage, setCurrentPage] = useState(1)
	const [projects, setProjects] = useState([])
	const [countProjects, setCountProjects] = useState(0)
	const [checked, setChecked] = useState([])
	const [isOpenModalWindow, setModalWindow] = useState(false)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		setCurrentPage(pageFromUrl)
	}, [pageFromUrl])

	useEffect(() => {
		fetchListProjects(currentPage)
			.then(data => {
				if (!data) {
					setProjects([])
					return
				}
				setProjects(data.results)
				setCountProjects(data.count)
			})
			.catch(e => {
				if (e.message === 'NetworkError when attempting to fetch resource.') {
					setError('Не удалось подключиться к серверу')
				} else if (e.message === 'Проекты не найдены (404)'){
					navigate('/notFound')
					return
				}
				else {
					setError(e.message)
				}
				setProjects([])
			})
	}, [currentPage, navigate])

	function changeCheckBox(id) {
		if (checked.includes(id)) {
			setChecked(checked.filter(item => item !== id))
		} else {
			setChecked([...checked, id])
		}
	}

	async function onClickDeleteButton() {
		if (checked.length === 0) {
			setProjects(projects)
			return
		}
		await deleteSelectedProjects(checked)
		
		const data = await fetchListProjects(1)

		setProjects(data.results)
		setCountProjects(data.count)

		setChecked([])
	}

	function handlePageChange(page) {
		setSearchParams({ page })
		setCurrentPage(page)
	}

	return (
			<main className='container'>
				<h1>Проекты</h1>
				<Breadcrumb />
				<div className='d-flex justify-content-end my-3'>
					<div>
						<Link to='create' className='btn btn-primary me-2'>
							Добавить
						</Link>
						<Button
							type='button'
							className='btn btn-danger'
							onClick={() => (checked.length > 0 ? setModalWindow(true) : null)}
						>
							Удалить
						</Button>
						<ModalWindow
							isOpen={isOpenModalWindow}
							onClose={() => setModalWindow(false)}
							onConfirm={() => onClickDeleteButton()}
						></ModalWindow>
					</div>
				</div>
				<ul className='list-group mb-3'>
					{error && <div style={{ color: 'red' }}>{error}</div>}
					{projects.map(project => (
						<ItemListProjects
							key={project.id}
							id={project.id}
							checked={checked.includes(project.id)}
							onChange={() => {
								changeCheckBox(project.id)
							}}
						>
							{project.title}
						</ItemListProjects>
					))}
				</ul>
				<PaginationBar
					countRecords={countProjects}
					pageSize={5}
					onClick={handlePageChange}
				/>
			</main>
	)
}

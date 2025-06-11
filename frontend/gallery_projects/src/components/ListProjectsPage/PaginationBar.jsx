import { Link, useLocation } from 'react-router-dom'

export default function PaginationBar({ countRecords, pageSize, onClick }) {
	let links = []
	let total =
		countRecords % pageSize === 0
			? countRecords / pageSize
			: Math.floor(countRecords / pageSize) + 1
	const location = useLocation()

	for (let i = 1; i <= total; i++) {
		links.push(
			<li className='page-item' key={i}>
				<Link
					className='page-link'
					to={`${location.pathname}?page=${i}`}
					onClick={e => {
						e.preventDefault()
						onClick(i)
					}}
				>
				{i}
				</Link>
			</li>
		)
	}

	return (
		<nav aria-label='Page navigation example'>
			<ul className='pagination'>{links}</ul>
		</nav>
	)
}
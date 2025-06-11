import { Link, useLocation } from 'react-router-dom'

export default function Breadcrumb( { id }) {
	const location = useLocation()
	const pathnames = location.pathname.split('/').filter(Boolean)
	const displayPathnames = id !== undefined ? pathnames.slice(0, -1) : pathnames

	const pathToRussian = {
		'': 'Главная',
		projects: 'Проекты',
		create: 'Создание',
		edit: 'Редактирование',
	}
	return (
		<nav>
			<ol className='breadcrumb'>
				{displayPathnames.length === 0 ? (
					<li className='breadcrumb-item active' aria-current='page'>
						{pathToRussian['']}
					</li>
				) : (
					<>
						<li className='breadcrumb-item'>
							<Link to='/'>{pathToRussian['']}</Link>
						</li>
						{displayPathnames.map((name, index) => {
							const routeTo = `/${displayPathnames
								.slice(0, index + 1)
								.join('/')}`
							const isLast = index === displayPathnames.length - 1
							const displayName = pathToRussian[name] || name

							return isLast ? (
								<li
									key={name}
									className='breadcrumb-item active'
									aria-current='page'
								>
									{displayName}
								</li>
							) : (
								<li key={name} className='breadcrumb-item'>
									<Link to={routeTo}>{displayName}</Link>
								</li>
							)
						})}
					</>
				)}
			</ol>
		</nav>
	)
}

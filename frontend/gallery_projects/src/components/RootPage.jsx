import { Link } from 'react-router-dom';

export default function RootPage(){
    return (
			<div className='mt-5 d-flex flex-column align-items-center'>
				<h1>Добро пожаловать в Галлерею проектов!</h1>
				<div className="mt-4">
					<Link to='projects' className='btn btn-primary'>
						К проектам
					</Link>
				</div>
			</div>
		)
}
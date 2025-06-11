import { Link } from "react-router-dom"


export default function ItemListProjects({ children, id, checked, onChange }) {
	return (
		<li className='list-group-item d-flex align-items-center'>
			<input type='checkbox' className='me-1' checked={checked} onChange={onChange}/>
			<Link to={`edit/${id}`}>{children}</Link>
		</li>
	)
}
  
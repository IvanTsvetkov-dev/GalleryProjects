import { useState } from "react";
import { Link } from "react-router-dom"

export default function Header() {
	const [dateTime, setDateTime] = useState(new Date());

	setInterval(() => setDateTime(new Date()), 1000);

	return (
		<header>
		  <nav className="navbar bg-body-tertiary">









			
			<div className="container-fluid">
				<Link className="navbar-brand" to="/projects/?page=1">Gallery Project</Link>
				<span>Время: {dateTime.toLocaleTimeString()}</span>
			</div>
			</nav>
		</header>
	)
}

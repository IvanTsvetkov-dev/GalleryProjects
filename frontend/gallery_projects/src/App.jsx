import Header from './components/Header'
import ListProjects from './components/ListProjectsPage/ListProjects'
import ProjectCreate from './components/ProjectCreatePage/ProjectCreate'
import ProjectEdit from './components/ProjectEditPage/ProjectEdit'
import NotFound from './components/NotFoundPage'
import Root from './components/RootPage'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {
  return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Root />}></Route>
				<Route path='projects' element={<ListProjects />}></Route>
				<Route path='projects/edit/:id' element={<ProjectEdit />}></Route>
				<Route path='projects/create' element={<ProjectCreate />}></Route>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;

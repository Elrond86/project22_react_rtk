import './App.css'

import NavBar from './react/Nav/NavBar'
import MainPage from './react/Base/MainPage'

/** <></> entspricht <React.Fragment></React.Fragment> */

function App() {
	return (
		<>
			<div className='AppContainer'>
				<NavBar />
				<MainPage />
			</div>
		</>
	)
}

export default App

import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import NavBar from './pages/NavBar'
import MainPage from './pages/MainPage'

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

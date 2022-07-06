import React from 'react'

import { Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar'
import MainPage from './components/MainPage'

/** <></> entspricht <React.Fragment></React.Fragment> */

function App() {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path={'/'} element={<MainPage />} />
			</Routes>
		</>
	)
}

export default App

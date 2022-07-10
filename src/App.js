import React from 'react'

import { Route, Routes } from 'react-router-dom'

import NavBar from './pages/NavBar'
import MainPage from './pages/MainPage'
import UserManagement from './pages/UserManagementPage'
import TestPage from './pages/TestPage'

/** <></> entspricht <React.Fragment></React.Fragment> */

function App() {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path={'/'} element={<MainPage />} />

				<Route path={'/userManagement'} element={<UserManagement />} />
			</Routes>
		</>
	)
}

export default App

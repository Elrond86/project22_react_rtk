import React from 'react'

import { Route, Routes } from 'react-router-dom'

import PublicPage from './components/PublicPage'
import NavBar from './components/NavBar'

/** <></> entspricht <React.Fragment></React.Fragment> */

function App() {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path={'/'} element={<PublicPage />} />
			</Routes>
		</>
	)
}

export default App

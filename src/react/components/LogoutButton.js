import React from 'react'

import Button from 'react-bootstrap/Button'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import { useDispatch } from 'react-redux'
import { logoutUserAction } from '../../redux/authentication/AuthenticationSlices'

const { log } = console

export default function LogoutButton(props) {
	const dispatch = useDispatch()
	function handleLogout() {
		log('clicked LogoutButton in Mainpage')
		dispatch(logoutUserAction()) //sendet die Action, die wir definiert haben an den Store (und der dann an den Reducer oder so)
	}

	return (
		<div>
			<Button id='LogoutButton' variant='outline-info' active onClick={handleLogout}>
				Logout
			</Button>
		</div>
	)
}

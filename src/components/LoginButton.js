import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showLogin } from '../redux/features/AuthenticationSlice'

import { Button } from 'react-bootstrap'

//import { getShowLoginDialogAction } from '../actions/AuthenticationActions'

const { log } = console

export default function LoginButton(props) {
	let dispatch = useDispatch()

	function showLoginDialog() {
		log('clicked showLoginDialog')
		dispatch(showLogin()) //sendet die Action, die wir definiert haben an den Store (und der dann an den Reducer oder so)
	}

	return (
		<div>
			<Button
				id='OpenLoginDialogButton'
				variant='outline-secondary'
				active
				onClick={showLoginDialog}
			>
				Login
			</Button>
		</div>
	)
}

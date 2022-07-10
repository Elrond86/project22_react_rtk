import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showUserManagement } from '../../redux/slices/ui/UISlice'

import { Button } from 'react-bootstrap'

const { log } = console

export default function UserManagementButton(props) {
	let dispatch = useDispatch()

	function showManagement() {
		dispatch(showUserManagement()) //sendet die Action, die wir definiert haben an den Store (und der dann an den Reducer oder so)
	}

	return (
		<div>
			<Button id='OpenUserManagementButton">' variant='outline-info' onClick={showManagement}>
				UserManagement
			</Button>
		</div>
	)
}

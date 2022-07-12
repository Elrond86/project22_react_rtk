import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showUserManagement } from '../../redux/ui/UISlices'

import { Button } from 'react-bootstrap'

export default function UserManagementButton() {
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

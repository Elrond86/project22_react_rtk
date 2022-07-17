import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useDispatch } from 'react-redux'
import { logoutUserAction } from '../../../redux/authentication/AuthenticationSlices'

export default function LogoutButton() {
	const dispatch = useDispatch()
	function handleLogout() {
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

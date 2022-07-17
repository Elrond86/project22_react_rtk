import { useDispatch } from 'react-redux'
import { showLoginModal } from '../../../redux/ui/UISlices'

import { Button } from 'react-bootstrap'

export default function LoginButton() {
	let dispatch = useDispatch()

	function showLoginDialog() {
		dispatch(showLoginModal())
	}

	return (
		<div>
			<Button id='OpenLoginDialogButton' variant='outline-secondary' active onClick={showLoginDialog}>
				Login
			</Button>
		</div>
	)
}

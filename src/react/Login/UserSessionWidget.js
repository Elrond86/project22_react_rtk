import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { Key } from 'react-bootstrap-icons'
import Modal from 'react-bootstrap/Modal'

// import my reducers
import { showLoginModal, hideLoginModal } from '../../redux/ui/UISlices'

//import my components
import Login from './Login'

export default function BestLogin() {
	const dispatch = useDispatch()

	let uiState = useSelector(state => {
		return state['ui']
	})
	let UsersState = useSelector(state => {
		return state['auth']
	})
	let { showLoginDialog } = uiState
	if (showLoginDialog === undefined) {
		showLoginDialog = false
	}

	let { userLoading } = UsersState
	if (userLoading == 'done') {
		handleClose()
	}

	function handleClose() {
		dispatch(hideLoginModal())
	}

	function handleShow() {
		dispatch(showLoginModal())
	}

	return (
		<>
			<Button id='OpenLoginDialogButton' variant='primary' onClick={handleShow}>
				<Key size={20} /> Login
			</Button>

			<Modal show={showLoginDialog} onHide={handleClose} backdrop='static' keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title> LOGIN</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Login />
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

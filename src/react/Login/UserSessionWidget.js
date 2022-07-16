import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

// import my reducers
import { showLoginModal, hideLoginModal } from '../../redux/ui/UISlices'

//import my components
import Login from './Login'

export default function BestLogin() {
	/** to excecute actions */
	const dispatch = useDispatch()

	/** get State-Data from Redux Store */
	let uiState = useSelector(state => {
		return state['ui'] // returns the ui-Segment of the state
	})
	let UsersState = useSelector(state => {
		return state['auth'] // returns the auth-Segment of the state
	})
	//get ShowLoginDialog-Value from ui-Segment
	let { showLoginDialog } = uiState
	if (showLoginDialog === undefined) {
		showLoginDialog = false
	}
	//get userLoading-Value from UsersState-Segment
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
				Login
			</Button>

			<Modal show={showLoginDialog} onHide={handleClose} backdrop='static' keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>LOGIN</Modal.Title>
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

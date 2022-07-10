import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

// import my reducers
import { showLoginModal, hideLoginModal } from '../../redux/slices/ui/UISlice'

//import my components
import Login from '../components/Login'

export default function BestLogin() {
	/** to excecute actions */
	const dispatch = useDispatch()

	/** get State-Data from Redux Store */
	let UIState = useSelector(state => {
		return state['UI'] // returns the UI-Segment of the state
	})
	let UsersState = useSelector(state => {
		return state['users'] // returns the users-Segment of the state
	})
	//get ShowLoginDialog-Value from UI-Segment
	let { showLoginDialog } = UIState
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

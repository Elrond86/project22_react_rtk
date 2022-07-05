import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import { showLoginModal, hideLoginModal } from '../redux/slices/ui/UISlice'

function UserSessionWidget(props) {
	/** to excecute actions */
	const dispatch = useDispatch()

	/** get State-Data from Redux Store */
	let UIState = useSelector(state => {
		return state['UI'] // returns the UI-Segemt of the state
	})

	//get ShowLoginDialog-Value from UI-Segment
	let { showLoginDialog } = UIState
	if (showLoginDialog === undefined) {
		showLoginDialog = false
	}

	/* 
	const [credentials, setCredentials] = useState({
		userID: '',
		password: '',
	})
 */
	function handleClose(event) {
		dispatch(hideLoginModal())
	}

	function handleShow() {
		dispatch(showLoginModal())
	}

	const handleChange = event => {}

	const handleSubmit = event => {
		event.preventDefault()
		const userID = event.target.elements.userID.value
		const password = event.target.elements.password.value
		//dispatch(authExec({ userID, password }))
	}

	function handleLogout() {}

	let Btn
	if (props.user && props.user != null) {
		Btn = (
			<Button variant='primary' id='LogoutButton' onClick={handleLogout}>
				Logout
			</Button>
		)
	} else {
		Btn = (
			<Button variant='primary' id='OpenLoginDialogButton' onClick={handleShow}>
				Login
			</Button>
		)
	}

	let loginPending = props.loginPending
	if (loginPending === undefined) {
		loginPending = false
	}

	let isError = props.error
	if (isError === undefined) {
		isError = false
	}

	return (
		<>
			{Btn}

			<Modal show={showLoginDialog} onHide={handleClose}>
				<Modal.Header>
					<Modal.Title>Please Enter Credentials</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3' controlId='LoginUserIDInput'>
							<Form.Label>User ID</Form.Label>
							<Form.Control type='userID' placeholder='User ID' name='userID' onChange={handleChange} />
						</Form.Group>

						<Form.Group className='mb-3' controlId='LoginPasswordInput'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Password'
								name='password'
								onChange={handleChange}
							/>
						</Form.Group>

						<Button id='LoginButton' variant='primary' type='submit' onClick={handleSubmit}>
							Submit
						</Button>
						<Button variant='secondary' onClick={handleClose}>
							Close
						</Button>
						{isError && (
							<Form.Label style={{ color: 'red', marginLeft: '20px' }}>
								Invalid user ID or password
							</Form.Label>
						)}
						{loginPending && (
							<Spinner animation='border' variant='primary' style={{ marginLeft: '20px' }} />
						)}
					</Form>
				</Modal.Body>
				<Modal.Footer>Footer</Modal.Footer>
			</Modal>
		</>
	)
}

export default UserSessionWidget

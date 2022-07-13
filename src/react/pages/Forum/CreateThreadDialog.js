import React, { useEffect } from 'react'

//bootstrap
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import Stack from 'react-bootstrap/Stack'

//redux
import { useDispatch, useSelector } from 'react-redux'

//import my reducers
import { useCreateThreadMutation } from '../../../redux/forum/ForumSlice'
import { hideCreateThreadDialog, selectCreateThreadDialog } from '../../../redux/ui/UISlices'

export default function CreateThreadDialog() {
	const [createThread, createResult] = useCreateThreadMutation()
	const dispatch = useDispatch()
	const handleSubmit = function (event) {
		event.preventDefault()
		const newThread = {
			userID: event.target.elements.userID.value,
			userName: event.target.elements.userName.value,
			password: event.target.elements.password.value,
			isAdministrator: event.target.elements.isAdministrator.checked
		}
		createThread(newThread)
	}

	useEffect(() => {
		if (createResult.isSuccess) {
			createResult.reset()
			dispatch(hideCreateThreadDialog())
		}
	})

	const showCreateModal = useSelector(selectCreateThreadDialog)
	console.log('showCreateModal')
	console.log(showCreateModal)

	return (
		<Modal show={useSelector(selectCreateThreadDialog)} onHide={() => dispatch(hideCreateThreadDialog())}>
			<Modal.Header closeButton>
				<Modal.Title>Create New Thread</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit}>
				<CreateThreadBody />
				<Modal.Footer>
					<Button
						variant='secondary'
						id='CancelCreateForumThreadButton'
						onClick={() => dispatch(hideCreateThreadDialog())}
					>
						Cancel
					</Button>
					<Button type='submit' variant='primary' id='CreateForumThreadButton'>
						Create Thread
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

function CreateThreadAlert() {
	return null
}

function CreateThreadBody() {
	if (false) {
		return (
			<Modal.Body>
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			</Modal.Body>
		)
	}
	return (
		<Modal.Body>
			<Stack>
				<CreateThreadAlert />
				<FloatingLabel controlId='ForumThreadNameInput' label='Thread Name' className='mb-3'>
					<Form.Control type='text' name='ForumThreadNameInput' placeholder='Thread Name' />
				</FloatingLabel>
				<FloatingLabel controlId='ForumThreadDescriptionInput' label='Thread Beschreibung' className='mb-3'>
					<Form.Control type='text' name='ForumThreadDescriptionInput' placeholder='Thread Beschreibung' />
				</FloatingLabel>
			</Stack>
		</Modal.Body>
	)
}

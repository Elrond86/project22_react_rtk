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
import { useCreateMessageMutation } from '../../../redux/forum/ForumMessageSlice'
import { hideCreateThreadDialog, selectCreateThreadDialog } from '../../../redux/ui/UISlices'

export default function CreateMessageDialog() {
	const [createThread, createResult] = useCreateMessageMutation()
	const dispatch = useDispatch()
	const handleSubmit = function (event) {
		event.preventDefault()
		const newThread = {
			name: event.target.elements.ForumThreadNameInput.value,
			description: event.target.elements.ForumThreadDescriptionInput.value
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
	console.log('showCreateModal = useSelector(selectCreateThreadDialog)')
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

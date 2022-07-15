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

// import selectors
import { selectCreateMessageDialog } from '../../../redux/ui/UISlices'

//import my reducers
import { useCreateMessageMutation } from '../../../redux/forum/ForumMessageSlice'
import { hideCreateMessageDialog } from '../../../redux/ui/UISlices'

export default function CreateMessageDialog() {
	console.log('bin in CreateMessageDialog')
	const [createMessage, createResult] = useCreateMessageMutation()
	const dispatch = useDispatch()
	const handleSubmit = function (event) {
		event.preventDefault()
		const newThread = {
			name: event.target.elements.ForumThreadNameInput.value,
			description: event.target.elements.ForumThreadDescriptionInput.value
		}
		createMessage(newThread)
	}

	useEffect(() => {
		if (createResult.isSuccess) {
			createResult.reset()
			dispatch(hideCreateMessageDialog())
		}
	})

	const showCreateModal = useSelector(selectCreateMessageDialog)
	console.log('showCreateModal = useSelector(selectCreateMessageDialog)')
	console.log(showCreateModal)

	return (
		<Modal show={useSelector(selectCreateMessageDialog)} onHide={() => dispatch(hideCreateMessageDialog())}>
			<Modal.Header closeButton>
				<Modal.Title>Create New Message</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit}>
				<CreateMessageBody />
				<Modal.Footer>
					<Button
						variant='secondary'
						id='CancelCreateForumMessageButton'
						onClick={() => dispatch(hideCreateMessageDialog())}
					>
						Cancel
					</Button>
					<Button type='submit' variant='primary' id='CreateForumMessageButton'>
						Create Message
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

function CreateThreadAlert() {
	return null
}

function CreateMessageBody() {
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
				<FloatingLabel controlId='ForumMessageTitleInput' label='Message Title' className='mb-3'>
					<Form.Control type='text' name='ForumMessageTitleInput' placeholder='Message Title' />
				</FloatingLabel>
				<FloatingLabel controlId='ForumMessageTextInput' label='Message' className='mb-3'>
					<Form.Control type='text' name='ForumMessageTextInput' placeholder='Message' />
				</FloatingLabel>
			</Stack>
		</Modal.Body>
	)
}

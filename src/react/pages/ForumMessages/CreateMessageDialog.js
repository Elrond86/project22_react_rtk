import React, { useEffect } from 'react'

//bootstrap
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import Stack from 'react-bootstrap/Stack'
import InputGroup from 'react-bootstrap/InputGroup'

//redux
import { useDispatch, useSelector } from 'react-redux'

// import selectors
import { selectCreateMessageDialog, selectHandleThreadID } from '../../../redux/ui/UISlices'

//import my reducers
import { useCreateMessageMutation } from '../../../redux/forum/ForumMessageSlice'
import { hideCreateMessageDialog } from '../../../redux/ui/UISlices'

export default function CreateMessageDialog() {
	console.log('bin in CreateMessageDialog')
	const [createMessage, createResult] = useCreateMessageMutation()
	const dispatch = useDispatch()
	const threadID = useSelector(selectHandleThreadID)
	const handleSubmit = function (event) {
		event.preventDefault()
		const newMessage = {
			title: event.target.elements.ForumMessageTitleInput.value,
			text: event.target.elements.ForumMessageTextInput.value
			/* title: event.target.elements.title.value,
			text: event.target.elements.text.value */
		}
		createMessage(newMessage)
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
					<Form.Control type='text' name='ForumMessageTitleInput' placeholder='Eigener Title' />
				</FloatingLabel>

				<FloatingLabel controlId='ForumMessageTextInput' label='Message' className='mb-3'>
					<Form.Control
						as='textarea'
						type='text'
						name='ForumMessageTextInput'
						placeholder='Message'
						style={{ height: '150px' }}
					/>
				</FloatingLabel>
			</Stack>
		</Modal.Body>
	)
}

{
	/* <InputGroup class='w-100'>
<FloatingLabel controlId='ForumMessageTextInput' label='Message' className='mb-3'>
	<Form.Control as='textarea' type='text' name='ForumMessageTextInput' placeholder='Message' />
</FloatingLabel>
</InputGroup> */
}

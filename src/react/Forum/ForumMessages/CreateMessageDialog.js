import React, { useEffect } from 'react'

// utils
import { jlog, jsn } from '../../../utils/parseJSON'
import JsonHelper from '../../../utils/parseJSON'

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
import { selectCreateMessageDialog, selectHandleThreadID, selectHandleThreadName } from '../../../redux/ui/UISlices'

//import my reducers
import { useCreateMessageMutation } from '../../../redux/forum/ForumMessageSlice'
import { hideCreateMessageDialog } from '../../../redux/ui/UISlices'

export default function CreateMessageDialog() {
	var error = null
	const [createMessage, createResult] = useCreateMessageMutation()
	const dispatch = useDispatch()
	const parentThreadID = useSelector(selectHandleThreadID)
	const parentThreadName = useSelector(selectHandleThreadName)
	const handleSubmit = function (event) {
		event.preventDefault()
		const newMessage = {
			title: event.target.elements.ForumMessageTitleInput.value,
			text: event.target.elements.ForumMessageTextInput.value,
			forumThreadID: parentThreadID
			/* title: event.target.elements.title.value,
			text: event.target.elements.text.value */
		}
		console.log('createMessage for submit:')
		console.log(jsn(newMessage))
		createMessage(newMessage)
	}

	useEffect(() => {
		console.log('useEffect(): ')
		console.log(createResult)
		if (createResult.isSuccess) {
			error = null
			console.log(createResult.isSuccess)
			createResult.reset()
			dispatch(hideCreateMessageDialog())
		}
		if (createResult.error) {
			error = createResult.error
			console.log('error in createResult: ')
			console.log(jsn(error))
			console.log(jsn(error.data))
			console.log(jsn(error.status))
		}
	})

	return (
		<>
			<Modal show={useSelector(selectCreateMessageDialog)} onHide={() => dispatch(hideCreateMessageDialog())}>
				<Modal.Header closeButton>
					<Modal.Title>Create New Message, Error: {JSON.stringify(error)}</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit}>
					<CreateMessageBody error={error} threadID={parentThreadID} threadName={parentThreadName} />

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
		</>
	)
}

function CreateMessageAlert({ error }) {
	return <JsonHelper data={error} />
	/* if (error) return error.data */
	return null
}

function CreateMessageBody(props) {
	console.log('props von CreateMessageBody: ' + jsn(props))
	if (false) {
		return (
			<Modal.Body>
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			</Modal.Body>
		)
	}

	const text = JSON.stringify(props, null, 4)

	return (
		<Modal.Body>
			<Stack>
				<JsonHelper data={props} />
				<CreateMessageAlert error={props} />
				<FloatingLabel controlId='ForumMessageTitleInput' label='Message Title' className='mb-3'>
					<Form.Control type='text' name='ForumMessageTitleInput' placeholder='Eigener Title' />
				</FloatingLabel>

				<FloatingLabel controlId='ForumMessageTextInput' label='Message' className='mb-3'>
					<Form.Control
						as='textarea'
						type='text'
						name='ForumMessageTextInput'
						placeholder='Message'
						style={{ height: '125px' }}
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

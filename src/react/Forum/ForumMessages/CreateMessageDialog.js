//react
import { useEffect } from 'react'

// utils
import { jsn } from '../../../utils/parseJSON'

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
import { hideCreateMessageDialog } from '../../../redux/ui/UISlices'
import { useGetAllUsersQuery } from '../../../redux/users/userManagement'

// import selectors
import { selectCreateMessageDialog, selectHandleThreadID, selectHandleThreadName } from '../../../redux/ui/UISlices'

export default function CreateMessageDialog() {
	var error = undefined
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
		}

		createMessage(newMessage)
	}

	useEffect(() => {
		if (createResult.isSuccess) {
			createResult.reset()
			dispatch(hideCreateMessageDialog())
		}
		if (createResult.error) {
			error = createResult.error
		}
	})

	return (
		<>
			<Modal show={useSelector(selectCreateMessageDialog)} onHide={() => dispatch(hideCreateMessageDialog())}>
				<Modal.Header closeButton>
					<Modal.Title>Create New Message {JSON.stringify(error)}</Modal.Title>
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

function CreateMessageAlert() {
	const result = useGetAllUsersQuery()
	if (result.isError) {
		return jsn(result.error)
	}
	return null
}

function CreateMessageBody() {
	const result = useGetAllUsersQuery()
	if (result.isLoading) {
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
				<CreateMessageAlert />
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

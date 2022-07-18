/* eslint-disable */

//react
import { useEffect } from 'react'

//bootstrap
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Stack from 'react-bootstrap/Stack'

//redux
import { useDispatch, useSelector } from 'react-redux'

//import my reducers
import {
	useEditMessageMutation,
	useGetAllMessagesQuery,
	useCreateMessageMutation,
	errorToState
} from '../../../redux/forum/ForumMessageSlice'
import { hideCreateMessageDialog } from '../../../redux/ui/UISlices'

// import selectors
import { selectCreateMessageDialog, selectHandleThreadID, selectHandleThreadName } from '../../../redux/ui/UISlices'
import { selectError } from '../../../redux/forum/ForumMessageSlice'

export default function CreateMessageDialog() {
	const [createMessage, createResult] = useCreateMessageMutation()
	const dispatch = useDispatch()
	const parentThreadID = useSelector(selectHandleThreadID)
	const parentThreadName = useSelector(selectHandleThreadName)
	const handleSubmit = function (event) {
		event.preventDefault()
		const newMessage = {
			_id: messageID,
			title: event.target.elements.ForumMessageTitleInput.value,
			text: event.target.elements.ForumMessageTextInput.value
		}

		createMessage(newMessage)
	}

	useEffect(() => {
		if (createResult.isSuccess) {
			createResult.reset()
			dispatch(hideCreateMessageDialog())
		}
		if (createResult.error) {
			const error = createResult.error
			dispatch(errorToState(error))
		}
	})

	return (
		<>
			<Modal show={useSelector(selectCreateMessageDialog)} onHide={() => dispatch(hideCreateMessageDialog())}>
				<Modal.Header closeButton>
					<Modal.Title>Create New Message {JSON.stringify(useSelector(selectError))}</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit}>
					<CreateMessageBody error={selectError} threadID={parentThreadID} threadName={parentThreadName} />

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

function CreateMessageBody() {
	return (
		<Modal.Body>
			<Stack>
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

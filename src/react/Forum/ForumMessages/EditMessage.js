//bootstrap
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Stack from 'react-bootstrap/Stack'

//redux
import { useDispatch, useSelector } from 'react-redux'

//import my reducers
import { useEditMessageMutation, useGetAllMessagesQuery } from '../../../redux/forum/ForumMessageSlice'
import { hideEditMessageDialog } from '../../../redux/ui/UISlices'

// import selectors
import { selectEditMessageDialog, selectHandleMessageID } from '../../../redux/ui/UISlices'

export default function EditMessage() {
	const [editMessage] = useEditMessageMutation()
	const dispatch = useDispatch()
	const select = useSelector
	const messageID = select(selectHandleMessageID)
	/* const threadID = select(selectHandleThreadID) */
	const handleSubmit = function (event) {
		event.preventDefault()
		const changedMessage = {
			_id: messageID,
			title: event.target.elements.ForumMessageTitleInput.value,
			text: event.target.elements.ForumMessageTextInput.value
		}
		console.log(changedMessage)
		editMessage(changedMessage)
		dispatch(hideEditMessageDialog())
	}

	const showEditModal = select(selectEditMessageDialog)
	return (
		<Modal show={showEditModal} onHide={() => dispatch(hideEditMessageDialog())}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Thread</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit}>
				<EditThreadBody messageID={messageID} />
				<Modal.Footer>
					<Button
						variant='secondary'
						id='CancelEditForumMessageButton'
						onClick={() => dispatch(hideEditMessageDialog())}
						value='Cancel'
					>
						Cancel
					</Button>
					<Button as='input' type='submit' variant='primary' id='SaveForumMessageButton' value='Save' />
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

function EditThreadBody({ messageID }) {
	const { message: editMessage } = useGetAllMessagesQuery(undefined, {
		selectFromResult: ({ data }) => ({
			message: data.find(message => message._id === messageID)
		})
	})
	if (!editMessage) {
		return null
	}
	return (
		<Modal.Body>
			<Stack>
				<FloatingLabel controlId='ForumMessageTitleInput' label='Message Titel' className='mb-3'>
					<Form.Control
						type='text'
						name='ForumMessageTitleInput'
						placeholder='Message Titel'
						defaultValue={editMessage.title}
					/>
				</FloatingLabel>
				<FloatingLabel controlId='ForumMessageTextInput' label='Message' className='mb-3'>
					<Form.Control
						as='textarea'
						name='ForumMessageTextInput'
						style={{ height: '125px' }}
						type='text'
						placeholder='Message'
						defaultValue={editMessage.text}
					/>
				</FloatingLabel>
			</Stack>
		</Modal.Body>
	)
}

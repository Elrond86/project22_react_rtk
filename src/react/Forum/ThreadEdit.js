// bootstrap
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Stack from 'react-bootstrap/Stack'

// redux
import { useDispatch, useSelector } from 'react-redux'

//import my reducers
import { useUpdateThreadMutation, useGetAllThreadsQuery } from '../../redux/forum/ForumSlice'
import { hideEditThreadDialog, selectEditThreadDialog, selectHandleThreadID } from '../../redux/ui/UISlices'

export default function ThreadEdit() {
	const [editThread] = useUpdateThreadMutation()
	const dispatch = useDispatch()
	const select = useSelector
	const threadID = select(selectHandleThreadID)
	const handleSubmit = function (event) {
		event.preventDefault()
		const changedThread = {
			_id: threadID,
			name: event.target.elements.ForumThreadNameInput.value,
			description: event.target.elements.ForumThreadDescriptionInput.value,
			isLocked: event.target.elements.isLocked.checked
		}

		editThread(changedThread)
		dispatch(hideEditThreadDialog())
	}
	const showEditModal = select(selectEditThreadDialog)
	return (
		<Modal show={showEditModal} onHide={() => dispatch(hideEditThreadDialog())}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Thread</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit}>
				<CreateThreadBody editThreadID={threadID} />
				<Modal.Footer>
					<Button
						variant='secondary'
						id='CancelEditThreadButton'
						onClick={() => dispatch(hideEditThreadDialog())}
						value='Cancel'
					>
						Cancel
					</Button>
					<Button as='input' type='submit' variant='primary' id='SaveThreadButton' value='Save' />
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

function CreateThreadBody({ editThreadID }) {
	const { thread: editThread } = useGetAllThreadsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			thread: data.find(thread => thread._id === editThreadID)
		})
	})

	if (!editThread) {
		return null
	}

	return (
		<Modal.Body>
			<Stack>
				<CreateThreadAlert />
				<FloatingLabel controlId='ForumThreadNameInput' label='Thread Name' className='mb-3'>
					<Form.Control
						type='text'
						name='ForumThreadNameInput'
						placeholder='Thread Name'
						defaultValue={editThread.name}
					/>
				</FloatingLabel>
				<FloatingLabel controlId='ForumThreadDescriptionInput' label='Thread Beschreibung' className='mb-3'>
					<Form.Control
						type='text'
						name='ForumThreadDescriptionInput'
						placeholder='Thread Beschreibung'
						defaultValue={editThread.description}
					/>
				</FloatingLabel>
				<Form.Check
					id='LockInput'
					type='switch'
					label='sperren'
					name='isLocked'
					className='mb-3'
					defaultChecked={editThread.isLocked}
				/>
			</Stack>
		</Modal.Body>
	)
}

function CreateThreadAlert() {
	return null
}

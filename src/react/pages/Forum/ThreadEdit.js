import React from 'react'

// bootstrap
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import Stack from 'react-bootstrap/Stack'

// redux
import { useDispatch, useSelector } from 'react-redux'

//import my reducers
import { useEditThreadMutation, useGetAllThreadsQuery } from '../../../redux/forum/ForumSlice'
import { hideEditThreadDialog, selectEditThreadDialog, selectHandleThreadID } from '../../../redux/ui/UISlices'

export default function ThreadEdit() {
	console.log('bin in ThreadEdit.js')
	const [editThread] = useEditThreadMutation()
	const dispatch = useDispatch()
	const handleSubmit = function (event) {
		event.preventDefault()
		const changedThread = {
			name: event.target.elements.threadName.value,
			description: event.target.elements.threadDescription.value,
			isLocked: event.target.elements.isLocked.checked
		}

		editThread(changedThread)
		dispatch(hideEditThreadDialog())
	}
	const showEditModal = useSelector(selectEditThreadDialog)
	console.log('showEditModal')
	console.log(showEditModal)

	return (
		<Modal show={showEditModal} onHide={() => dispatch(hideEditThreadDialog())}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Thread</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit}>
				<CreateThreadBody editThreadID={useSelector(selectHandleThreadID)} />
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

	if (false) {
		return (
			<Modal.Body>
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			</Modal.Body>
		)
	}

	if (!editThread) {
		return null
	}

	return (
		<Modal.Body>
			<Stack>
				<CreateThreadAlert />
				<FloatingLabel controlId='ForumThreadNameInput' label='Threadname' className='mb-3'>
					<Form.Control
						type='text'
						name='threadName'
						placeholder='ThreadName'
						defaultValue={editThread.name}
					/>
				</FloatingLabel>
				<FloatingLabel controlId='ForumThreadDescriptionInput' label='Beschreibung' className='mb-3'>
					<Form.Control
						type='text'
						name='threadDescription'
						placeholder='Beschreibung'
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

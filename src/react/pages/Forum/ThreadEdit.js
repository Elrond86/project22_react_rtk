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
			userID: event.target.elements.userID.value,
			userName: event.target.elements.userName.value,
			isAdministrator: event.target.elements.isAdministrator.checked
		}
		const password = event.target.elements.password.value
		if (password) changedThread.password = password

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
	const { user: editThread } = useGetAllThreadsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			user: data.find(user => user.userID === editThreadID)
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
				<FloatingLabel controlId='ThreadIDInput' label='Thread ID' className='mb-3'>
					<Form.Control
						type='text'
						name='userID'
						placeholder='Thread ID'
						disabled
						defaultValue={editThread.userID}
					/>
				</FloatingLabel>
				<FloatingLabel controlId='ThreadNameInput' label='Threadname' className='mb-3'>
					<Form.Control
						type='text'
						name='userName'
						placeholder='Threadname'
						defaultValue={editThread.userName}
					/>
				</FloatingLabel>
				<FloatingLabel controlId='PasswordInput' label='Password' className='mb-3'>
					<Form.Control name='password' type='password' placeholder='Password' />
				</FloatingLabel>
				<Form.Check
					id='IsAdministratorInput'
					type='switch'
					label='Administrator'
					name='isAdministrator'
					className='mb-3'
					defaultChecked={editThread.isAdministrator}
				/>
			</Stack>
		</Modal.Body>
	)
}

function CreateThreadAlert() {
	return null
}

import React, { useEffect } from 'react'

//bootstrap
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import Stack from 'react-bootstrap/Stack'
import { ModalButtons } from '../layout/ModalCommon'
import { ForumMessageForm } from './ForumMessageForm'

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
		const newForumMessage = {
			threadID,
			/* title: event.target.elements.title.value,
			text: event.target.elements.text.value */
			title: event.target.elements.ForumMessageTitleInput.value,
			text: event.target.elements.ForumMessageTextInput.value
		}
		createMessage(newForumMessage)
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
				<Modal.Title>Create Forum Thread</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit}>
				<ForumMessageForm
					error={createResult.error}
					titleID='ForumMessageTitleInput'
					textID='ForumMessageTextInput'
				/>
				<ModalButtons
					submitID='CreateForumMessageButton'
					cancelID='CancelCreateForumMessageButton'
					hideModalDispatch={() => dispatch(hideCreateMessageDialog())}
					isLoading={createResult.isLoading}
				/>
			</Form>
		</Modal>
	)
}

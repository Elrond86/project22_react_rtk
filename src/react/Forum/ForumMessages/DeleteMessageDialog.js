//bootstrap
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

//redux
import { useSelector, useDispatch } from 'react-redux'

//reducers
import { useDeleteMessageMutation } from '../../../redux/forum/ForumMessageSlice'
import { hideDeleteMessageDialog } from '../../../redux/ui/UISlices'

//selectors
import { selectDeleteMessageDialog, selectHandleMessageID } from '../../../redux/ui/UISlices'

export default function DeleteMessageDialog() {
	const showDeleteModal = useSelector(selectDeleteMessageDialog)

	const dispatch = useDispatch()
	const select = useSelector
	const threadID = select(selectHandleMessageID)
	const [deleteThread] = useDeleteMessageMutation()

	const handleDelete = function () {
		deleteThread(threadID)
		dispatch(hideDeleteMessageDialog())
	}

	return (
		<Modal show={showDeleteModal} onHide={() => dispatch(hideDeleteMessageDialog())}>
			<Modal.Header>
				<Modal.Title>Delete Thread</Modal.Title>
			</Modal.Header>
			<Modal.Body>Do you really want to delete this message</Modal.Body>
			<Modal.Footer>
				<Button
					variant='secondary'
					id='DeleteForumThreadCancel'
					onClick={() => dispatch(hideDeleteMessageDialog())}
					value='Cancel'
				>
					Cancel
				</Button>
				<Button variant='danger' id='DeleteForumThreadConfirm' onClick={handleDelete}>
					Delete Thread
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

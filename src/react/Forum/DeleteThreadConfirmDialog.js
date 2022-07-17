//bootstrap
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

//redux
import { useSelector, useDispatch } from 'react-redux'

//reducers
import { useDeleteThreadMutation } from '../../redux/forum/ForumSlice'
import { hideDeleteThreadConfirmDialog } from '../../redux/ui/UISlices'

//selectors
import { selectDeleteThreadConfirmDialog, selectHandleThreadID, selectHandleThreadName } from '../../redux/ui/UISlices'

export default function DeleteThreadConfirmDialog() {
	const showDeleteModal = useSelector(selectDeleteThreadConfirmDialog)

	const dispatch = useDispatch()
	const select = useSelector

	const threadID = select(selectHandleThreadID)
	const [deleteThread] = useDeleteThreadMutation()

	const handleDelete = function () {
		deleteThread(threadID)
		dispatch(hideDeleteThreadConfirmDialog())
	}

	const threadName = select(selectHandleThreadName)

	return (
		<Modal show={showDeleteModal} onHide={() => dispatch(hideDeleteThreadConfirmDialog())}>
			<Modal.Header>
				<Modal.Title>
					Delete Thread <em>{threadName}</em>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Do you really want to delete the thread <em>{threadName}</em>?
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='secondary'
					id='DeleteForumThreadCancel'
					onClick={() => dispatch(hideDeleteThreadConfirmDialog())}
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

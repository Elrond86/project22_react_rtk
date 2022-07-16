//bootstrap
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

//redux
import { useSelector, useDispatch } from 'react-redux'

//reducers
import { useDeleteUserMutation } from '../../../redux/users/userManagement'
import { useDeleteThreadMutation } from '../../../redux/forum/ForumSlice'
import { hideDeleteThreadConfirmDialog } from '../../../redux/ui/UISlices'

//selectors
import { selectDeleteThreadConfirmDialog, selectHandleThreadID } from '../../../redux/ui/UISlices'

export default function DeleteThreadConfirmDialog() {
	const dispatch = useDispatch()
	const threadID = useSelector(selectHandleThreadID)
	const [deleteThread] = useDeleteThreadMutation()

	const handleDelete = function () {
		deleteThread(threadID)
		dispatch(hideDeleteThreadConfirmDialog())
	}
	const showDeleteModal = useSelector(selectDeleteThreadConfirmDialog)
	console.log('showDeleteModal')
	console.log(showDeleteModal)

	return (
		<Modal show={showDeleteModal} onHide={() => dispatch(hideDeleteThreadConfirmDialog())}>
			<Modal.Header>
				<Modal.Title>
					Delete Thread <em>{threadID}</em>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Do you really want to delete the user <em>{threadID}</em>?
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='secondary'
					id='DeleteUserCancel'
					onClick={() => dispatch(hideDeleteThreadConfirmDialog())}
					value='Cancel'
				>
					Cancel
				</Button>
				<Button variant='danger' id='DeleteUserConfirm' onClick={handleDelete}>
					Delete User
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
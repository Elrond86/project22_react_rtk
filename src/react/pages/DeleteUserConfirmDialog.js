//bootstrap
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { hideDeleteUserConfirmDialog, selectDeleteUserConfirmDialog, selectHandleUserID } from '../../redux/ui/UISlices'
import { useDeleteUserMutation } from '../../redux/users/userManagement'

export default function DeleteUserConfirmDialog() {
	const [deleteUser] = useDeleteUserMutation()
	const dispatch = useDispatch()
	const userID = useSelector(selectHandleUserID)
	const handleDelete = function () {
		deleteUser(userID)
		dispatch(hideDeleteUserConfirmDialog())
	}
	const showDeleteModal = useSelector(selectDeleteUserConfirmDialog)

	return (
		<Modal show={showDeleteModal} onHide={() => dispatch(hideDeleteUserConfirmDialog())}>
			<Modal.Header>
				<Modal.Title>
					Delete User <em>{userID}</em>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Do you really want to delete the user <em>{userID}</em>?
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='secondary'
					id='DeleteUserCancel'
					onClick={() => dispatch(hideDeleteUserConfirmDialog())}
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

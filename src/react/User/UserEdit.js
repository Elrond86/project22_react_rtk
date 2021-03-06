// bootstrap
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Stack from 'react-bootstrap/Stack'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { useEditUserMutation, useGetAllUsersQuery } from '../../redux/users/userManagement'
import { hideEditUserDialog, selectEditUserDialog, selectHandleUserID } from '../../redux/ui/UISlices'

export default function UserEdit() {
	const [editUser] = useEditUserMutation()
	const dispatch = useDispatch()
	const handleSubmit = function (event) {
		event.preventDefault()
		const changedUser = {
			userID: event.target.elements.userID.value,
			userName: event.target.elements.userName.value,
			isAdministrator: event.target.elements.isAdministrator.checked
		}
		const password = event.target.elements.password.value
		if (password) changedUser.password = password

		editUser(changedUser)
		dispatch(hideEditUserDialog())
	}
	const showEditModal = useSelector(selectEditUserDialog)

	return (
		<Modal show={showEditModal} onHide={() => dispatch(hideEditUserDialog())}>
			<Modal.Header closeButton>
				<Modal.Title>Edit User</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit}>
				<CreateUserBody editUserID={useSelector(selectHandleUserID)} />
				<Modal.Footer>
					<Button
						variant='secondary'
						id='CancelEditUserButton'
						onClick={() => dispatch(hideEditUserDialog())}
						value='Cancel'
					>
						Cancel
					</Button>
					<Button as='input' type='submit' variant='primary' id='SaveUserButton' value='Save' />
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

function CreateUserBody({ editUserID }) {
	const { user: editUser } = useGetAllUsersQuery(undefined, {
		selectFromResult: ({ data }) => ({
			user: data.find(user => user.userID === editUserID)
		})
	})

	if (!editUser) {
		return null
	}

	return (
		<Modal.Body>
			<Stack>
				<FloatingLabel controlId='UserIDInput' label='User ID' className='mb-3'>
					<Form.Control
						type='text'
						name='userID'
						placeholder='User ID'
						disabled
						defaultValue={editUser.userID}
					/>
				</FloatingLabel>
				<FloatingLabel controlId='UserNameInput' label='Username' className='mb-3'>
					<Form.Control type='text' name='userName' placeholder='Username' defaultValue={editUser.userName} />
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
					defaultChecked={editUser.isAdministrator}
				/>
			</Stack>
		</Modal.Body>
	)
}

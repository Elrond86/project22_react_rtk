//bootstrap
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Stack from 'react-bootstrap/Stack'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { useCreateUserMutation } from '../../redux/users/userManagement'
import { hideCreateUserDialog, selectCreateUserDialog } from '../../redux/ui/UISlices'

export default function CreateUserDialog() {
	const [createUser] = useCreateUserMutation()
	const dispatch = useDispatch()
	const handleSubmit = function (event) {
		event.preventDefault()
		const newUser = {
			userID: event.target.elements.userID.value,
			userName: event.target.elements.userName.value,
			password: event.target.elements.password.value,
			isAdministrator: event.target.elements.isAdministrator.checked
		}
		createUser(newUser)
		dispatch(hideCreateUserDialog())
	}

	return (
		<Modal show={useSelector(selectCreateUserDialog)} onHide={() => dispatch(hideCreateUserDialog())}>
			<Modal.Header closeButton>
				<Modal.Title>Create New User</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit}>
				<CreateUserBody />
				<Modal.Footer>
					<Button
						variant='secondary'
						id='CancelEditUserButton'
						onClick={() => dispatch(hideCreateUserDialog())}
					>
						Cancel
					</Button>
					<Button type='submit' variant='primary' id='CreateUserButton'>
						Create User
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

function CreateUserAlert() {
	return null
}

function CreateUserBody() {
	return (
		<Modal.Body>
			<Stack>
				<CreateUserAlert />
				<FloatingLabel controlId='UserIDInput' label='User ID' className='mb-3'>
					<Form.Control type='text' name='userID' placeholder='User ID' />
				</FloatingLabel>
				<FloatingLabel controlId='UserNameInput' label='Username' className='mb-3'>
					<Form.Control type='text' name='userName' placeholder='Username' />
				</FloatingLabel>
				<FloatingLabel controlId='PasswordInput' label='Password'>
					<Form.Control name='password' type='password' placeholder='Password' />
				</FloatingLabel>
				<Form.Check
					id='IsAdministratorInput'
					type='switch'
					label='Administrator'
					name='isAdministrator'
					className='mb-3'
				/>
			</Stack>
		</Modal.Body>
	)
}

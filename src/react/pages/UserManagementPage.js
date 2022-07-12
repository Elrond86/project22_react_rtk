import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { PencilFill, TrashFill } from 'react-bootstrap-icons'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import Stack from 'react-bootstrap/Stack'
import { useDispatch, useSelector } from 'react-redux'

import { Navigate } from 'react-router'

//import my reducers
import {
	showCreateUserDialog,
	showEditUserDialog,
	showDeleteUserConfirmDialog,
	selectShowUsers
} from '../../redux/ui/UISlices'
import { selectAdminstatus } from '../../redux/authentication/AuthenticationSlices'
import { useGetAllUsersQuery } from '../../redux/users/userManagement'

//import my components
import UserEdit from './UserEdit'
import DeleteUserConfirmDialog from './DeleteUserConfirmDialog'
import CreateUserDialog from './CreateUserDialog'

export default function UserManagement() {
	const dispatch = useDispatch()
	const isAdmin = useSelector(selectAdminstatus)
	const showManagement = useSelector(selectShowUsers)

	console.log('UserManagement-bouncer asking for adminstatus..')
	if (!isAdmin) {
		return <Navigate to='/' />
	}
	console.log('passed the bouncer... returning some UserManagmentView..')

	//	if (showEditDialog) return <UserEdit />
	/* if (showDeleteDialog) return <DeleteUserConfirmDialog /> */

	console.log('passed the showEditDialog... returning some UserManagmentTable..')

	if (!showManagement) return

	return (
		<>
			<UserEdit />
			<DeleteUserConfirmDialog />
			<CreateUserDialog />
			<div class='pagename'>
				<h2 class='pagename' className='mb-3'>
					NUTZERÜBERSICHT
				</h2>
			</div>
			<p>
				<Button
					variant='secondary'
					id='OpenCreateUserDialogButton'
					onClick={() => dispatch(showCreateUserDialog())}
				>
					Create New User
				</Button>
			</p>
			<UserList />
		</>
	)
}

function UserList() {
	const { data: users, isLoading, isSuccess, isError, error } = useGetAllUsersQuery()

	if (isLoading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		)
	} else if (isSuccess) {
		return (
			<Table striped bordered hover>
				<thead id='usertable'>
					<tr>
						<th>userID</th>
						<th>userName</th>
						<th>isAdministrator</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<UserRows users={users} />
				</tbody>
			</Table>
		)
	} else if (isError) {
		return (
			<Alert variant='dark'>
				{error.status} {JSON.stringify(error.data)}
			</Alert>
		)
	}
}

function UserRows({ users }) {
	return users.map(user => <UserRow key={'UserItem' + user.userID} user={user} />)
}

function UserRow({ user }) {
	const dispatch = useDispatch()

	return (
		<tr id={'UserItem' + user.userID}>
			<td>{user.userID}</td>
			<td>{user.userName}</td>
			<td>{user.isAdministrator.toString()}</td>
			<td>
				<Stack direction='horizontal' gap={1}>
					<Button
						variant='secondary'
						id={'EditButton' + user.userID}
						size='sm'
						onClick={() => dispatch(showEditUserDialog(user.userID))}
					>
						<PencilFill /> Edit
					</Button>
					<Button
						variant='dark'
						size='sm'
						id={'DeleteButton' + user.userID}
						onClick={() => dispatch(showDeleteUserConfirmDialog(user.userID))}
					>
						<TrashFill /> Delete
					</Button>
				</Stack>
			</td>
		</tr>
	)
}

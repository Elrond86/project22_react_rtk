import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { PencilFill, TrashFill } from 'react-bootstrap-icons'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import Stack from 'react-bootstrap/Stack'
import { useDispatch, useSelector } from 'react-redux'

//import my reducers
import {
	showCreateUserDialog,
	showEditUserDialog,
	showDeleteUserConfirmDialog,
	selectShowUsers
} from '../../redux/ui/UISlices'
import { selectAdminstatus, selectAuthStatus } from '../../redux/authentication/AuthenticationSlices'
import { useGetAllUsersQuery } from '../../redux/users/userManagement'

//import my components
import UserEdit from './UserEdit'
import DeleteUserConfirmDialog from './DeleteUserConfirmDialog'
import CreateUserDialog from './CreateUserDialog'

export default function UserManagement() {
	const dispatch = useDispatch()
	let isAuth = useSelector(selectAuthStatus)
	const isAdmin = useSelector(selectAdminstatus)
	const showManagement = useSelector(selectShowUsers)

	if (!isAdmin) return
	if (!isAuth) return

	if (!showManagement) return

	return (
		<>
			<UserEdit />

			<DeleteUserConfirmDialog />
			<CreateUserDialog />
			<div className='pagename'>
				<h2 className='pagename mb-3'>NUTZERÜBERSICHT</h2>
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
	const isAdmin = useSelector(selectAdminstatus)
	if (!isAdmin) return
	const { data: users, isLoading, isSuccess, isError, error } = useGetAllUsersQuery()

	if (isLoading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		)
	} else if (isSuccess) {
		return (
			<Table variant='secondary' striped bordered hover>
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

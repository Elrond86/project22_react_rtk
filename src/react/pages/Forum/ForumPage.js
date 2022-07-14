import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { PencilFill, TrashFill } from 'react-bootstrap-icons'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import Stack from 'react-bootstrap/Stack'
import { useDispatch, useSelector } from 'react-redux'

import { Navigate } from 'react-router'

//import my reducers
import {
	selectShowForumOverview,
	showCreateThreadDialog,
	showEditThreadDialog,
	showDeleteThreadConfirmDialog,
	showMessages,
	hideMessages
} from '../../../redux/ui/UISlices'
import { selectAdminstatus } from '../../../redux/authentication/AuthenticationSlices'
import { useGetAllThreadsQuery } from '../../../redux/forum/ForumSlice'

//import my components
import ThreadEdit from '../Forum/ThreadEdit'
import DeleteUserConfirmDialog from '../DeleteUserConfirmDialog'
import CreateThreadDialog from './CreateThreadDialog'

export default function ForumOverview() {
	const dispatch = useDispatch()
	const isAdmin = useSelector(selectAdminstatus)
	const showOverview = useSelector(selectShowForumOverview)

	if (!isAdmin) {
		return <Navigate to='/' />
	}

	if (!showOverview) return

	return (
		<>
			<ThreadEdit />
			<DeleteUserConfirmDialog />
			<CreateThreadDialog />
			<div class='pagename'>
				<h2 class='pagename' className='mb-3'>
					FORENÜBERSICHT
				</h2>
			</div>
			<p>
				<Button
					variant='secondary'
					id='OpenCreateUserDialogButton'
					onClick={() => dispatch(showCreateThreadDialog())}
				>
					Create New Thread
				</Button>
			</p>
			<ThreadList />
		</>
	)
}

function ThreadList() {
	const { data: forumThreads, isLoading, isSuccess, isError, error } = useGetAllThreadsQuery()

	if (isLoading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		)
	} else if (isSuccess) {
		return (
			<Table striped bordered hover>
				<thead id='threadTable'>
					<tr>
						<th>ownerID</th>
						<th>name</th>
						<th>description</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>{<ThreadRows forumThreads={forumThreads} />}</tbody>
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

function ThreadRows({ forumThreads }) {
	return forumThreads.map(thread => <ThreadRow key={'ThreadItem' + thread._id} thread={thread} />)
}

function ThreadRow({ thread }) {
	const dispatch = useDispatch()

	return (
		<tr id={'ForumThread' + thread._id}>
			<td>{thread.ownerID}</td>
			<td id={'ForumThread' + thread._id} onClick={() => dispatch(showMessages(thread.id))}>
				{thread.name}
			</td>
			<td id={'ForumThread' + thread._id} onClick={() => dispatch(showMessages(thread.id))}>
				{thread.description}
			</td>
			<td>
				{
					<Stack direction='horizontal' gap={1}>
						<Button
							variant='secondary'
							id={'EditFormThreadButton' + thread._id}
							size='sm'
							onClick={() => dispatch(showEditThreadDialog(thread._id))}
						>
							<PencilFill /> Edit
						</Button>
						<Button
							variant='dark'
							size='sm'
							id={'DeleteButton' + thread._id}
							onClick={() => dispatch(showDeleteThreadConfirmDialog(thread._id))}
						>
							<TrashFill /> Delete
						</Button>
					</Stack>
				}
			</td>
		</tr>
	)
}

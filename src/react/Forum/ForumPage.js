import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { PencilFill, TrashFill, Table as TabletFill } from 'react-bootstrap-icons'
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
	showMessages
} from '../../redux/ui/UISlices'
import { selectAuthStatus } from '../../redux/authentication/AuthenticationSlices'
import { useGetAllThreadsQuery } from '../../redux/forum/ForumSlice'

//import my components
import ThreadEdit from '../Forum/ThreadEdit'
import DeleteThreadConfirmDialog from './DeleteThreadConfirmDialog'
import CreateThreadDialog from './CreateThreadDialog'

export default function ForumOverview() {
	const dispatch = useDispatch()
	let isAuth = useSelector(selectAuthStatus)
	const showOverview = useSelector(selectShowForumOverview)

	if (!isAuth) {
		return <Navigate to='/' />
	}

	if (!showOverview) return

	return (
		<>
			<ThreadEdit />
			<DeleteThreadConfirmDialog />
			<CreateThreadDialog />
			<div className='pagename'>
				<h2 className='pagename mb-3'>FORENÜBERSICHT</h2>
			</div>
			<p>
				<Button
					variant='secondary'
					id='OpenCreateForumThreadDialogButton'
					onClick={() => dispatch(showCreateThreadDialog())}
				>
					<TabletFill /> Add Thread
				</Button>
			</p>
			<ThreadList />
		</>
	)
}

function ThreadList() {
	const { data: forumThreads, isLoading, isSuccess, isError, error } = useGetAllThreadsQuery()
	let styles = {
		marginRight: '20px',
		width: '99%',
		justifyContent: 'right'
	}
	if (isLoading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		)
	} else if (isSuccess) {
		return (
			<Table variant='secondary' style={styles} striped bordered hover id='ForumThreadList'>
				<thead id='ThreadTableHead'>
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
		<tr key={thread._id} id={'ForumThread' + thread._id} className='forumThread'>
			<td>{thread.ownerID}</td>
			<td
				id={'ViewForumThreadButton' + thread._id}
				onClick={() => dispatch(showMessages([thread._id, thread.name]))}
			>
				{thread.name}
			</td>
			<td
				id={'ViewForumThreadButton' + thread._id}
				onClick={() => dispatch(showMessages([thread._id, thread.name]))}
			>
				{thread.description}
			</td>
			<td>
				{
					<Stack direction='horizontal' gap={1}>
						<Button
							variant='secondary'
							id={'EditForumThreadButton' + thread._id}
							size='sm'
							onClick={() => dispatch(showEditThreadDialog([thread._id, thread.name]))}
						>
							<PencilFill /> Edit
						</Button>
						<Button
							variant='dark'
							size='sm'
							id={'DeleteForumThreadButton' + thread._id}
							onClick={() => dispatch(showDeleteThreadConfirmDialog([thread._id, thread.name]))}
						>
							<TrashFill /> Delete
						</Button>
					</Stack>
				}
			</td>
		</tr>
	)
}

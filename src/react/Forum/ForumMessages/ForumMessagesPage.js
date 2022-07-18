import { useDispatch, useSelector } from 'react-redux'

// bootstrap
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { Pen, TrashFill } from 'react-bootstrap-icons'

//utils
import parseDate from '../../../utils/parseDate'

// reducers
import { showCreateMessageDialog, showEditMessageDialog, showDeleteMessageDialog } from '../../../redux/ui/UISlices'

//components
import CreateMessageDialog from './CreateMessageDialog'
import DeleteMessageDialog from './DeleteMessageDialog'
import EditMessage from './EditMessage'

// state-selectors
import { selectShowMessages, selectHandleThreadID, selectHandleThreadName } from '../../../redux/ui/UISlices'
import { useGetAllMessagesQuery } from '../../../redux/forum/ForumMessageSlice'

export default function ForumMessagePage() {
	if (!useSelector(selectShowMessages)) return

	return (
		<>
			<ForumMessageBoard />
			<CreateMessageDialog />
			<DeleteMessageDialog />
			<EditMessage />
		</>
	)
}

function ForumMessageBoard() {
	const dispatch = useDispatch()
	const { data: forumMessages, isLoading, isSuccess } = useGetAllMessagesQuery()
	const parentThreadName = useSelector(selectHandleThreadName)

	if (isLoading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		)
	} else if (isSuccess) {
		return (
			<>
				<h1>{parentThreadName}</h1>
				<Messages key={'MessagesListInBoard'} messages={forumMessages} />
				<Button
					id='OpenCreateForumMessageDialogButton'
					variant='primary'
					type='submit'
					onClick={() => {
						dispatch(showCreateMessageDialog())
					}}
				>
					Answer
				</Button>
			</>
		)
	}
}

function Messages({ messages }) {
	const parentThreadID = useSelector(selectHandleThreadID)

	return messages.map(message => {
		if (message.forumThread == parentThreadID) {
			return (
				<>
					<AlertMessage message={message} />
				</>
			)
		}
	})
}

function AlertMessage({ message }) {
	return (
		<>
			<Alert variant='dark' key={message._id} id={'ForumMessage' + message._id} className='forumMessage'>
				<Alert.Heading>{message.title}</Alert.Heading>
				<p>{message.text}</p>
				<hr />
				<p className='mb-0'>
					posted: {parseDate(message.createdAt)} von {message.authorID}
					<UpdatedInfo message={message} />
				</p>{' '}
				<MessageButtons message={message} />
			</Alert>
		</>
	)
}

function UpdatedInfo({ message }) {
	if (message.updatedAt != message.createdAt)
		return (
			<>
				<br /> lastchange: {parseDate(message.updatedAt)}
			</>
		)
}

function MessageButtons({ message }) {
	const dispatch = useDispatch()
	return (
		<>
			<Button
				variant='secondary'
				id={'EditForumMessageButton' + message._id}
				size='sm'
				onClick={() => dispatch(showEditMessageDialog(message._id))}
			>
				<Pen /> Edit
			</Button>
			<Button
				variant='dark'
				size='sm'
				id={'DeleteForumMessageButton' + message._id}
				onClick={() => dispatch(showDeleteMessageDialog(message._id))}
			>
				<TrashFill /> Delete
			</Button>
		</>
	)
}

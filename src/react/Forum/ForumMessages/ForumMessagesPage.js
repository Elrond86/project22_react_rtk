import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// bootstrap
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

//utils
import parseDate from '../../../utils/parseDate'

// reducers
import { showCreateMessageDialog } from '../../../redux/ui/UISlices'

//components
import CreateMessageDialog from './CreateMessageDialog'

// state-selectors
import {
	selectShowMessages,
	selectHandleThreadID,
	selectHandleThreadName,
	selectDaten
} from '../../../redux/ui/UISlices'
import { useGetAllMessagesQuery } from '../../../redux/forum/ForumMessageSlice'

export default function ForumMessagePage() {
	if (!useSelector(selectShowMessages)) return

	return (
		<>
			<ForumMessageBoard />
			<CreateMessageDialog />
		</>
	)
}

function ForumMessageBoard() {
	const dispatch = useDispatch()
	const { data: forumMessages, isLoading, isSuccess, isError, error } = useGetAllMessagesQuery()
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
					variant='success'
					type='submit'
					onClick={() => {
						console.log('clicked "Answer"')
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
	console.log('forumMessages von Messages:')
	console.log(messages)
	const parentThreadID = useSelector(selectHandleThreadID)
	console.log('------->parentThreadID: in Messages: ' + JSON.stringify(parentThreadID, null, 4))
	const daten = JSON.stringify(useSelector(selectDaten), null, 4)
	console.log('------->daten in Messages: ' + daten)

	return messages.map(message => {
		if (message.forumThread == parentThreadID) {
			return (
				<>
					<AlertMessage key={'CardItem' + message._id} message={message} />
				</>
			)
		}
	})
}

function AlertMessage({ message }) {
	return (
		<Alert variant='info'>
			<Alert.Heading>{message.title}</Alert.Heading>
			<p>{message.text}</p>
			<hr />
			<p className='mb-0'>
				posted: {parseDate(message.createdAt)} von {message.authorID}
				<UpdatedInfo message={message} />
			</p>
		</Alert>
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

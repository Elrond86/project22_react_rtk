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
import CreateMessageDialog from './CreateMessageDialogV2'

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
	const jsondata = JSON.stringify(forumMessages, null, 4)
	console.log('-----------> forumMessages', forumMessages)
	const parentThreadName = useSelector(selectHandleThreadName)
	console.log('------->parentThreadName')
	console.log(JSON.stringify(parentThreadName, null, 4))
	const parentThreadID = useSelector(selectHandleThreadID)
	console.log('----->parentThreadID für CREATE MESSAGE')
	console.log(JSON.stringify(parentThreadID, null, 4))
	if (isLoading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		)
	} else if (isSuccess) {
		console.log('jsondata')
		console.log(jsondata)

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

/* function Messages(forumMessages) {
	return forumMessages.map(thread => <AlertMessage key={'CardItem' + thread.title} thread={' + thread.text + '} />)
} */

function Messages({ messages }) {
	console.log('forumMessages')
	console.log(messages)
	const parentThreadID = useSelector(selectHandleThreadID)
	console.log('------->parentThreadID')
	console.log(JSON.stringify(parentThreadID, null, 4))
	const daten = useSelector(selectDaten)
	console.log('------->daten: ')
	console.log(JSON.stringify(daten, null, 4))

	/* 	const parentThreadName = useSelector(selectHandleThreadName)
	 */
	/* 	console.log('parentThreadID')
	console.log(parentThreadID) */
	return messages.map(message => {
		if (message.forumThread == parentThreadID) {
			return (
				<>
					<AlertMessage key={'CardItem' + message._id} message={message} />
					{/* <div>{message.title}</div>
					<div>{message.text}</div> */}
				</>
			)
		}
	})
}

//	return

//	 if (message.forumThread == GetParentThreadID())
/* ;<AlertMessage key={'CardItem' + message.title} message={' + message.text + '} />
	}) */

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

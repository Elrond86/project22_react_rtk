import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// bootstrap
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

//utils
import parseDate from '../../../redux/utils/parseDate'

// reducer
import {
	selectShowMessages,
	selectHandleThreadID,
	selectHandleThreadName,
	selectDaten
} from '../../../redux/ui/UISlices'
import { useGetAllForumMessagesQuery } from '../../../redux/forum/ForumMessageSlice'
import { selectAllForumMessages } from '../../../redux/forum/ForumMessageSlice'
import { selectAdminstatus } from '../../../redux/authentication/AuthenticationSlices'

export default function ForumMessagePage() {
	console.log('---------------> ForumMessagePage')
	if (!useSelector(selectShowMessages)) return console.log('ForumMessagePage wird versteckt')
	console.log('rendering ForumMessagePage now...')

	return <ForumMessageBoard />
}

function ForumMessageBoard() {
	const { data: forumMessages, isLoading, isSuccess, isError, error } = useGetAllForumMessagesQuery()
	const jsondata = JSON.stringify(forumMessages, null, 4)
	console.log('-----------> forumMessages', forumMessages)
	const parentThreadName = useSelector(selectHandleThreadName)
	console.log('------->parentThreadName')
	console.log(JSON.stringify(parentThreadName, null, 4))

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
				<Messages key={'unique'} messages={forumMessages} />
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
				{parseDate(message.createdAt)} von {message.authorID}
			</p>
		</Alert>
	)
}

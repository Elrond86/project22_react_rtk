import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// bootstrap
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

import { selectShowMessages, selectHandleThreadID } from '../../../redux/ui/UISlices'
import { useGetAllForumMessagesQuery } from '../../../redux/forum/ForumMessageSlice'
import { selectAllForumMessages } from '../../../redux/forum/ForumMessageSlice'
import { selectAdminstatus } from '../../../redux/authentication/AuthenticationSlices'

export default function ForumMessagePage() {
	if (!useSelector(selectShowMessages)) return console.log('ForumMessagePage wird versteckt')
	console.log('rendering ForumMessagePage now...')
	return <ForumMessageBoard />
}

function GetParentThreadID() {
	return useSelector(selectHandleThreadID)
}

function ForumMessageBoard() {
	const { data: forumMessages, isLoading, isSuccess, isError, error } = useGetAllForumMessagesQuery()
	const jsondata = JSON.stringify(forumMessages, null, 4)
	/* 	const messages = forumMessages.map(message => message.text)
	 */

	if (isLoading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		)
	} else if (isSuccess) {
		console.log('jsondata')
		console.log(jsondata)
		console.log('forumMessages')
		console.log(forumMessages)
		return (
			<>
				<div>Ich printe jetzt jsondata</div>
				<pre>{jsondata} </pre>
			</>
		)
		return console.log(forumMessages)
	}
}

/* function Messages(forumMessages) {
	return forumMessages.map(thread => <AlertMessage key={'CardItem' + thread.title} thread={' + thread.text + '} />)
} */

function Messages({ forumMessages }) {
	return forumMessages.map(message => <div>{message.text}</div>)
	/* if (message.forumThread == GetParentThreadID()) */
	/* ;<AlertMessage key={'CardItem' + message.title} message={' + message.text + '} />
	}) */
}

function AlertMessage(message) {
	return (
		<Alert variant='info'>
			<Alert.Heading>{message.title}</Alert.Heading>
			<p>
				Aww yeah, you successfully read this important alert message. This example text is going to run a bit
				longer so that you can see how spacing within an alert works with this kind of content.
			</p>
			<hr />
			<p className='mb-0'>Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
		</Alert>
	)
}

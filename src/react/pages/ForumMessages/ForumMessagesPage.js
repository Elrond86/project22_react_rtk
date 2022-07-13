import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// bootstrap
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

import { selectShowMessages } from '../../../redux/ui/UISlices'
import { useGetAllForumMessagesQuery } from '../../../redux/forum/ForumMessageSlice'
import { selectAllForumMessages } from '../../../redux/forum/ForumMessageSlice'

export default function ForumMessagePage() {
	if (!useSelector(selectShowMessages)) return console.log('ForumMessagePage wird versteckt')
	console.log('rendering ForumMessagePage now...')
	return <ForumMessageCard />
}

function ForumMessageCard() {
	const { data: forumThreads, isLoading, isSuccess, isError, error } = useGetAllForumMessagesQuery()
	const jsondata = JSON.stringify(forumThreads, null, 4)
	if (isLoading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		)
	} else if (isSuccess) {
		return (
			<>
				<AlertMessage />
				<pre>{jsondata} </pre>
			</>
		)

		return console.log(forumThreads)
	}
}

function AlertMessage() {
	return (
		<Alert variant='info'>
			<Alert.Heading>Hey, nice to see you</Alert.Heading>
			<p>
				Aww yeah, you successfully read this important alert message. This example text is going to run a bit
				longer so that you can see how spacing within an alert works with this kind of content.
			</p>
			<hr />
			<p className='mb-0'>Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
		</Alert>
	)
}

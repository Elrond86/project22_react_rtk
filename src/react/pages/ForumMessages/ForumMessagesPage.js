import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// bootstrap
import Spinner from 'react-bootstrap/Spinner'

import { selectShowMessages } from '../../../redux/ui/UISlices'
import { useGetAllForumMessagesQuery } from '../../../redux/forum/ForumMessageSlice'

export default function ForumMessagePage() {
	if (!useSelector(selectShowMessages)) return console.log('ForumMessagePage wird versteckt')
	console.log('rendering ForumMessagePage now...')
	return <ForumMessageList />
}

function ForumMessageList() {
	const { data: forumThreads, isLoading, isSuccess, isError, error } = useGetAllForumMessagesQuery()

	if (isLoading) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		)
	} else if (isSuccess) {
		return JSON.stringify(forumThreads)
	}
}

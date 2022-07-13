import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectShowMessages } from '../../../redux/ui/UISlices'

export default function ForumMessagePage() {
	if (!useSelector(selectShowMessages)) return
	console.log('rendering ForumMessagePage now...')
	return <>Messages</>
}

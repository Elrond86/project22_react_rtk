import React, { useState, useEffect, useRef } from 'react'

export default function TestPage() {
	const [userID, setUserID] = useState('')
	const userIDinput = useRef()

	const [password, setPassword] = useState('')
	const passwordInput = useRef()
	function Submit() {
		console.log('userIDinput.current: ')
		console.log(userIDinput.current)
		console.log('passwordInput.current: ')
		console.log(passwordInput.current)
	}
	return (
		<>
			<input ref={userIDinput} value={userID} onChange={e => setUserID(e.target.value)} />
			<input ref={passwordInput} value={password} onChange={e => setPassword(e.target.value)} />
			<div>
				My Name is '{userID}' and my password is '{password}'
			</div>
			<button onClick={Submit}>Submit</button>
		</>
	)
}

import React from 'react'
import LoginButton from '../components/LoginButton'

export default function PublicPage() {
	return (
		<>
			<div className='main' id='LandingPage'>
				Landing Page
				<h1>Dies ist ein privates Forum. Bitte einloggen!</h1>
				<section className='card'>{<LoginButton />}</section>
			</div>
		</>
	)
}

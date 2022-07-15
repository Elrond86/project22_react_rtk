import React from 'react'
import LoginButton from '../components/LoginButton'
import { PublicFooter } from '../components/Footer/Footer'

export default function PublicPage() {
	return (
		<>
			<div className='main' id='LandingPage'>
				Landing Page
				<h1>Dies ist ein privates Forum. Bitte einloggen!</h1>
				<section className='card'>{<LoginButton />}</section>
			</div>
			<footer>
				<PublicFooter />
			</footer>
		</>
	)
}

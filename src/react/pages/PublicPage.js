import React from 'react'
import LoginButton from '../components/LoginButton'

export default function PublicPage() {
	return (
		<>
			<div className='main' id='LandingPage'>
				<h1>Landing Page</h1>
				<section className='card'>{<LoginButton />}</section>
			</div>
		</>
	)
}

import React from 'react'

//bootstrap
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

//components
import BestLogin from '../pages/UserSessionWidget'

export default function PublicNavBar() {
	return (
		<div id='PublicNavbar'>
			<Navbar bg='dark' variant='dark' expand='lg'>
				<Container>
					<Navbar.Brand href='#home'>Web2 - Navigation</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'></Nav>
						<Nav>
							<BestLogin />
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	)
}

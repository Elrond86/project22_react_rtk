import React from 'react'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import LogoutButton from './LogoutButton'
import UISlice from '../redux/slices/ui/UISlice'

export default function PrivateNavBar() {
	return (
		<div id='PrivateNavbar'>
			<Navbar bg='dark' variant='dark' expand='lg'>
				<Container>
					<Navbar.Brand href='#home'>Web2 - Menu</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link href='#home'>Home</Nav.Link>
						</Nav>
						<Nav>
							<LogoutButton />
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	)
}

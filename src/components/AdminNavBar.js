import React from 'react'
import { showUserManagement } from '../redux/slices/ui/UISlice'
import { useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Button } from 'react-bootstrap'
import UserManagementButton from './UserManagmentButton'
import HomeButton from './HomeButton'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import LogoutButton from './LogoutButton'

export default function AdminNavBar() {
	return (
		<div id='AdminNavBar'>
			<Navbar bg='dark' variant='dark' expand='lg'>
				<Container>
					<Navbar.Brand href='#home'>Web2 - Menu</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'>
							<HomeButton />
							<UserManagementButton />
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

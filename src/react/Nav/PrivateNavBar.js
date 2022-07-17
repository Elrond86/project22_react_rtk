//bootstrap
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

// components
import OpenForumThreadOverviewButton from './Buttons/ForumButton'
import HomeButton from './Buttons/HomeButton'

import LogoutButton from './Buttons/LogoutButton'

export default function PrivateNavBar() {
	return (
		<div id='PrivateNavBar'>
			<Navbar bg='dark' variant='dark' expand='lg'>
				<Container>
					<Navbar.Brand href='#home'>Web2 - Private Navigation</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'>
							<HomeButton />
							<OpenForumThreadOverviewButton />
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

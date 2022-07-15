import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Stack from 'react-bootstrap/Stack'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {
  logout,
  selectIsAdministrator,
  selectLoggedIn,
  showLoginDialog
} from '../../redux/login/loginSlice'

export function NavBar() {
  const navBarCollapse = 'sm'
  return (
    <Navbar
      collapseOnSelect
      variant='dark'
      bg='dark'
      expand={navBarCollapse}
      className='mb-3'>
      <Container>
        <LinkContainer to='/' className='order-0'>
          <Navbar.Brand id='OpenPrivatePageButton'>Forum</Navbar.Brand>
        </LinkContainer>
        <Stack
          direction='horizontal'
          gap={3}
          className={`d-inline-flex order-1 order-${navBarCollapse}-2`}>
          <Navbar.Toggle />
          <Login />
        </Stack>
        <Navbar.Collapse className={`order-2 order-${navBarCollapse}-1`}>
          <Nav>
            <NavLink
              to='forumThreads'
              id='OpenForumThreadOverviewButton'
              scope='auth'>
              Forum Threads
            </NavLink>
            <NavLink
              to='userManagement'
              id='OpenUserManagementButton'
              scope='admin'>
              User Management
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

function Login({ className }) {
  const dispatch = useDispatch()
  const loggedIn = useSelector(selectLoggedIn)

  if (loggedIn) {
    return (
      <Button
        id='LogoutButton'
        className={className}
        onClick={() => dispatch(logout())}>
        Logout
      </Button>
    )
  } else {
    return (
      <Button
        id='OpenLoginDialogButton'
        className={className}
        onClick={() => dispatch(showLoginDialog())}>
        Login
      </Button>
    )
  }
}

function NavLink({ to, id, scope, children }) {
  const loggedIn = useSelector(selectLoggedIn)
  const isAdmin = useSelector(selectIsAdministrator)

  if (scope === 'auth') {
    if (!loggedIn) {
      return
    }
  }
  if (scope === 'admin') {
    if (!loggedIn || !isAdmin) {
      return
    }
  }
  return (
    <LinkContainer to={to} id={id}>
      <Nav.Link>{children}</Nav.Link>
    </LinkContainer>
  )
}

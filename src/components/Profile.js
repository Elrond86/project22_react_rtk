import { useSelector } from 'react-redux'
import Nav from 'react-bootstrap/Nav'

export default function ProfileLink() {
	let UsersState = useSelector(state => {
		return state['users'] // returns the users-Segment of the state
	})

	let { isLoggedIn } = UsersState

	if (isLoggedIn) {
		return (
			<Nav.Item>
				<Nav.Link eventKey='1' href='#/home'>
					Profile
				</Nav.Link>
			</Nav.Item>
		)
	}
}

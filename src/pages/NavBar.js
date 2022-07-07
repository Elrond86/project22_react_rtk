import PrivateNavBar from '../components/PrivateNavBar'
import PublicNavBar from '../components/PublicNavBar'
import { useSelector } from 'react-redux'

export default function MainPage() {
	/** get State-Data from Redux Store */
	let UsersState = useSelector(state => {
		return state['users'] // returns the users-Segment of the state
	})

	let userID = UsersState?.user?.userID

	if (userID !== undefined) {
		console.log(`Öffne Navbar für private Seite..`)
		//get users-Value from UsersState-Segment
	}

	let page

	//console.log(users.user)
	if (userID === undefined) return (page = <PublicNavBar />)
	if (userID === null) return (page = <PublicNavBar />)
	page = <PrivateNavBar />
	return page
}

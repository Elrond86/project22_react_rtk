import PrivatePage from './PrivatPage'
import PublicPage from './PublicPage'
import { useSelector } from 'react-redux'

export default function MainPage() {
	/** get State-Data from Redux Store */
	let UsersState = useSelector(state => {
		return state['users'] // returns the users-Segment of the state
	})

	let userID = UsersState?.user?.userID

	if (userID !== undefined) {
		console.log(`Öffne persöhnliche Seite für ${userID}...`)
		//get users-Value from UsersState-Segment
	}

	let page

	//console.log(users.user)
	if (userID === undefined) return (page = <PublicPage />)
	if (userID === null) return (page = <PublicPage />)
	page = <PrivatePage />
	return page
}

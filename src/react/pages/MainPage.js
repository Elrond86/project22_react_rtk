import PrivatePage from './PrivatPage'
import PublicPage from './PublicPage'
import { useSelector, useDispatch } from 'react-redux'
import { hideLoginModal } from '../../redux/ui/UISlices'

export default function MainPage() {
	/** get State-Data from Redux Store */
	let UsersState = useSelector(state => {
		return state['auth'] // returns the auth-Segment of the state
	})

	let userID = UsersState?.user?.userID
	const dispatch = useDispatch()

	if (userID !== undefined) {
		console.log('dispatch(hideLoginModal): ')
		dispatch(hideLoginModal)
		console.log(`Öffne persöhnliche Seite für ${userID}...`)
		//get auth-Value from UsersState-Segment
	}

	let page

	//console.log(auth.user)
	if (userID === undefined) return (page = <PublicPage />)
	if (userID === null) return (page = <PublicPage />)
	page = <PrivatePage />
	return page
}

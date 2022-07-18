import PrivatePage from './PrivatPage'
import AdminPage from './AdminPage'
import PublicPage from './PublicPage'
import { useSelector, useDispatch } from 'react-redux'
import { hideLoginModal } from '../../redux/ui/UISlices'

import { selectAdminstatus, selectAuthStatus } from '../../redux/authentication/AuthenticationSlices'

export default function MainPage() {
	let UsersState = useSelector(state => {
		return state['auth']
	})

	let isAdmin = useSelector(selectAdminstatus)
	let isAuth = useSelector(selectAuthStatus)
	let userID = UsersState?.user?.userID

	const dispatch = useDispatch()

	if (userID !== undefined) {
		dispatch(hideLoginModal)
	}

	let page

	if (userID === undefined) return (page = <PublicPage />)
	if (userID === null) return (page = <PublicPage />)
	if (isAdmin) {
		page = <AdminPage />
	} else if (isAuth) page = <PrivatePage />
	return page
}

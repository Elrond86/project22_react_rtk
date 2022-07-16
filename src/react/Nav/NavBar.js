import PublicNavBar from './PublicNavBar'
import PrivateNavBar from './PrivateNavBar'
import AdminNavBar from './AdminNavBar'
import { useSelector } from 'react-redux'
import { selectAdminstatus, selectAuthStatus } from '../../redux/authentication/AuthenticationSlices'

export default function NavBar() {
	let isAdmin = useSelector(selectAdminstatus)
	let isAuth = useSelector(selectAuthStatus)
	if (isAdmin) return <AdminNavBar />
	if (isAuth) return <PrivateNavBar />
	return <PublicNavBar />
}

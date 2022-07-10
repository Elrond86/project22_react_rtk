import PublicNavBar from '../components/PublicNavBar'
import PrivateNavBar from '../components/PrivateNavBar'
import AdminNavBar from '../components/AdminNavBar'
import { useSelector } from 'react-redux'
import { selectAdminstatus, selectAuthStatus } from '../../redux/slices/users/UsersSlices'

export default function NavBar() {
	let isAdmin = useSelector(selectAdminstatus)
	let isAuth = useSelector(selectAuthStatus)
	if (isAdmin) return <AdminNavBar />
	if (isAuth) return <PrivateNavBar />
	return <PublicNavBar />
}

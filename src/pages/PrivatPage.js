import LogoutButton from '../components/LogoutButton'
import UserManagement from './UserManagementPage'
import { useSelector } from 'react-redux'
import { selectUserID, selectUserName, selectAccessToken, selectAdminstatus } from '../redux/slices/users/UsersSlices'

export default function PrivatPage() {
	/** get State-Data from Redux Store */

	return (
		<>
			<UserManagement />
			<Welcome />
		</>
	)
}

function Welcome() {
	return (
		<>
			<div className='main' is='PrivatePage'>
				<h1>Private Page</h1>
				<section className='card'>
					<div className='watchBox'>
						<h1>Hallo {useSelector(selectUserID)}!</h1>
					</div>
				</section>
				<section className='card'>
					<LogoutButton />
				</section>
			</div>
		</>
	)
}

import LogoutButton from '../components/LogoutButton'
import UserManagement from './UserManagementPage'
import ForumPage from './Forum/ForumPage'
import { useSelector } from 'react-redux'
import {
	selectUserID,
	selectUserName,
	selectAccessToken,
	selectAdminstatus
} from '../../redux/authentication/AuthenticationSlices'

export default function PrivatPage() {
	/** get State-Data from Redux Store */

	return (
		<>
			<Welcome />
			<UserManagement />
			<ForumPage />
			<LogoutButton />
		</>
	)
}

function Welcome() {
	return (
		<>
			<div className='main' id='PrivatePage'>
				Dies ist deine private Seite
				<section className='card'>
					<div className='watchBox'>
						<h1>Willkommen, {useSelector(selectUserID).toUpperCase()}!</h1>
					</div>
				</section>
			</div>
		</>
	)
}

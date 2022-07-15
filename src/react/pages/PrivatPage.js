import LogoutButton from '../components/LogoutButton'
import UserManagement from './UserManagementPage'
import ForumPage from './Forum/ForumPage'
import ForumMessagePage from './ForumMessages/ForumMessagesPage'
import { useSelector } from 'react-redux'
import {
	selectUserID,
	selectUserName,
	selectAccessToken,
	selectAdminstatus
} from '../../redux/authentication/AuthenticationSlices'

import { selectShowWelcome } from '../../redux/ui/UISlices'

export default function PrivatPage() {
	/** get State-Data from Redux Store */

	return (
		<>
			<Welcome />
			<UserManagement />
			<ForumPage />
			<ForumMessagePage />
			<LogoutButton />
		</>
	)
}

function Welcome() {
	const showWelcome = useSelector(selectShowWelcome)
	const loggedUser = useSelector(selectUserID)

	if (!showWelcome) return
	return (
		<>
			<div className='main' id='PrivatePage'>
				Dies ist deine private Seite
				<section className='card'>
					<div className='watchBox'>
						<h1>Willkommen, {loggedUser.toUpperCase()}!</h1>
					</div>
				</section>
			</div>
		</>
	)
}

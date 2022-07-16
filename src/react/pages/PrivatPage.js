import LogoutButton from '../components/LogoutButton'
import UserManagement from './UserManagementPage'
import ForumPage from './Forum/ForumPage'
import ForumMessagePage from './ForumMessages/ForumMessagesPage'
import Footer from '../components/Footer/Footer'
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
			<footer>
				<Footer />
			</footer>
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
						<h2>Willkommen, {loggedUser.toUpperCase()}!</h2>
						<div className='inv'>
							<hr />
							<hr />
						</div>
					</div>
				</section>
			</div>
		</>
	)
}

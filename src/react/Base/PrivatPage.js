import UserManagement from '../User/UserManagementPage'
import ForumPage from '../Forum/ForumPage'

import ForumMessagePage from '../Forum/ForumMessages/ForumMessagesPage'
import Footer from '../Footer/Footer'
import { useSelector } from 'react-redux'
import { selectUserID } from '../../redux/authentication/AuthenticationSlices'

import { selectShowWelcome } from '../../redux/ui/UISlices'

export default function PrivatPage() {
	return (
		<>
			<Welcome />
			<UserManagement />
			<ForumPage />
			<ForumMessagePage />
			<div className='footer'>
				<Footer />
			</div>
		</>
	)
}

function Welcome() {
	// get State-Data from Redux Store
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

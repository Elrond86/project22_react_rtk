//import my components
import UserManagement from '../User/UserManagementPage'
import ForumPage from '../Forum/ForumPage'
import ForumMessagePage from '../Forum/ForumMessages/ForumMessagesPage'
import Footer from '../Footer/Footer'

// redux
import { useSelector } from 'react-redux'

// selectors
import { selectUserID } from '../../redux/authentication/AuthenticationSlices'
import { selectShowWelcome } from '../../redux/ui/UISlices'

export default function AdminPage() {
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

import LogoutButton from '../components/LogoutButton'
import { useSelector } from 'react-redux'

export default function PrivatPage() {
	/** get State-Data from Redux Store */
	let UsersState = useSelector(state => {
		return state['users'] // returns the Users-Segemt of the state
	})

	let {
		user: { userID },
	} = UsersState

	return (
		<div className='main' is='PrivatePage'>
			<h1>Private Page</h1>
			<section className='card'>
				<div className='watchBox'>
					<h1>Hallo {userID}!</h1>
				</div>
			</section>
			<section className='card'>
				<LogoutButton />
			</section>
		</div>
	)
}

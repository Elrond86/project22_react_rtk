import LogoutButton from './LogoutButton'
import { useSelector } from 'react-redux'

export default function PrivatPage() {
	/** get State-Data from Redux Store */
	let UsersState = useSelector(state => {
		return state['users'] // returns the Users-Segemt of the state
	})

	let {
		userAuth: {
			decoded: { userID },
		},
	} = UsersState

	return (
		<div className='main'>
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

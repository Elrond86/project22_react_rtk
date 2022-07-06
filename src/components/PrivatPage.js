import LogoutButton from './LogoutButton'

export default function PrivatPage(props) {
	return (
		<div className='main'>
			<h1>Private Page</h1>
			<section className='card'>
				<div className='watchBox'>
					<h1>Hallo {props.user.userID}!</h1>
				</div>
			</section>
			<section className='card'>
				<LogoutButton />
			</section>
		</div>
	)
}

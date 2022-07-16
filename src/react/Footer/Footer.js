import LogoutButton from '../Nav/Buttons/LogoutButton'

export default function Footer() {
	return (
		<>
			<impressum>Impressum</impressum>
			<footerlogoff>
				<LogoutButton />
			</footerlogoff>
		</>
	)
}

export function PublicFooter() {
	return (
		<>
			<publicimpressum>Impressum</publicimpressum>
		</>
	)
}

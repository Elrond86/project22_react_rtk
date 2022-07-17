import LogoutButton from '../Nav/Buttons/LogoutButton'

export default function Footer() {
	return (
		<>
			<div className='impressum'>
				<Impressum />
			</div>
			<div className='footerlogoff'>
				<LogoutButton />
			</div>
		</>
	)
}

export function PublicFooter() {
	return (
		<>
			<div className='publicimpressum'>
				<Impressum />
			</div>
		</>
	)
}

function Impressum() {
	return (
		<>
			<hr />
			<div className='textField>'>
				<font size='2'>
					<b>Impressum</b> <br />
					Muster GmbH & Co.KG <br />
					Musterstraße 1, 1337 Neustadt <br /> muster@mail.de
				</font>
			</div>
		</>
	)
}

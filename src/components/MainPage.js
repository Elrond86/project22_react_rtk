import PrivatePage from './PrivatPage'
import PublicPage from './PublicPage'

export default function MainPage(props) {
	let page
	console.log('props: ')
	console.log(props)
	console.log(props.user)
	if (props.user === undefined) return (page = <PublicPage />)
	if (props.user === null) return (page = <PublicPage />)
	page = <PrivatePage />
	return page
}

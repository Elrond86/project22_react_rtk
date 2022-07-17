import { useDispatch } from 'react-redux'
import { hideAll } from '../../../redux/ui/UISlices'

import { Button } from 'react-bootstrap'

export default function HomeButton() {
	let dispatch = useDispatch()

	function goHome() {
		dispatch(hideAll()) //sendet die Action, die wir definiert haben an den Store (und der dann an den Reducer oder so)
	}

	return (
		<div>
			<Button id='OpenPrivatePageButton' variant='outline-info' onClick={goHome}>
				Home
			</Button>
		</div>
	)
}

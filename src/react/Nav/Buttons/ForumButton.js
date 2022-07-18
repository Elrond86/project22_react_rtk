import { useDispatch } from 'react-redux'
import { showForumOverview } from '../../../redux/ui/UISlices'

import { Table } from 'react-bootstrap-icons'
import { Button } from 'react-bootstrap'

export default function OpenForumThreadOverviewButton() {
	let dispatch = useDispatch()

	function showOverview() {
		dispatch(showForumOverview()) //sendet die Action, die wir definiert haben an den Store (und der dann an den Reducer oder so)
	}

	return (
		<div>
			<Button id='OpenForumThreadOverviewButton' variant='outline-info' onClick={showOverview}>
				<Table /> Forum
			</Button>
		</div>
	)
}

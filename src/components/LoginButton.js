import React from 'react'
import { connect } from 'react-redux'

import { Button } from 'react-bootstrap'

//import { getShowLoginDialogAction } from '../actions/AuthenticationActions'

const { log } = console

function LoginButton(props) {
	function showLoginDialog() {
		log('clicked showLoginDialog')
		//props.dispatch(getShowLoginDialogAction()) //sendet die Action, die wir definiert haben an den Store (und der dann an den Reducer oder so)
	}

	return (
		<div>
			<Button
				id='OpenLoginDialogButton'
				variant='outline-secondary'
				active
				onClick={showLoginDialog}
			>
				Login
			</Button>
		</div>
	)
}

export default connect()(LoginButton)

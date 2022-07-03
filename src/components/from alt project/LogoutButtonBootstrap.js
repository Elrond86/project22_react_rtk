import React from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { getLogoutAction } from '../actions/AuthenticationActions';

const { log } = console;

function LogoutButtonBootstrap(props) {
	function handleLogout() {
		log('clicked LogoutButton in Mainpage');
		props.dispatch(getLogoutAction()); //sendet die Action, die wir definiert haben an den Store (und der dann an den Reducer oder so)
	}

	return (
		<div>
			<Button id="LogoutButton" variant="outline-secondary" active onClick={handleLogout}>
				Logout
			</Button>
		</div>
	);
}

export default connect()(LogoutButtonBootstrap);

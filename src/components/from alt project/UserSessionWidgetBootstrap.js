import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import * as auhenticationActions from '../actions/AuthenticationActions';

import { bindActionCreators } from 'redux';

const { log } = console;

/**mapStateToProps () kopiert sich aus dem State jene Daten, die für die
Komponente von Relevanz sind. 
Name ist wohl nicht keyword, aber ist Konvention und auch in den REACT-Docs wird das genutzt */
const mapStateToProps = (state) => {
	return state;
};

function UserSessionWidgetBootstrap(props) {
	const [credentials, setCredentials] = useState({
		userID: '',
		password: '',
	});

	function handleClose(event) {
		event.preventDefault();
		props.hideLoginDialogAction();
	}

	function handleShow() {
		props.showLoginDialogAction();
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setCredentials({
			...credentials,
			[name]: value,
		});
		log('credentials: ');
		log(JSON.stringify(credentials));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const { userID, password } = credentials;
		const { authenticateUserAction } = props;
		authenticateUserAction(userID, password);
		log('Pushed Submit');
	};

	function handleLogout() {
		props.logoutAction();
	}

	var showModal = props.showLoginDialog;
	if (showModal === undefined) {
		showModal = false;
	}

	let Btn;
	if (props.user && props.user != null) {
		Btn = (
			<Button variant="primary" id="LogoutButton" onClick={handleLogout}>
				Logout
			</Button>
		);
	} else {
		Btn = (
			<Button variant="primary" id="OpenLoginDialogButton" onClick={handleShow}>
				Login
			</Button>
		);
	}

	let loginPending = props.loginPending;
	if (loginPending === undefined) {
		loginPending = false;
	}

	let isError = props.error;
	if (isError === undefined) {
		isError = false;
	}

	return (
		<>
			{Btn}

			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header>
					<Modal.Title>Please Enter Credentials</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="LoginUserIDInput">
							<Form.Label>User ID</Form.Label>
							<Form.Control
								type="userID"
								placeholder="User ID"
								name="userID"
								onChange={handleChange}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="LoginPasswordInput">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								name="password"
								onChange={handleChange}
							/>
						</Form.Group>

						<Button
							id="LoginButton"
							variant="primary"
							type="submit"
							onClick={handleSubmit}
						>
							Submit
						</Button>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						{isError && (
							<Form.Label style={{ color: 'red', marginLeft: '20px' }}>
								Invalid user ID or password
							</Form.Label>
						)}
						{loginPending && (
							<Spinner
								animation="border"
								variant="primary"
								style={{ marginLeft: '20px' }}
							/>
						)}
					</Form>
				</Modal.Body>
				<Modal.Footer>Footer</Modal.Footer>
			</Modal>
		</>
	);
}

/** Hier verbinde ich Funktionen mit dem dispatch. Damit schmeißt mir der Store diese Functionen in die Probs.
 * Die kann ich dann benutzen mit props.showLoginDialogAction & props.hideLoginDialogAction
 */
const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			showLoginDialogAction: auhenticationActions.getShowLoginDialogAction,
			hideLoginDialogAction: auhenticationActions.getHideLoginDialogAction,
			authenticateUserAction: auhenticationActions.authenticateUser,
			logoutAction: auhenticationActions.getLogoutAction,
		},
		dispatch
	);

const ConnectedUserSessionWidgetBootstrap = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserSessionWidgetBootstrap);

export default ConnectedUserSessionWidgetBootstrap;

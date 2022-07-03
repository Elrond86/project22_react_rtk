import LogoutButtonBootstrap from './LogoutButtonBootstrap';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return state;
};

function PrivatPage(props) {
	return (
		<div className="main">
			<h1>Private Page</h1>
			<section className="card">
				<div className="watchBox">
					<h1>Hallo {props.user.userID}!</h1>
				</div>
			</section>
			<section className="card">
				<LogoutButtonBootstrap />
			</section>
		</div>
	);
}

export default connect(mapStateToProps)(PrivatPage);

import PrivatePage from './PrivatPage';
import PublicPage from './PublicPage';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return state;
};

function MainPage(props) {
	let page;
	console.log('props: ');
	console.log(props);
	console.log(props.user);
	if (props.user === undefined) return (page = <PublicPage />);
	if (props.user === null) return (page = <PublicPage />);
	page = <PrivatePage />;
	return page;
}

const ConnectedMainPage = connect(mapStateToProps)(MainPage);

export default ConnectedMainPage;

/**
 * @module LogoutPage
 */

const React = require('react');
const Helmet = require('react-helmet');
const BrowserUtils = require('../../utils/BrowserUtils');

const getStateFromStores = () => {
	return {

	};
};

const LogoutPage = React.createClass({

	getInitialState() {
		return getStateFromStores() || {};
	},
	componentWillMount() {
		BrowserUtils.setViewPort(1);
    },
	componentDidMount() {
		// SavingPotsActionCreator.getAccountsList();
		// storename.addChangeListener(this.onStoreChange);
	},

	componentWillUnmount() {
		// storename.removeChangeListener(this.onStoreChange);
	},

	onStoreChange() {
		this.setState(getStateFromStores());
	},

	render() {
		return (
			<div>
				<Helmet title="FinancialStories" />
				<div className="b-app authenticate-account container-fluid">
					<h1>Logout Page</h1>
				</div>
			</div>
		);
	},
});

module.exports = LogoutPage;

/**
 * @module AccountOpening
 */

const React = require('react');
const { PropTypes } = React;
const RouteHandler = require('react-router').RouteHandler;
const cx = require('classnames');
const envConfig = require('../../../static/config');

const BlurFilter = require('../common/ui-filters/BlurFilter');

const CallValidate3DStore = require('../../stores/CallValidate3DStore');
const ContentStore = require('../../stores/AccountOpeningContentStore');
const CustomerStore = require('../../stores/CustomerStore');
const DataStore = require('../../stores/AccountOpeningDataStore');
const PostcodeStore = require('../../stores/PostcodeAddressStore');
const SessionStore = require('../../stores/SessionStore');
const ValidationStore = require('../../stores/ValidationStore');

const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const SessionActionCreator = require('../../actions/SessionActionCreator');


const Helmet = require('react-helmet');
const StepupChallenge = require('./StepupChallenge');
const SessionTimeoutPopUpComponent = require('../common/SessionTimeoutPopUpComponent');

function getStateFromStores() {
	return {
		call3d: CallValidate3DStore.getAllQuestions(),
		content: ContentStore.getAll(),
		customer: CustomerStore.getAll(),
		data: DataStore.getAll(),
		postcodeData: PostcodeStore.getAll(),
		session: SessionStore.getAll(),
		validations: ValidationStore.getAll(),
		sessionTimeoutFlag: SessionStore.getSessionTimeout(),
	};
}

const AccountOpening = React.createClass({
	propTypes: {
		appData: PropTypes.object,
		pushState: PropTypes.object,
	},

	getInitialState() {
		return getStateFromStores();
	},

	componentDidMount() {
		CallValidate3DStore.addChangeListener(this._onStoreChange);
		ContentStore.addChangeListener(this._onStoreChange);
		CustomerStore.addChangeListener(this._onStoreChange);
		DataStore.addChangeListener(this._onStoreChange);
		PostcodeStore.addChangeListener(this._onStoreChange);
		SessionStore.addChangeListener(this._onStoreChange);
		ValidationStore.addChangeListener(this._onStoreChange);

		if (!envConfig.disableNavigationWarning) {
			window.addEventListener('beforeunload', this.onWindowBeforeUnload);
		}
	},

	componentWillUnmount() {
		CallValidate3DStore.removeChangeListener(this._onStoreChange);
		ContentStore.removeChangeListener(this._onStoreChange);
		CustomerStore.removeChangeListener(this._onStoreChange);
		DataStore.removeChangeListener(this._onStoreChange);
		PostcodeStore.removeChangeListener(this._onStoreChange);
		SessionStore.removeChangeListener(this._onStoreChange);
		ValidationStore.removeChangeListener(this._onStoreChange);

		window.removeEventListener('beforeunload', this.onWindowBeforeUnload);
	},

	/**
	 * Triggered before a refresh or tab close.
	 *
	 * @param  {Event} e
	 */
	onWindowBeforeUnload(e) {
		const event = e || window.event;
		const confirmationMessage = this.state.content.navigationWarning;

		event.returnValue = confirmationMessage;     // Gecko and Trident
		return confirmationMessage;                  // Gecko and WebKit
	},

	/**
	 * Store has been updated.
	 *
	 * @param  {Event} e
	 */
	_onStoreChange() {
		this.setState(getStateFromStores());
	},

	closePopup() {
		this.setState({ sessionTimeoutFlag: false });
		SessionActionCreator.resetSessionTimeOutFlag();
		AccountOpeningActions.navigateToWebTask('WEB-AUTHENTICATION');
	},

	render() {
		const appClassNames = cx({
			dyb: envConfig.bankId === 'DYB',
			yb: envConfig.bankId === 'YB',
			cb: envConfig.bankId === 'CB',
			'alt-product': this.state.data.isAltProduct,
			'cb-offer': this.state.data.isAltProduct && this.state.data.bankID === 'CB',
			'yb-offer': this.state.data.isAltProduct && this.state.data.bankID === 'YB',
		});

		return (
			this.state.sessionTimeoutFlag ? <SessionTimeoutPopUpComponent data={this.state.content.sessionTimeout} closePopup={this.closePopup} /> :
				<div className={appClassNames}>
					<Helmet
						title={this.state.content.landingPagePageHeader}
						titleTemplate={`%s | ${this.state.content.documentTitle}`}
					/>

					<BlurFilter enabled={this.props.appData.requireOTPAuthentication}>
						<RouteHandler
							{...this.props}
							{...this.state}
						/>
					</BlurFilter>
					<StepupChallenge {...this.props} {...this.state}/>
				</div>
		);
	},
});

module.exports = AccountOpening;

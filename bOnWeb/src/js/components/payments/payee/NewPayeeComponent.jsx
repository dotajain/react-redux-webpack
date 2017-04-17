/**
 * @module NewPayeeComponent
 */
const React = require('react');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const PaymentsStore = require('../../../stores/PaymentsStore');
const { PropTypes } = React;
const NewPayeeComponent = React.createClass({
	propTypes: {
		contents: PropTypes.object,

	},
	// To navigate to add payee
	handleNewPayee() {
		PaymentsActionCreator.navigateToWebTask('WEB-ADD-PAYEE');
	},
	render() {
		const css = PaymentsStore.getSelectedPayeeStyle();
		return (
			<div className={`account ${css} open one-line`} onClick={this.handleNewPayee}>
				<h3>{this.props.contents.newPayeeLink}</h3>
			</div>
		);
	},
}
);
module.exports = NewPayeeComponent;

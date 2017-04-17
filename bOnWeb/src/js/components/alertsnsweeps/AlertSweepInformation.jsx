const React = require('react');
const AlertsNSweepsActionCreator = require('../../actions/AlertsNSweepsActionCreator');
const SweepsActionCreator = require('../../actions/SweepsActionCreator');
const AlertsActionCreator = require('../../actions/AlertsActionCreator');
const ProjectionsActionCreator = require('../../actions/ProjectionsActionCreator');
const Toggle = require('../common/Toggle');
const { PropTypes } = React;
const ALERT = 'alert';
const SWEEP = 'sweep';
const PROJECTION = 'projection';

const AlertSweepInformation = React.createClass({

	propTypes: {
		content: PropTypes.object,
		headerName: PropTypes.string,
		sentence: PropTypes.string,
		alertInfoClick: PropTypes.func,
		data: PropTypes.object,
		id: PropTypes.string,
		toggleClick: PropTypes.func,
		type: PropTypes.string,
		someTechnicalError: PropTypes.func,
		lessMore: PropTypes.string,
		thresholdAmount: PropTypes.number,
		toggleCheck: PropTypes.bool,
		accountId: PropTypes.string,
		accntClass: PropTypes.string,
	},
	getInitialState() {
		return {
			flagForAlert: false,
		};
	},

	checked(name, e) {
		if (this.props.data.type === SWEEP) {
			SweepsActionCreator.editSweepData(e.target.checked, this.props.accountId);
		} else if (this.props.data.type === ALERT) {
			AlertsActionCreator.sendEditAlertData(this.props.data.id, this.props.thresholdAmount, this.props.lessMore, e.target.checked, true);
			// AlertsActionCreator.sendEditAlertData(this.props.data.id, this.props.thresholdAmount, this.props.lessMore, e.target.checked, this.props.accountId);
		} else if (this.props.data.type === PROJECTION) {
			ProjectionsActionCreator.editProjectionData(e.target.checked, this.props.accountId);
		}

		//	if (!e.target.checked) {
		this.props.toggleClick(this.props.type, name, e.target.checked);
		// }
	},

	alertInfoClick() {
		AlertsNSweepsActionCreator.hideHeaderComponent(false);
		this.props.alertInfoClick(this.props.type, this.props.data.account_id, this.props.headerName);
		// this.props.someTechnicalError();
	},

	render() {
		let css = '';
		if (this.props.data.type !== PROJECTION) {
			css = this.props.toggleCheck ? '' : 'inactive';
		}
		return (
			<li className={css}>
				<section className={`alert-icon ${this.props.accntClass}`} onClick = {this.alertInfoClick}>
					<span className ={`icon ${this.props.data.type === SWEEP ? 'icon-pound' : 'icon-alerts'}`}></span>
				</section>
				<section className={`alert-title ${this.props.accntClass}`} onClick = {this.alertInfoClick}>
					<h3>{this.props.headerName}</h3>
					<p className="alertSentencePara" dangerouslySetInnerHTML = {{ __html: this.props.sentence }}></p>
				</section>
				<section>
					<div className="toggle" >
						<Toggle onChange ={this.checked.bind(this, this.props.headerName) }
							aria-label="No label tag" ref= "alertsFlag" defaultChecked = {this.props.toggleCheck} checked = {this.props.toggleCheck}
						/>
					</div>
				</section>
			</li>
		);
	},
});

module.exports = AlertSweepInformation;


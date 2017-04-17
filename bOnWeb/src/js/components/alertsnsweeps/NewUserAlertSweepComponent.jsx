const React = require('react');
const AlertsNSweepsStore = require('../../stores/AlertsNSweepsStore');
const { PropTypes } = React;

const getStateFromStores = () => {
	return {
		compName: 'default',
		modalSweepsCreated: false,
		modalAlertsCreated: false,
	};
};
const NewUserAlertSweepComponent = React.createClass({

	propTypes: {
		content: PropTypes.object,
		setCss: PropTypes.func,
		createSweep: PropTypes.func,
        createAlert: PropTypes.func,
	},

	getInitialState() {
		return getStateFromStores();
	},
	showDefault() {
		if (AlertsNSweepsStore.getAlertFlag() === true && AlertsNSweepsStore.getSweepFlag() === true) {
			return (<div className="new-user-container">
				<h4 className="text-center">{this.props.content.alertsSweepsHead}</h4>
				<div className="new-user-content">
						{this.renderAlert() }
						{this.renderSweep() }
				</div>
			</div>);
		} else if (AlertsNSweepsStore.getAlertFlag() === true && AlertsNSweepsStore.getSweepFlag() === false) {
			return (
				<div className="new-user-container">
                    <h4 className="text-center">{this.props.content.alertsSweepsHead}</h4>
                    <div className="new-user-content">
						{this.renderAlert() }
					</div>
				</div>
			);
		} else if (AlertsNSweepsStore.getAlertFlag() === false && AlertsNSweepsStore.getSweepFlag() === true) {
			return (
				<div className="new-user-container">
                    <h4 className="text-center">{this.props.content.alertsSweepsHead}</h4>
                    <div className="new-user-content">
							{this.renderSweep() }
					</div>
				</div>
			);
		} else if (AlertsNSweepsStore.getAlertFlag() === false && AlertsNSweepsStore.getSweepFlag() === false) {
			return (
				<div className="new-user-container">
                    <h4 className="text-center">{this.props.content.alertsSweepsHead}</h4>
					<div className="error-page">
						<h1>{this.props.content.errorHeader}</h1>
						<p className="errorContentMsg">{this.props.content.triggerDashboardViewController_NoEligibleAccounts_AlertsSweeps}</p>
                    </div>
				</div>
			);
		}
	},
	renderSweep() {
		return (
			<div className="alertPanel">
				<div className="panel-image sweep">
					<img src="../images/common/lollipop.png"/>
				</div>
				<h1>{this.props.content.sweeps}</h1>
				<p>{this.props.content.sweepMessage}</p>
				<a className="page-options border opt-white" onClick={this.props.createSweep}>
					<span className="icon icon-move"></span>
					<span>{this.props.content.createMySweep}</span>
				</a>
			</div>
		);
	},

	renderAlert() {
		return (
			<div className="alertPanel">
				<div className="panel-image alert">
					<img src="../images/common/alarm.png"/>
				</div>
				<h1>Alerts</h1>
				<p>{this.props.content.alertMessage}</p>
				<a className="page-options border opt-white" onClick={this.props.createAlert}>
					<span className="icon icon-alerts"></span>
					<span>{this.props.content.createMyAlert}</span>
				</a>
			</div>
		);
	},

	render() {
		return (
			<div className="select-your-choice">
				{
					this.showDefault()
				}
			</div>
		);
	},
});

module.exports = NewUserAlertSweepComponent;

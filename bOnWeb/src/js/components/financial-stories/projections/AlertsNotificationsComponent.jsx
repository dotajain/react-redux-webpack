/**
 * @module Alerts And Notification component
 */

const React = require('react');
const Helmet = require('react-helmet');
const FinancialStoriesStore = require('../../../stores/FinancialStoriesStore');
const Select = require('react-select-box');
const ProjectionStore = require('../../../stores/ProjectionStore');
const ProjectionActionCreator = require('../../../actions/ProjectionActionCreator');

let amount;
const Toggle = require('../../common/Toggle');
const num = new RegExp("^[0-9]+$");
const getStateFromStores = () => {
	return {
		overdraftArray: FinancialStoriesStore.getOverDraftAmount(),
		alertsAmountValue: ProjectionStore.getProjectionAlertsAmountValue(),
		notificationFlag: ProjectionStore.getProjectionAlertsNotificationBoolean(),
		overDraftAmount: FinancialStoriesStore.getOverDraftAmount(),
		selectedValue: "1",
	}
}
const AlertsNotificationsComponent = React.createClass({

	propTypes: {
		alertsAmountValue: React.PropTypes.string,
		changeTheValue: React.PropTypes.func,
		notificationFlag: React.PropTypes.bool,
		changeTheNotificationFlag: React.PropTypes.func,
	},
	getInitialState() {
		return getStateFromStores();
	},
	OnChange(e) {
		this.setState({ selectedValue: e });
	},
	dropdownList() {
		return <div className="fc-select">
			<Select name="select" onChange={this.OnChange} value={this.state.selectedValue}>
				<option value="1">{this.props.content.projectionAlertsDropdownOption1}</option>
				<option value="2">{this.props.content.projectionAlertsDropdownOption2}</option>

			</Select>
		</div>
	},

	render() {

		return (<div >
			<Helmet title="Projections" />
			<div >
				<div >
					<div className="settings-content-wrapper">
						<div className="row">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div id="alerts-tab-container" className="text-center">
										<p className="tab-header">{this.props.content.projectionSettingsAlertsAndNotificationsHeader}</p>
										<div className="fc-alert-box">
											<div className="alert-bell"></div>
											<div className="currency-holder">
												<h3 className="p-content first-line">{this.props.content.projectionSettingsAlertsAndNotificationsContent}</h3>
												<div className="currency">
													<label className="">&pound;</label>
													<input type="text"
														placeholder="" value={this.props.alertsAmountValue}
														onChange={this.props.changeTheValue}

														/>
												</div>
												{this.dropdownList()}

												<h3 className="p-content">{this.props.content.projectionSettingsAlertsAndNotificationsFooter}</h3>

												<div className="smsline">
												<div className="toggle default">
													<Toggle defaultChecked={this.props.notificationFlag}
														value={this.props.notificationFlag}
														onChange={this.props.changeTheNotificationFlag}
														aria-label="No label tag" />
												</div>{this.props.content.projectionAlertAndNotificationsToggleText}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>);
	}
});

module.exports = AlertsNotificationsComponent;

/**
 * @module AboutB Screen
 */

const React = require('react');
const { PropTypes } = React;
const AboutBDashboardInfo = require('./AboutBDashboardInfo');
const AboutB = React.createClass({
  propTypes: {
		content: PropTypes.object,
		closed: PropTypes.func,
  },
  render() {
		return (
			<div className="b container-fluid about-b ">
				<div className="row" >
					<div className="col-lg-12 col-md-12" style={{ 'height': '415px', 'overflow-y': 'scroll', '-ms-overflow-style': '-ms-autohiding-scrollbar' }}>
						<h3 className="bold">
							<div className="padding-bottom">{this.props.content.AboutBHead}</div></h3>
						<AboutBDashboardInfo iconName="icon icon-interest-rates" heading = {this.props.content.earnInterest}>
							<p className="strong" dangerouslySetInnerHTML = {{ __html: this.props.content.earnInterestData }}></p>
							<p>{this.props.content.earnInterestData1}</p>
							<p className="heading-small">{this.props.content.earnInterestData2}</p>
						</AboutBDashboardInfo>
						<AboutBDashboardInfo iconName="icon icon-help-get-help " heading = {this.props.content.getHelp}>
							<p>{this.props.content.getHelpData}</p>
						</AboutBDashboardInfo>

						<AboutBDashboardInfo iconName="icon icon-help-spending" heading = {this.props.content.trackYourSpending}>
							<p>{this.props.content.trackYourSpendingData}</p>
						</AboutBDashboardInfo>

						<AboutBDashboardInfo iconName="icon icon-overdrafts" heading = {this.props.content.overdraft}>
							<p className="sup" dangerouslySetInnerHTML = {{ __html: this.props.content.overdraftData }}></p>
							<p dangerouslySetInnerHTML = {{ __html: this.props.content.overdraftData1 }}></p>
							<div className= "table_background">
							<h5>{this.props.content.AboutBTableHead}</h5>
							<table className="table">
									<thead>
										<tr>
											<th>{this.props.content.AboutBR1C1}</th>
											<th>{this.props.content.AboutBR1C2}</th>
											<th className="sup" dangerouslySetInnerHTML = {{ __html: this.props.content.AboutBR1C3 }}></th>
										</tr>
									</thead>	
									<tbody>

										<tr>
											<td>{this.props.content.AboutBR2C1}</td>
											<td>{this.props.content.AboutBR2C2}</td>
											<td>{this.props.content.AboutBR2C3}</td>
										</tr>

									</tbody>
								</table>
								</div>
						</AboutBDashboardInfo>

						<AboutBDashboardInfo iconName="icon icon-help-spending" heading = {this.props.content.useyourtimeline}>
							<p>{this.props.content.useyourtimelineData}</p>
						</AboutBDashboardInfo>


						<AboutBDashboardInfo iconName="icon icon-alerts" heading = {this.props.content.freeAlerts}>
							<p>{this.props.content.freeAlertsData}</p>
						</AboutBDashboardInfo>


						<AboutBDashboardInfo iconName="icon-projections" heading = {this.props.content.projections}>
							<p>{this.props.content.projectionsData}</p>
						</AboutBDashboardInfo>


						<AboutBDashboardInfo iconName="icon icon-logout" heading = {this.props.content.sweeps}>
							<p>{this.props.content.sweepsData}</p>
						</AboutBDashboardInfo>


						<AboutBDashboardInfo iconName="icon icon-goals" heading = {this.props.content.createSavingPots}>
							<p>{this.props.content.createSavingPotsData}</p>
						</AboutBDashboardInfo>

						<div className="padding-bottom"></div>
					</div>

					<div className="modal-footer col-lg-12 help_btn_panel">
						<button onClick={ this.props.closed} className="help_btn" data-anchor="confirm-cancel-button" bsSize="large" role="button" bsSize="large" block >{this.props.content.AboutBButton}</button>
					</div>

				</div>
			</div>
		);
  },
});

module.exports = AboutB;

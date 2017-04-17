/**
 * @module AboutB Screen
 */

const React = require('react');
const { PropTypes } = React;
const AboutBDashboardInfo = require('./AboutBDashboardInfo');
const AboutBMobile = React.createClass({
  propTypes: {
    content: PropTypes.object,
    closed: PropTypes.func,
  },
  render() {
    return (
      <div className="b container-fluid-full">
        <div className="help mobile-view">
          <div className="mobile-nav row no-gutters">
            <div className="col-xs-2"><a className="icon float-left" onClick={ this.props.closed}>Back</a></div>
            <div className="col-xs-8"><h3>{this.props.content.AboutBHead}</h3></div>
            <div className="col-xs-2"></div>
            </div>

          <div className="mobile-content aboutB">
            <AboutBDashboardInfo iconName="icon icon-interest-rates"
              heading = {this.props.content.earnInterest}
            >
              <p className="strong" dangerouslySetInnerHTML = {{ __html: this.props.content.earnInterestData }}></p>
              <p>{this.props.content.earnInterestData1}</p>
              <div className="heading-small">{this.props.content.earnInterestData2}</div>
            </AboutBDashboardInfo>
            <AboutBDashboardInfo iconName="icon icon-help-get-help "
              heading = {this.props.content.getHelp}
            >
              <p>{this.props.content.getHelpData}</p>
            </AboutBDashboardInfo>

            <AboutBDashboardInfo iconName="icon icon-help-spending"
              heading = {this.props.content.trackYourSpending}
            >
              <p>{this.props.content.trackYourSpendingData}</p>
            </AboutBDashboardInfo>

            <AboutBDashboardInfo iconName="icon icon-overdrafts"
              heading = {this.props.content.overdraft}
            >
              <p className="sup" dangerouslySetInnerHTML = {{ __html: this.props.content.overdraftData }}></p>
              <p className="heading-small sup" dangerouslySetInnerHTML = {{ __html: this.props.content.overdraftData1 }}></p>
            </AboutBDashboardInfo>
            <AboutBDashboardInfo>
            <div className= "table_background">
              <h5>{this.props.content.AboutBTableHead}</h5>
              <ul className= "representaion">
                  <li>
                    <h5>{this.props.content.AboutBR1C1}</h5>
                    <p>{this.props.content.AboutBR2C1}</p>
                  </li>
                  <li>
                    <h5>{this.props.content.AboutBR1C2}</h5>
                    <p>{this.props.content.AboutBR2C2}</p>
                  </li>
                  <li>
                    <h5 className="sup" dangerouslySetInnerHTML = {{ __html: this.props.content.AboutBR1C3 }}></h5>
                    <p>{this.props.content.AboutBR2C3}</p>
                  </li>
                </ul>
            </div>
            </AboutBDashboardInfo>

            <AboutBDashboardInfo iconName="icon icon-help-spending"
              heading = {this.props.content.useyourtimeline}
            >
              <p>{this.props.content.useyourtimelineData}</p>
            </AboutBDashboardInfo>

            <AboutBDashboardInfo iconName="icon icon-alerts"
              heading = {this.props.content.freeAlerts}
            >
              <p>{this.props.content.freeAlertsData}</p>
            </AboutBDashboardInfo>

            <AboutBDashboardInfo iconName="icon-projections"
              heading = {this.props.content.projections}
            >
              <p>{this.props.content.projectionsData}</p>
            </AboutBDashboardInfo>

            <AboutBDashboardInfo iconName="icon icon-logout"
              heading = {this.props.content.sweeps}
            >
              <p>{this.props.content.sweepsData}</p>
            </AboutBDashboardInfo>

            <AboutBDashboardInfo iconName="icon icon-goals"
              heading = {this.props.content.createSavingPots}
            >
              <p>{this.props.content.createSavingPotsData}</p>
            </AboutBDashboardInfo>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = AboutBMobile;

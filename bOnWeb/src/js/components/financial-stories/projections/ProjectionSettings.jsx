/**
 * @module projection settings page
 */
const React = require('react');
const Helmet = require('react-helmet');
const Button = require('react-bootstrap/lib/Button');
const Panel = require('react-bootstrap/lib/Panel');
const Nav = require('react-bootstrap/lib/Nav');
const Navbar = require('react-bootstrap/lib/Navbar');
const NavItem = require('react-bootstrap/lib/NavItem');
const Tabs = require('react-bootstrap/lib/Tabs');
const Tab = require('react-bootstrap/lib/Tab');
const { PropTypes } = React;
const EarningAndCommitmentComponent = require('./EarningAndCommitmentComponent');
const EssentialSpendingsComponent = require('./EssentialSpendingsComponent');
const AlertsNotificationsComponent = require('./AlertsNotificationsComponent');
const FinancialStoriesModal = require('../tag/FinancialStoriesModal');
const tagList = [];
const _ = require('lodash');
const update = require('react-addons-update');
const getStateFromStores = () => {
    return {
        value: null,
        dLeaveSetup: false,
    };
};
const ProjectionSettings = React.createClass({
    propTypes: {
        cancelButtonFlag: React.PropTypes.bool,
        _cancel_button: React.PropTypes.func,
        onLoad: React.PropTypes.bool,
        content: React.PropTypes.object,
        doneClicked: React.PropTypes.func,
        _opt_out_of_projections: React.PropTypes.func,
        earningsAndCommitmentsData: React.PropTypes.object,
        getEarningsId: React.PropTypes.func,
        modifiedTags: React.PropTypes.func,
        modifiedUserTag: React.PropTypes.func,
        alertsAmountValue: React.PropTypes.func,
        changeTheValue: React.PropTypes.func,
        notificationFlag: React.PropTypes.bool,
        notificationAlert: React.PropTypes.bool,
        changeTheNotificationFlag: React.PropTypes.func,
        optOutFlag: React.PropTypes.bool,
        cancelFlag: React.PropTypes.bool,
        dLeaveSetup: React.PropTypes.bool,
        onclickCancelForOptOut: React.PropTypes.func,
        onclickLeaveSetup: React.PropTypes.func,
        optoutDemo: React.PropTypes.func,
        doneProjectionSettings: React.PropTypes.func,
    },
    getInitialState() {
        return getStateFromStores();
    },
    render() {
        return (
            <div className="settings-main-wrapper">
                <div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        {this.props.cancelButtonFlag ? <p><a href="#" onClick={this.props._cancel_button} disabled={this.props.onLoad}>{this.props.content.projectionSettingsCancelButton}</a></p> : <p><a href="#" onClick={this.props.doneClicked}>Back</a></p>}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        {this.props.cancelButtonFlag ? <p className="settings" onClick={this.props._opt_out_of_projections}><span className="icon icon-opt-out"></span><a href="#">{this.props.content.projectionSettingsOptOutOfProjection}</a></p> : ''}
                    </div>
                    <div className="clear"></div>
                    <div className="setting-nav">
                        <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example" bsStyle="pills">
                            <Tab eventKey={1} title={this.props.content.projectionSettingsEarningsAndCommitments}><EarningAndCommitmentComponent data={this.props.earningsAndCommitmentsData} getEarningsId={this.props.getEarningsId} content={this.props.content} /></Tab>
                            <Tab eventKey={2} title={this.props.content.projectionSettingsEssentialSpending}><EssentialSpendingsComponent data={this.props.earningsAndCommitmentsData} selectTag={this.selectTag} modifiedUserTag={this.props.modifiedUserTag} modifiedTags={this.props.modifiedTags} content={this.props.content} /></Tab>
                            <Tab eventKey={3} title={this.props.content.projectionSettingsAlertsAndNotifications}><AlertsNotificationsComponent alertsAmountValue={this.props.alertsAmountValue} changeTheValue={this.props.changeTheValue} notificationFlag={this.props.notificationFlag} notificationAlert={this.props.notificationAlert} changeTheNotificationFlag={this.props.changeTheNotificationFlag} content={this.props.content} /></Tab>
                        </Tabs><div className="clear"></div></div>
                </div>
                {this.props.optOutFlag ? <FinancialStoriesModal header={this.props.content.projectionOptOutOfProjectionsPopupHeader} content={this.props.content.projectionOptOutOfProjectionsPopupContent} confirmCancel={this.props.optOutFlag} yesButton cancelButton cancelText={this.props.content.projectionLeaveProjectionsSetupPopupCancelButton} onClickDeleteTag={this.props.onclickCancelForOptOut} yesText={this.props.content.projectionOptOutOfProjectionsPopupOptOutButton} /> : null}
                {this.props.cancelFlag ? <FinancialStoriesModal header={this.props.content.projectionLeaveProjectionsSetupPopupHeader} content={this.props.content.projectionLeaveProjectionsSetupPopupContent} confirmCancel={this.props.cancelFlag} yesButton cancelButton cancelText={this.props.content.projectionLeaveProjectionsSetupPopupCancelButton} onClickDeleteTag={this.props.onclickLeaveSetup} yesText={this.props.content.projectionLeaveProjectionsSetupPopupLeaveSetupButton} /> : null}
                {this.props.dLeaveSetup ? <FinancialStoriesModal header="Leave Projections Setup" content="Are you sure you want to leave  projections setup? Your changes will not be saved." confirmCancel={this.props.dLeaveSetup} yesButton cancelButton cancelText="Cancel" onClickDeleteTag={this.props.optoutDemo} yesText="Leave setup" /> : null}
                <button className="action-button white" onClick={this.props.doneProjectionSettings}>{this.props.content.projectionSettingsDoneButton}</button>
            </div>
        );
    },
});
module.exports = ProjectionSettings;

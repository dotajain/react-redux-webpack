/**
 * @module projection page (landing page for projections)
 */
const React = require('react');
const PropTypes = React;
const config = require('../../../config');
const _ = require('lodash');
const FinancialStoriesStore = require('../../../stores/FinancialStoriesStore');
const ProjectionTourComponent = require('./ProjectionTourComponent');
const ProjectionCrunching = require('./ProjectionCrunching');
const ProjectionStore = require('../../../stores/ProjectionStore');
const FinancialStoriesActionCreator = require('../../../actions/FinancialStoriesActionCreator');
const AccountOpeningActions = require('../../../actions/AccountOpeningActions');
const ProjectionActionCreator = require('../../../actions/ProjectionActionCreator');
const ProjectionScreen = require('./ProjectionScreen');
const BrowserUtils = require('../../../utils/BrowserUtils');
const AnalyticsActionCreator = require('../../../actions/AnalyticsActionCreator');
let categoryTags = [];
let userTags = [];
let earningIDArray = [];
let earningsId = [];
let num = /^[0-9]+$/;

const getStateFromStores = () => {
    return {
        overDraftAmount: FinancialStoriesStore.getOverDraftAmount(),
        currency: ProjectionStore.getCurrency(),
        alertsAmountValue: ProjectionStore.getProjectionAlertsAmountValue(),
        notificationFlag: ProjectionStore.getProjectionAlertsNotificationBoolean(),
        earningsAndCommitmentsData: ProjectionStore.getEarningsAndCommitments(),
        categoryTags: ProjectionStore.getCategoryTags(),
        userTags: ProjectionStore.getUserTags(),
        newFlag: false,
        tagFlag: '',
        optOutFlag: false,
        cancelFlag: false,
        tourFlag: false,
        onLoad: FinancialStoriesStore.getOnLoad(),
        cancelButtonFlag: FinancialStoriesStore.getCancelButtonFlag(),

        tour: ProjectionStore.getTourFlag(),
        activityIndicator: ProjectionStore.getActivityIndicator(),
        dLeaveSetup: false,
        crunch: ProjectionStore.getCrunching(),
    };
};
const ProjectionPage = React.createClass({
    propTypes: {
        data: React.PropTypes.object,
        content: React.PropTypes.object,
    },
    getInitialState() {
        return getStateFromStores();
    },
    componentWillMount() {
        ProjectionActionCreator.getEarningsAndCommitment();
        BrowserUtils.setViewPort(0);
    },
    componentDidMount() {
      //  ProjectionActionCreator.getEarningsAndCommitment();
        ProjectionStore.addChangeListener(this.onStoreChange);
        FinancialStoriesStore.addChangeListener(this.onStoreChange);
    },
    componentWillUnmount() {
        ProjectionStore.removeChangeListener(this.onStoreChange);
        FinancialStoriesStore.removeChangeListener(this.onStoreChange);
    },
    onStoreChange() {
        this.setState(getStateFromStores());
    },


    // method for click on Opt out in model
    onclickCancelForOptOut() {
        this.setState({
            dLeaveSetup: false,
            cancelFlag: false,
            optOutFlag: false,
        });
        this.setState({
            tour: false,
        });
        categoryTags = ProjectionStore.getCategoryTagsForProjectionTab();
        userTags = ProjectionStore.getUserTagsForProjectionTab();
        earningIDArray = ProjectionStore.getEarningId();
        let cpProjectionPreferences = {
            'enabled': false,
            'thresholds': {
                'lower': {
                    'amount': {
                        'value': parseInt(this.state.alertsAmountValue),
                        'currency': 'GBP',
                    },
                },
            },
            'forecasts': [],
            'external_notification': this.state.notificationFlag,
            'earning_ids': earningIDArray,

            'essential_spend': {
                'tag_ids': userTags,
                'category_ids': categoryTags,
            },
        };
        const requestData = { cpProjectionPreferences: cpProjectionPreferences, from: 'optout' };
        AnalyticsActionCreator.track({
            path: '/user/experience/activity',
            action: 'Interacted',
        }, {
                description: config.analytics.analytics_action_projections_save_settings,
                event: 'click',
            });
        ProjectionActionCreator.projectionCrunchBackClicked();
        ProjectionActionCreator.doneProjections(requestData);
        FinancialStoriesActionCreator.handleUpdateFSTileClick();
        AccountOpeningActions.navigateToWebTask('WEB-OPEN-FINANCIAL_STORIES');
    },

    // method to handle the leave setup in the projection details page
    onclickLeaveSetup() {
        this.setState({
            dLeaveSetup: false,
            cancelFlag: false,
            optOutFlag: false,
            onLoad: true,
        });
        //ProjectionActionCreator.handleEarningsCommitmentSuccess(this.state.earningsAndCommitmentsData);
        ProjectionActionCreator.handleProjectionSettingLeaveSetup();
    },
    // method to handle cancel button in the projection details page
    _cancel_button() {
        this.setState({
            dLeaveSetup: false,
            optOutFlag: false,
            cancelFlag: true,
        });
    },
    // method for click of opt out of projection
    _opt_out_of_projections() {
        this.setState({
            cancelFlag: false,
            optOutFlag: true,
            dLeaveSetup: false,
        });
    },
    // mwthod to change the value in the alert and notification  component
    changeTheValue(e) {
        this.setState({
            cancelFlag: false,
            optOutFlag: false,
            dLeaveSetup: false,
            onLoad: false,
        });
        AnalyticsActionCreator.track({
            path: '/user/experience/activity',
            action: 'Interacted',
        }, {
                description: config.analytics.analytics_action_projections_threshold_change,
                event: 'click',
            });
        //let numFlag = num.test(e.target.value);
        // let test = e.target.value.match(/^[0-9]+$/);
        // if (test != null || e.target.value == '') {
        //     this.setState({
        //         alertsAmountValue: e.target.value,
        //     }, function () { }.bind(this));
        //     ProjectionActionCreator.setAlertNotificationAmount(this.state.alertsAmountValue);
        // }
        const etarget = e.target.value.replace(/[^\d\.]*/g, '');
        // check number of dots (max 1)
        const len = etarget.length;
        const index = etarget.indexOf('.');
        const dots = etarget.split('.').length;
        const beforeDecimalLen = etarget.split('.')[0].length;
        let isValid = true;

        // restricted length (max 6) before decimal place.
        if (beforeDecimalLen > 6) {
            isValid = false;
        }
        // decimal point restrict to 1
        if (dots > 2) {
            isValid = false;
        }

        // check only two decimal pointer after dot.
        if (index >= 0) {
            const CharAfterdot = (len + 1) - index;
            if (CharAfterdot > 4) {
                isValid = false;
            }
        }

        if (isValid) {
            //let newVal = String(etarget).replace(/^0+/, 0);

            this.setState({
                alertsAmountValue: etarget,
            }, function () { }.bind(this));

            ProjectionActionCreator.setAlertNotificationAmount(this.state.alertsAmountValue);
        }
    },
    // method to change the notification falg of the alerta and notification flag
    changeTheNotificationFlag() {
        this.setState({
            onLoad: false,
            cancelFlag: false,
            optOutFlag: false,
            dLeaveSetup: false,
        });
        this.setState({
            notificationFlag: !this.state.notificationFlag,
        });
        ProjectionActionCreator.setAlertsNotificationFlag(this.state.notificationFlag);
    },
    goToProjectionSettingsPage() {

        // this.setState({
        //     onLoad: false,
        // });
            AnalyticsActionCreator.track({
                path: '/user/experience/activity',
                action: 'Interacted',
            }, {
                    description: config.analytics.analytics_action_projections_settings_review,
                    event: 'click',
                });
        FinancialStoriesActionCreator.projectionSettingClicked();

    },

    //compare
    compareObject() {
        categoryTags = ProjectionStore.getCategoryTagsForProjectionTab();
        userTags = ProjectionStore.getUserTagsForProjectionTab();
        earningIDArray = ProjectionStore.getEarningId();
        let earningIds = [];
        let catIds = [];
        let userIds = [];
        let earningsF = true;
        let userF = true;
        let catF = true;
        let alertAmountF = true;
        let alertNotFlag = true;
        let alertAmount = ProjectionStore.getActualAmountWithDecimal();
        let alertFlag = this.state.earningsAndCommitmentsData.external_notification;
        this.state.earningsAndCommitmentsData.earnings.map((earningid) => {
            if (earningid.enabled === true) {
                earningIds.push(earningid.id);
            }
        });
        this.state.earningsAndCommitmentsData.essential_spend.tags.map((tag) => {
            if (tag.enabled === true) {
                userIds.push(tag.id);
            }
        });
        this.state.earningsAndCommitmentsData.essential_spend.categories.map((category) => {
            if (category.enabled === true) {
                catIds.push(category.id);
            }
        });
        earningsF = _.isEqual(earningIds, earningIDArray);
        userF = _.isEqual(userIds, userTags);
        catF = _.isEqual(catIds, categoryTags);
        alertAmountF = _.isEqual(alertAmount, this.state.alertsAmountValue);
        alertNotFlag = _.isEqual(alertFlag, this.state.notificationFlag);
        return (earningsF && userF && catF && alertAmountF && alertNotFlag);
    },

    // method to handle the projection settings done button
    doneProjectionSettings() {
        this.setState({
            cancelFlag: false,
            optOutFlag: false,
            dLeaveSetup: false,
            onLoad: false,
        });
        if (ProjectionStore.isDemoDoneCliked() || !this.compareObject()) {
            AnalyticsActionCreator.track({
                path: '/user/experience/activity',
                action: 'Interacted',
            }, {
                    description: config.analytics.analytics_action_projections_save_settings,
                    event: 'click',
                });
            categoryTags = ProjectionStore.getCategoryTagsForProjectionTab();
            userTags = ProjectionStore.getUserTagsForProjectionTab();
            earningIDArray = ProjectionStore.getEarningId();
            let amountVal = this.state.alertsAmountValue;
            if (amountVal === '.' || amountVal === '') {
                amountVal = 0;
            }

            let cpProjectionPreferences = {
                'enabled': true,
                'thresholds': {
                    'lower': {
                        'amount': {
                            'value': parseFloat(amountVal),
                            'currency': 'GBP',
                        },
                    },
                },
                'forecasts': [],
                'external_notification': this.state.notificationFlag,
                'earning_ids': earningIDArray,

                'essential_spend': {
                    'tag_ids': userTags,
                    'category_ids': categoryTags,
                },

            };
            const requestData = { cpProjectionPreferences: cpProjectionPreferences, from: 'done' };
            ProjectionActionCreator.doneProjections(requestData);

            //ProjectionActionCreator.handleFSProjectionTourDone();
        } else {
            this.setState({
                onLoad: true,
            })
        }
        // }
        // else{
        //   FinancialStoriesActionCreator.handleUpdateFSTileClick();
        // }
        //  FinancialStoriesActionCreator.handleUpdateFSTileClick();
        // AccountOpeningActions.navigateToWebTask('WEB-OPEN-FINANCIAL_STORIES');
    },
    // method to handle projection settings button
    projectionSettingsPage() {
        this.setState({
            onLoad: !this.state.onLoad,
            tour: !this.state.tour,
        });
    },
    // method to handle back button
    back() {
        this.setState({
            tour: this.state.tour,
        });
    },
    // method to handle the closed function of the demo page
    closed() {
        console.log('Closed clicked...');
        FinancialStoriesActionCreator.handleFSProjectionTourDone();
        ProjectionActionCreator.handleFSProjectionTourDone();
        //this.setState({
        //    onLoad: !this.state.onLoad,

        //});
        this.setState({
            onLoad: false,
        });
    },
    // method to handle the back button of the projections settings page in the set up demo mode.
    backToAccount() {
        FinancialStoriesActionCreator.handleUpdateFSTileClick();
        AccountOpeningActions.navigateToWebTask('WEB-OPEN-FINANCIAL_STORIES');
    },
    modifiedTags(id) {
        this.setState({
            onLoad: false,
            cancelFlag: false,
            optOutFlag: false,
            dLeaveSetup: false,
        });
        categoryTags = ProjectionStore.getCategoryTags();
        let value = _.indexOf(categoryTags, id);
        if (value < 0) {

            categoryTags.push(id);
            AnalyticsActionCreator.track({
                path: '/user/experience/activity',
                action: 'Interacted',
            }, {
                    description: config.analytics.analytics_action_projections_add_essential_spend_tags,
                    event: 'click',
                });

        }
        else {

            categoryTags.splice(value, 1);
            AnalyticsActionCreator.track({
                path: '/user/experience/activity',
                action: 'Interacted',
            }, {
                    description: config.analytics.analytics_action_projections_remove_essential_spend_tags,
                    event: 'click',
                });
        }
        // console.log(categoryTags);
        //this.forceUpdate();
        ProjectionActionCreator.getCategoryTagsForTab(categoryTags);


    },
    modifiedUserTag(id) {
        this.setState({
            onLoad: false,
            cancelFlag: false,
            optOutFlag: false,
            dLeaveSetup: false,
        });
        userTags = ProjectionStore.getUserTags();
        let value = _.indexOf(userTags, id);
        if (value < 0) {
            userTags.push(id);
            AnalyticsActionCreator.track({
                path: '/user/experience/activity',
                action: 'Interacted',
            }, {
                    description: config.analytics.analytics_action_projections_remove_essential_spend_tags,
                    event: 'click',
                });
        }
        else {
            userTags.splice(value, 1);
        }
        //this.forceUpdate();
        ProjectionActionCreator.getUserTagsForTab(userTags);
    },
    getEarningsId(id, flag) {
        this.setState({
            onLoad: false,
            cancelFlag: false,
            optOutFlag: false,
            dLeaveSetup: false,
        });
        AnalyticsActionCreator.track({
            path: '/user/experience/activity',
            action: 'Interacted',
        }, {
                description: config.analytics.analytics_action_projections_earnings_transaction_toggle,
                event: 'click',
            });
        earningsId = ProjectionStore.getEarningId();
        let value = _.indexOf(earningsId, id);
        if (value < 0) {
            earningsId.push(id);
        }
        else {
            earningsId.splice(value, 1);
        }
        ProjectionActionCreator.setEarningsId(earningsId);
    },
    optoutDemo() {
        this.setState({
            cancelFlag: false,
            optOutFlag: false,
            dLeaveSetup: false,
        });
        ProjectionActionCreator.projectionCrunchBackClicked();
        FinancialStoriesActionCreator.handleUpdateFSTileClick();
        AccountOpeningActions.navigateToWebTask('WEB-OPEN-FINANCIAL_STORIES');
    },
    doneClicked() {
        this.setState({
            cancelFlag: false,
            optOutFlag: false,
            dLeaveSetup: true,
        });

    },
    doneClickCrunch() {
        ProjectionActionCreator.projectionCrunchBackClicked();
        FinancialStoriesActionCreator.handleUpdateFSTileClick();
        AccountOpeningActions.navigateToWebTask('WEB-OPEN-FINANCIAL_STORIES');
    },
    getWheelComponent() {
        if (this.state.crunch) {
            return (<ProjectionCrunching doneClickCrunch={this.doneClickCrunch} content={this.props.content} />);
        } else {
            return (<ProjectionScreen
                onLoad={this.state.onLoad}
                goToProjectionSettingsPage={this.goToProjectionSettingsPage}
                optOutFlag={this.state.optOutFlag}
                cancelFlag={this.state.cancelFlag}
                alertsAmountValue={this.state.alertsAmountValue}
                notificationFlag={this.state.notificationFlag}
                earningsAndCommitmentsData={this.state.earningsAndCommitmentsData}
                projectionsettingsFlag={this.state.tour}
                changeTheValue={this.changeTheValue}
                _opt_out_of_projections={this._opt_out_of_projections}
                onclickCancelForOptOut={this.onclickCancelForOptOut}
                _cancel_button={this._cancel_button}
                onclickLeaveSetup={this.onclickLeaveSetup}
                doneProjectionSettings={this.doneProjectionSettings}
                changeTheNotificationFlag={this.changeTheNotificationFlag}
                getEarningsId={this.getEarningsId}
                onLoad={this.state.onLoad}
                modifiedUserTag={this.modifiedUserTag}
                modifiedTags={this.modifiedTags}
                projectionSummary={this.props.data}
                projectionSettingsPage={this.projectionSettingsPage}
                cancelButtonFlag={this.state.cancelButtonFlag}
                showCrunching={this.state.showCrunching}
                backToAccount={this.backToAccount}
                content={this.props.content}
                activityIndicator={this.props.activityIndicator}
                dLeaveSetup={this.state.dLeaveSetup}
                doneClicked={this.doneClicked}
                optoutDemo={this.optoutDemo}
                />);
        }
    },
    render() {
        return (
            this.state.activityIndicator ? <div className="chicken-loading"></div> : this.getWheelComponent()
        );
    },
});

module.exports = ProjectionPage;

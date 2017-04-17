/**
 * @module projection screen for wheel component, crunching screen and settings page
 */

const React = require('react');
const _ = require('lodash');
const { PropTypes } = React;
import { Swipeable, defineSwipe } from 'react-touch';
const Helmet = require('react-helmet');
const ProjectionStore = require('../../../stores/ProjectionStore');
const NumberUtils = require('../../../utils/NumberUtils');
const ProjectionDateUtils = require('../../../utils/ProjectionDateUtils');
const DateUtils = require('../../../utils/DateUtils');
const ProjectionDetailsPage = require('./ProjectionDetailsPage');
const FinancialStoriesActionCreator = require('../../../actions/FinancialStoriesActionCreator');
const AccountOpeningActions = require('../../../actions/AccountOpeningActions');
const PoundIcon = require('./SvgIcons/Pound');
const WalletIcon = require('./SvgIcons/Wallet');
const TrolleyIcon = require('./SvgIcons/Trolley');
const CameraIcon = require('./SvgIcons/Camera');
const Wheel = require('./SvgIcons/Wheel');
const moment = require('moment');
const ProjectionSettings = require('./ProjectionSettings');
let interval;
let essentialSpendHeader = "You've tagged";
let essentialSpendContent1 = 'as essential spend. Your top tags are';
let essentialSpendContent2 = 'as essential spend. Your tag is';
let essentialSpendFooter = 'you can change these in projection settings';
let earningsHeader = 'The next cash coming into your account should be';
let earningsFooter = 'See this in the Projection Settings';
let hasNextEarnings;
let nextEarningsAmount;
let _isMounted = false;
const getStateFromStores = () => {
    return {
        wheelDegree: 0,
    };
};
const ProjectionScreen = React.createClass({
    propTypes: {
        content: React.PropTypes.object,
        projectionSummary: React.PropTypes.object,
        cancelButtonFlag: React.PropTypes.bool,
        alertsAmountValue: React.PropTypes.number,
        notificationFlag: React.PropTypes.bool,
        earningsAndCommitmentsData: React.PropTypes.object,
        changeTheValue: React.PropTypes.func,
        _opt_out_of_projections: React.PropTypes.func,
        _cancel_button: React.PropTypes.func,
        onclickLeaveSetup: React.PropTypes.func,
        optOutFlag: React.PropTypes.bool,
        cancelFlag: React.PropTypes.bool,
        onclickCancelForOptOut: React.PropTypes.func,
        doneProjectionSettings: React.PropTypes.func,
        changeTheNotificationFlag: React.PropTypes.func,
        getEarningsId: React.PropTypes.func,
        modifiedTags: React.PropTypes.func,
        modifiedUserTag: React.PropTypes.func,
        onLoad: React.PropTypes.bool,
        backToAccount: React.PropTypes.func,
    },
    getInitialState() {
        return getStateFromStores();
    },
    componentWillMount() {
        ProjectionStore.removeChangeListener(this.onStoreChange);
    },
    componentDidMount() {
        _isMounted = true;
        ProjectionStore.addChangeListener(this.onStoreChange);

        if (this.props.projectionSummary.isCrunching) {
            interval = setInterval(this.projectionWheelRightMove, 420);
        }
    },
    componentWillUnmount() {
        _isMounted = false;
        clearInterval(interval);
    },
    onStoreChange() {
        this.setState(getStateFromStores());
    },
    // method defined to move the wheel component left side. 
    projectionWheelLeftMove() {
        if (_isMounted) {
            this.setState({ wheelDegree: this.state.wheelDegree + 72 });
        }
    },
    // method defined to move the wheel component right side.
    projectionWheelRightMove() {
        if (_isMounted) {
            this.setState({ wheelDegree: this.state.wheelDegree - 72 });
        }
    },
    // method defined to move the wheel component left click.
    projectionWheelLeftClick() {
        if (_isMounted) {
            this.setState({ wheelDegree: this.state.wheelDegree + 72 });
        }
    },
    // method defined to move the wheel component right side.
    projectionWheelRightClick() {
        if (_isMounted) {
            this.setState({ wheelDegree: this.state.wheelDegree - 72 });
        }
    },

    // methods for nextEarningProjectionPeriod()
    nextEarningProjectionPeriod() {
        if (this.props.projectionSummary !== undefined) {
            let i;
            for (i = 1; i <= this.props.projectionSummary.projection_periods.length; i++) {
                if (this.props.projectionSummary.projection_periods[i] !== undefined) {
                    if (this.props.projectionSummary.projection_periods[i].earnings !== undefined) {
                        if (this.props.projectionSummary.projection_periods[i].earnings.length > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
            return false;
        }
    },
    tomorrowsEarningsFlag() {
        if (this.props.projectionSummary.projection_periods !== undefined) {
            if (this.props.projectionSummary.projection_periods[0].earnings.length !== 0) {
                let TomString = 'You have cash coming in tomorrow';
            }
        }
    },
    // method to display first division of the wheel
    _getProjectionSummaryContent() {
        let currentAmount;
        let overAllAmount;
        let essentialAmount;
        let currentBalance;
        let essentialSpendAmount;
        let commitmentsAmount;
        let amount;
        let lowBalanceAmount;
        let lAmount;
        let tomorrowsEarnings;
        let tEarnings;
        let tLength;
        let projectionMiddleContent;
        if (this.props.projectionSummary !== undefined) {
            hasNextEarnings = this.props.projectionSummary.projection_periods.count > 0;
            if (this.props.projectionSummary.projection_periods[0].hasOwnProperty('warning_days')) {
                const warningDays = this.props.projectionSummary.projection_periods[0].warning_days;
                if (warningDays.length === 0) {
                    projectionMiddleContent = this.props.content.projectionsExpandedItemViewThisIsMadeUpOfSubHeading;
                    currentAmount = this.props.projectionSummary.projection_periods[0].period.from.available_balance.value;
                    currentBalance = <li><span className="value">{NumberUtils.appendCurrency('{}', currentAmount)}</span><span className="value-tag">{this.props.content.projectionsExpandedItemViewCurrentBalance}</span></li>;
                    essentialAmount = this.props.projectionSummary.projection_periods[0].essential_spend_info.total_amount.value;
                    essentialSpendAmount = <li><span className="value">{NumberUtils.appendCurrency('{}', essentialAmount)}</span><span className="value-tag">{this.props.content.projectionsExpandedItemViewEssentialSpend}</span></li>;
                    amount = this.props.projectionSummary.projection_periods[0].projected_transactions.total_amount.value;
                    commitmentsAmount = <li><span className="value">{NumberUtils.appendCurrency('{}', amount)}</span><span className="value-tag">{this.props.content.projectionsExpandedItemViewCommitments}</span></li>;
                    lAmount = this.props.projectionSummary.thresholds.lower.amount.value;
                    lowBalanceAmount = <li><span className="value">{NumberUtils.appendCurrency('{}', this.props.projectionSummary.thresholds.lower.amount.value * -1)}</span><span className="value-tag">{this.props.content.projectionsExpandedItemViewLowBalanceLimit}</span></li>;
                    tLength = this.props.projectionSummary.projection_periods[0].earnings.length;
                    tEarnings = tLength > 0 ? <li><span className="value">{NumberUtils.appendCurrency('{}', this.props.projectionSummary.projection_periods[0].earnings[0].amount.value)}</span><span className="value-tag">{this.props.content.projectionsExpandedItemViewTomorrowsEarnings}</span></li> : '';
                    if (this.props.projectionSummary.projection_periods[0].earnings.length > 0) {
                        tomorrowsEarnings = this.props.projectionSummary.projection_periods[0].earnings[0].amount.value;
                    } else {
                        tomorrowsEarnings = 0;
                        if (!this.nextEarningProjectionPeriod()) {
                            projectionMiddleContent = this.props.content.projectionsExpandedItemViewThisIsMadeUpOfWthin31DaysSubHeading;
                        } else {
                            projectionMiddleContent = this.props.content.projectionsExpandedItemViewThisIsMadeUpOfSubHeading;
                        }

                    }
                    overAllAmount = currentAmount + essentialAmount + amount + tomorrowsEarnings + (lAmount * -1);
                    const amountArr = _.split(NumberUtils.appendCurrency('{}', overAllAmount), '.');
                    return (
                        <div className="content-block" className={(this.state.wheelDegree === 0 ? 'active content-block' : '') || (this.state.wheelDegree % 360 === 0 ? 'active content-block' : '') || (this.state.wheelDegree % -360 === 0 ? 'active content-block' : '')}>
                            <h3 className="wheel-stmnt">{this.props.content.projectionSummaryHeaderNoWarningDays}</h3>
                            <h3 className="current-date">{amountArr[0]}.<sub>{amountArr[1]}</sub></h3>
                            <h3 className="wheel-stmnt2">{projectionMiddleContent}</h3>
                            <ul className="balance-info">
                                {currentBalance}
                                {tEarnings}
                                {commitmentsAmount}
                                {essentialSpendAmount}
                                {lowBalanceAmount}
                            </ul>
                            <h3 className="wheel-stmnt2">{this.props.content.projectionsExpandedItemViewSpinTheWheelFootNote}</h3>
                        </div>);
                }
                else if (warningDays.length > 0) {
                    let amount = NumberUtils.appendCurrency('{}', this.props.projectionSummary.thresholds.lower.amount.value);
                    // projectionSummaryHeader = "Looks like you'll go below your low balance limit of" + ' ' + NumberUtils.appendCurrency('{}', this.props.projectionSummary.thresholds.lower.amount.value) + ' ' + 'on';
                    let projectionSummaryHeader = this.props.content.projectionSummaryHeaderWarningDays.replace('{amount}', amount);
                    currentAmount = this.props.projectionSummary.projection_periods[0].period.from.available_balance.value;
                    currentBalance = <li><span className="value">{NumberUtils.appendCurrency('{}', currentAmount)}</span><span className="value-tag">Current Balance</span></li>;
                    essentialAmount = this.props.projectionSummary.projection_periods[0].essential_spend_info.total_amount.value;
                    essentialSpendAmount = <li><span className="value">{NumberUtils.appendCurrency('{}', essentialAmount)}</span><span className="value-tag">Essential spend</span></li>;
                    amount = this.props.projectionSummary.projection_periods[0].projected_transactions.total_amount.value;
                    commitmentsAmount = <li><span className="value">{NumberUtils.appendCurrency('{}', amount)}</span><span className="value-tag">Commitments</span></li>;
                    tLength = this.props.projectionSummary.projection_periods[0].earnings.length;
                    tEarnings = tLength > 0 ? <li><span className="value">{NumberUtils.appendCurrency('{}', this.props.projectionSummary.projection_periods[0].earnings[0].amount.value)}</span><span className="value-tag">{this.props.content.projectionsExpandedItemViewTomorrowsEarnings}</span></li> : '';
                    return (
                        <div className="content-block" className={(this.state.wheelDegree === 0 ? 'active content-block' : '') || (this.state.wheelDegree % 360 === 0 ? 'active content-block' : '') || (this.state.wheelDegree % -360 === 0 ? 'active content-block' : '')}>
                            <h3 className="wheel-stmnt">{projectionSummaryHeader}</h3>
                            <h3 className="current-date">{ProjectionDateUtils.dateConversion(this.props.projectionSummary.projection_periods[0].warning_days[0])}</h3>
                            <h3 className="wheel-stmnt"></h3>
                            <ul className="balance-info">
                                {currentBalance}
                                {tEarnings}
                                {commitmentsAmount}
                                {essentialSpendAmount}
                                {lowBalanceAmount}
                            </ul>
                            <h3 className="wheel-stmnt2">{this.props.content.projectionSpinWheelText}</h3>
                        </div>);
                }
            }
        }
    },
    // method to display only current balance
    _getCurrentBalanceContent() {
        let amountArr;
        if (this.props.projectionSummary.projection_periods !== undefined) {
            const cBalance = this.props.projectionSummary.projection_periods[0].period.from.available_balance.value;
            amountArr = _.split(NumberUtils.appendCurrency('{}', cBalance), '.');
        }
        return (
            <div className="content-block" className={((this.state.wheelDegree - 288) % 360 === 0 ? 'active content-block' : '') || ((this.state.wheelDegree + 72) % 360 === 0 ? 'active content-block' : '')}>
                <h3 className="wheel-stmnt">{this.props.content.projectionsExpandedItemViewYourCurrentBalanceHeading}</h3>
                <h3 className="current-date">{amountArr[0]}.<sub>{amountArr[1]}</sub></h3>
                <h3 className="wheel-stmnt2">{this.props.content.projectionsExpandedItemViewThisMayDifferFootNote}</h3>
            </div>
        );
    },
    // method to display commitment content
    _getCommitmentContent() {
        let count;
        let amount;
        if (this.props.projectionSummary !== undefined) {
            hasNextEarnings = this.props.projectionSummary.projection_periods.count > 0;
            count = this.props.projectionSummary.projection_periods[0].projected_transactions.transactions.length;
            if (count > 0) {
                let wheeltext = this.props.content.projectionsExpandedItemViewYouHaveOneCommitmentHeading;
                if (count > 1) {
                    wheeltext = this.props.content.projectionsExpandedItemViewYouHaveXCommitmentsPart1Heading + ' ' + '{count}' + ' ' + this.props.content.projectionsExpandedItemViewYouHaveXCommitmentsPart2Heading;
                    wheeltext = wheeltext.replace('{count}', count);
                }
                const cBalance = this.props.projectionSummary.projection_periods[0].projected_transactions.total_amount.value;
                const amountArr = _.split(NumberUtils.appendCurrency('{}', cBalance), '.');
                return (<div className={((this.state.wheelDegree - 216) % 360 === 0 ? 'active content-block' : '') || ((this.state.wheelDegree + 144) % 360 === 0 ? 'active content-block' : '')}>
                    <h3 className="wheel-stmnt">{wheeltext}</h3>
                    <h3 className="current-date">{amountArr[0]}.<sub>{amountArr[1]}</sub></h3>
                    <h3 className="wheel-stmnt2">{this.props.content.projectionsExpandedItemViewYouCanViewTheseFootNote}</h3>
                </div>);
            } else if (count == 0) {
                return (<div className={((this.state.wheelDegree - 216) % 360 === 0 ? 'active content-block' : '') || ((this.state.wheelDegree + 144) % 360 === 0 ? 'active content-block' : '')}>
                    <h3 className="wheel-stmnt">{this.props.content.projectionsExpandedItemViewYouHaveNoCommitmentsWithin31DaysHeading}</h3>
                </div>);
            }
        }
    },
    // method defined to show the essential Spend content.
    _getEssentialSpendContent() {
        let tagTotalmount;
        let tagsData;
        let content2;
        let thisThese;
        if (this.props.projectionSummary !== undefined) {
            hasNextEarnings = this.props.projectionSummary.projection_periods.count > 0;
            let tAmount = this.props.projectionSummary.projection_periods[0].essential_spend_info.total_amount.value;
            if (tAmount !== 0 && this.props.projectionSummary.projection_periods[0].essential_spend_info.essential_spend.length > 0) {
                const amountArr = _.split(NumberUtils.appendCurrency('{}', tAmount), '.');
                tagTotalmount = <h3 className="current-date">{amountArr[0]}.<sub>{amountArr[1]}</sub></h3>;
                tagsData = this.props.projectionSummary.projection_periods[0].essential_spend_info.essential_spend.map((essentialSpendings, i) => {
                    if (this.props.projectionSummary.projection_periods[0].essential_spend_info.essential_spend.length == 1) {
                        let tag = <label className="you-tag">{essentialSpendings.display_name}&nbsp;&nbsp;<span>{NumberUtils.appendCurrency('{}', essentialSpendings.amount.value)} </span></label>;
                        content2 = this.props.content.projectionsExpandedItemViewSingagEssentialSpendWithin31DaysSubHeading;
                        thisThese = this.props.content.projectionsExpandedItemViewYouCanChangeThisFootNote;
                        return (<span>{tag}</span>);
                    }
                    else {
                        let tag = <label className="you-tag">{essentialSpendings.display_name}&nbsp;&nbsp;<span>{NumberUtils.appendCurrency('{}', essentialSpendings.amount.value)} </span></label>;
                        content2 = this.props.content.projectionTagsContent;
                        thisThese = this.props.content.projectionsExpandedItemViewYouCanChangeTheseFootNote;
                        return (<span>{tag}</span>);
                    }

                });
                return (<div className={((this.state.wheelDegree - 144) % 360 === 0 ? 'active content-block' : '') || ((this.state.wheelDegree + 216) % 360 === 0 ? 'active content-block' : '')}>
                    <h3 className="wheel-stmnt">{this.props.content.projectionsExpandedItemViewYouveTaggedHeading}</h3>
                    {tagTotalmount}
                    <h3 className="wheel-stmnt2">{content2}</h3>
                    {tagsData}
                    <h3 className="wheel-stmnt2">{thisThese}</h3>
                </div>);
            }
            else if (tAmount !== 0 && this.props.projectionSummary.projection_periods[0].essential_spend_info.essential_spend.length == 0) {
                const amountArr = _.split(NumberUtils.appendCurrency('{}', tAmount), '.');
                tagTotalmount = <h3 className="current-date">{amountArr[0]}.<sub>{amountArr[1]}</sub></h3>;

                return (<div className={((this.state.wheelDegree - 144) % 360 === 0 ? 'active content-block' : '') || ((this.state.wheelDegree + 216) % 360 === 0 ? 'active content-block' : '')}>
                    <h3 className="wheel-stmnt">{this.props.content.projectionsExpandedItemViewYouveTaggedHeading}</h3>
                    {tagTotalmount}
                    <h3 className="wheel-stmnt2 stmnt-margin">{content2}</h3>

                    <h3 className="wheel-stmnt2">{this.props.content.projectionsExpandedItemViewYouCanChangeTheseFootNote}</h3>
                </div>);
            }
            else {
                essentialSpendHeader = '';
                essentialSpendContent1 = '';
                essentialSpendFooter = '';
                tagsData = <div>{this.props.content.projectionsExpandedItemViewNoTagsAsEssentialSpendSubHeading}</div>;
                return (<div className={((this.state.wheelDegree - 144) % 360 === 0 ? 'active content-block' : '') || ((this.state.wheelDegree + 216) % 360 === 0 ? 'active content-block' : '')}>

                    {tagsData}
                    <h3 className="wheel-stmnt2">&nbsp;&nbsp;</h3>

                    <h3 className="wheel-stmnt2">{this.props.content.projectionsExpandedItemViewYouCanChangeThisFootNote}</h3>
                </div>);
            }
        }
    },
    // method defined to show the next earning.
    _getNextEarningContent() {
        let amount;
        let earningData;
        let earningDate;
        let whenDate;
        let amountFormat;
        let amountArr;
        let dateOrd;
        let earningHeader1 = this.props.content.projectionsExpandedItemViewYourNextEarningHeading;
        let earningFooter1 = this.props.content.projectionsExpandedItemViewYouCanReviewThisFootNote;
        let warningDaysFlag = false;
        let tomorrowsFlagForEarnings = false;
        if (this.props.projectionSummary !== undefined) {
            if (this.props.projectionSummary.projection_periods[0] !== undefined) {
                if (this.props.projectionSummary.projection_periods[0].warning_days.length > 0) {
                    warningDaysFlag = true;
                }
                if (this.props.projectionSummary.projection_periods[0].earnings.length > 0) {
                    earningHeader1 = "You have cash coming in tomorrow";
                    earningFooter1 = "Spin the wheel to see what the future may look like";
                    tomorrowsFlagForEarnings = true;
                }
            }
        }
        let earningsFirstPeriodAmountArray = [];
        let earningsFirstPeriodTotalAmount = 0;
        let i;
       if (this.props.projectionSummary !== undefined) {
           if (this.props.projectionSummary.projection_periods !== undefined) {
              if (this.props.projectionSummary.projection_periods[0].earnings.length > 0) {
                this.props.projectionSummary.projection_periods[0].earnings.map((earningsAmount) => {
                      earningsFirstPeriodAmountArray.push(earningsAmount.amount.value);
                      earningsFirstPeriodTotalAmount = earningsFirstPeriodAmountArray.reduce((a, b) => {
                        return a+b;
                      },0); 
                      return earningsFirstPeriodTotalAmount;
                });
              }
           }
       }
        if (this.props.projectionSummary !== undefined) {
            if (this.props.projectionSummary.projection_periods[1] !== undefined) {
                if (this.props.projectionSummary.projection_periods[1].earnings.length > 0) {
                    amountFormat = this.props.projectionSummary.projection_periods[1].earnings[0].amount.value;
                    amountArr = _.split(NumberUtils.appendCurrency('{}', earningsFirstPeriodTotalAmount), '.');
                    if (tomorrowsFlagForEarnings=== true && warningDaysFlag === true) {
                       dateOrd = "but it looks like you may still run low"; 
                       amountArr = _.split(NumberUtils.appendCurrency('{}', earningsFirstPeriodTotalAmount), '.');
                    }else if(tomorrowsFlagForEarnings === true && warningDaysFlag === false) {
                       dateOrd = " ";
                       amountArr = _.split(NumberUtils.appendCurrency('{}', earningsFirstPeriodTotalAmount), '.');
                    }else if(tomorrowsFlagForEarnings === false && warningDaysFlag === false) {
                        amountArr = _.split(NumberUtils.appendCurrency('{}', amountFormat), '.');
                       dateOrd = "This is projected in " + ProjectionDateUtils.getDaysCount(this.props.projectionSummary.projection_periods[1].earnings[0].when);
                    }else if(tomorrowsFlagForEarnings === false && warningDaysFlag === true) {
                       dateOrd = "This is projected in " + ProjectionDateUtils.getDaysCount(this.props.projectionSummary.projection_periods[1].earnings[0].when);
                       amountArr = _.split(NumberUtils.appendCurrency('{}', amountFormat), '.');
                    }
                    return (

                        <div className={((this.state.wheelDegree - 72) % 360 === 0 ? 'active content-block' : '') || ((this.state.wheelDegree + 288) % 360 === 0 ? 'active content-block' : '')}>
                            <h3 className="wheel-stmnt">{earningHeader1}</h3>
                            <h3 className="current-date">{amountArr[0]}.<sub>{amountArr[1]}</sub></h3>
                            <h3 className="wheel-stmnt2">{dateOrd}</h3>
                            <h3 className="wheel-stmnt2">{earningFooter1}</h3>
                        </div>
                    );
                }
                else {
                    earningData = <h3 className="wheel-stmnt">{this.props.content.projectionsExpandedItemViewNoNextEarningHeading}</h3>;
                    earningsHeader = '';
                    earningsFooter = '';
                    earningDate = '';
                    return (
                        <div className={((this.state.wheelDegree - 72) % 360 === 0 ? 'active content-block' : '') || ((this.state.wheelDegree + 288) % 360 === 0 ? 'active content-block' : '')}>
                            <h3 className="wheel-stmnt">{earningsHeader}</h3>
                            {earningData}
                            {earningDate}
                            <h3 className="wheel-stmnt2">{this.props.content.projectionsExpandedItemViewYouCanReviewThisFootNote}</h3>
                        </div>
                    );
                }
            }
            else {
                earningData = <h3 className="wheel-stmnt">{this.props.content.projectionsExpandedItemViewNoNextEarningHeading}</h3>;
                earningsHeader = '';
                earningsFooter = '';
                earningDate = '';
                return (
                    <div className={((this.state.wheelDegree - 72) % 360 === 0 ? 'active content-block' : '') || ((this.state.wheelDegree + 288) % 360 === 0 ? 'active content-block' : '')}>
                        <h3 className="wheel-stmnt">{earningsHeader}</h3>
                        {earningData}
                        {earningDate}
                        <h3 className="wheel-stmnt2">{this.props.content.projectionsExpandedItemViewYouCanReviewThisFootNote}</h3>
                    </div>
                );
            }
        }
    },
    doneClick() {
        FinancialStoriesActionCreator.handleUpdateFSTileClick();
        AccountOpeningActions.navigateToWebTask('WEB-OPEN-FINANCIAL_STORIES');
    },
    backToTop() {
        this.refs.donBtn.focus();
    },
    render() {
        const circularDeg = {
            WebkitTransform: `rotate(${this.state.wheelDegree}deg)`,
            msTransform: `rotate(${this.state.wheelDegree}deg)`,
            MozTransform: `rotate(${this.state.wheelDegree}deg)`,
            OTransform: `rotate(${this.state.wheelDegree}deg)`,
        };
        return (
            <div className="scroll-wrapper">
                <Helmet title="Projections" />
                {_isMounted && this.props.onLoad ?
                    <div className="row content-wrapper">
                        <div className="settings-main-wrapper">
                            {this.props.projectionSummary.projection_periods && <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <p><a href="#" ref="donBtn" onClick={this.doneClick}>{this.props.content.projectionDoneButtonText}</a></p>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 wheel-holder">
                                    <div className="draggable_wp">
                                        <span className="inner-circle"></span>
                                        <Swipeable onSwipeLeft={this.projectionWheelLeftMove} onSwipeRight={this.projectionWheelRightMove} >
                                            <div className="cn-wrapper opened-nav" id="cn-wrapper" style={circularDeg} >
                                                <ul>
                                                    <li onClick={this.circleClick} ><i className="separator"></i><span data-item="0" className={(this.state.wheelDegree === 0 ? 'active' : '') || (this.state.wheelDegree % 360 === 0 ? 'active' : '') || (this.state.wheelDegree === -360 ? 'active' : '')}><CameraIcon data={this.props.projectionSummary} /></span></li>
                                                    <li onClick={this.circleClick} ><i className="separator"></i><span data-item="216" className={((this.state.wheelDegree - 216) % 360 === 0 ? 'active' : '') || ((this.state.wheelDegree + 144) % 360 === 0 ? 'active' : '')}><WalletIcon data={this.props.projectionSummary} /></span></li>
                                                    <li onClick={this.circleClick} ><i className="separator"></i><span data-item="360" className={((this.state.wheelDegree - 288) % 360 === 0 ? 'active' : '') || ((this.state.wheelDegree + 72) % 360 === 0 ? 'active' : '')}><Wheel data={this.props.projectionSummary} /></span></li>

                                                    <li onClick={this.circleClick} ><i className="separator"></i><span data-item="144" className={((this.state.wheelDegree - 144) % 360 === 0 ? 'active' : '') || ((this.state.wheelDegree + 216) % 360 === 0 ? 'active' : '')}><TrolleyIcon data={this.props.projectionSummary} /></span></li>
                                                    <li onClick={this.circleClick} ><i className="separator"></i><span data-item="72" className={((this.state.wheelDegree - 72) % 360 === 0 ? 'active' : '') || ((this.state.wheelDegree + 288) % 360 === 0 ? 'active' : '')}><PoundIcon data={this.props.projectionSummary} /></span></li>
                                                </ul>
                                            </div>
                                        </Swipeable>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <a className="settings" onClick={this.props.goToProjectionSettingsPage}>
                                        <span className="icon icon-settings"></span></a>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="prj-content-wrapper">
                                        <span className="slick-prev" onClick={this.projectionWheelLeftClick}> </span>
                                        <span className="slick-next" onClick={this.projectionWheelRightClick}> </span>
                                        <Swipeable ref="2" onSwipeLeft={this.projectionWheelLeftMove} onSwipeRight={this.projectionWheelRightMove}>
                                            <div className="sliding-content myitems">
                                                {this.props.projectionSummary.projection_periods && this._getProjectionSummaryContent()}
                                                {this.props.projectionSummary.projection_periods && this._getCurrentBalanceContent()}
                                                {this.props.projectionSummary.projection_periods && this._getCommitmentContent()}
                                                {this.props.projectionSummary.projection_periods && this._getEssentialSpendContent()}
                                                {this.props.projectionSummary.projection_periods && this._getNextEarningContent()}
                                            </div>
                                        </Swipeable>
                                    </div>
                                </div>
                                <div className="col-xs-12">
                                    <div className="col-xs-12">
                                        <ProjectionDetailsPage projectionSummary={this.props.projectionSummary} content={this.props.content} />
                                    </div>
                                </div>
                                <p className="back_to_head"><a href="#" onClick={this.backToTop}><img src="../images/b/backtoTop.png" alt="" title="" /></a></p>
                            </div>
                            }
                        </div>
                    </div>
                    :
                    <ProjectionSettings
                        cancelButtonFlag={this.props.cancelButtonFlag}
                        alertsAmountValue={this.props.alertsAmountValue}
                        notificationFlag={this.props.notificationFlag}
                        earningsAndCommitmentsData={this.props.earningsAndCommitmentsData}
                        changeTheValue={this.props.changeTheValue}
                        _opt_out_of_projections={this.props._opt_out_of_projections}
                        onclickCancelForOptOut={this.props.onclickCancelForOptOut}
                        _cancel_button={this.props._cancel_button}
                        onclickLeaveSetup={this.props.onclickLeaveSetup}
                        optOutFlag={this.props.optOutFlag}
                        cancelFlag={this.props.cancelFlag}
                        doneProjectionSettings={this.props.doneProjectionSettings}
                        changeTheNotificationFlag={this.props.changeTheNotificationFlag}
                        getEarningsId={this.props.getEarningsId}
                        modifiedUserTag={this.props.modifiedUserTag}
                        modifiedTags={this.props.modifiedTags}
                        onLoad={this.props.onLoad}
                        backToAccount={this.props.backToAccount}
                        content={this.props.content}
                        dLeaveSetup={this.props.dLeaveSetup}
                        doneClicked={this.props.doneClicked}
                        optoutDemo={this.props.optoutDemo}
                        />
                }
            </div>
        );
    },
});

module.exports = ProjectionScreen;

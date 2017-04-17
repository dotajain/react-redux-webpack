/**
 * @module Projection details (Grid) component
 */
const React = require('react');
let warningCss = '';
let commit1 = '';
let spend1 = '';
let commitmentString = '';
const NumberUtils = require('../../../utils/NumberUtils');
const ProjectionDetails = React.createClass({
    propTypes: {
        projectionSummary: React.PropTypes.object,
    },

    isProjectionPeriodAvailable() {
        return this.props.projectionSummary !== undefined && this.props.projectionSummary.projection_periods !== undefined;
    },

    dateConversion(value) {
        if (value !== '') {
            const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const fullDate = new Date(value);
            const day = fullDate.getDate();
            const month = fullDate.getMonth();
            const year = fullDate.getFullYear();
            const dateStr = ('0' + day).slice(-2) + ' ' + monthName[month].substr(0, 3) + ' ' + year.toString().substr(2, 4);
            return (<span>{dateStr}</span>);
        }
    },
    _warningsFlag() {
        if (this.isProjectionPeriodAvailable()) {
            return this.props.projectionSummary.projection_periods[0].warning_days.length > 0;
        }
    },
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
    _essentialSpendingsFlag() {
        if (this.props.projectionSummary !== undefined) {
            if (this.props.projectionSummary.projection_periods[0].essential_spend_info.total_amount.value === 0) {
                return false;
            }
            else {
                return true;
            }
        }
    },
    _showCurrentBalance() {
        if (this.isProjectionPeriodAvailable()) {
            return <div className="projection-amount"><strong>{NumberUtils.appendCurrency('{}', this.props.projectionSummary.projection_periods[0].period.from.available_balance.value)}</strong></div>;
        }
    },
    _showCurrentBalanceDate() {
        let currentBalanceDate;
        if (this.isProjectionPeriodAvailable()) {
            if (this.props.projectionSummary.projection_periods !== undefined) {
                currentBalanceDate = this.dateConversion(this.props.projectionSummary.projection_periods[0].period.from.date);
            }
        }
        return currentBalanceDate;
    },
    _showCommitmentsAmount() {
        let cAmount;
        if (this.isProjectionPeriodAvailable()) {
            cAmount = <strong> {NumberUtils.appendCurrency('{}', this.props.projectionSummary.projection_periods[0].projected_transactions.total_amount.value)}</strong>;
            return <div className="commitment-amount"><strong>{cAmount}</strong></div>;
        }
    },
    _showEssentialSpendingsTagData() {
        if (this.isProjectionPeriodAvailable()) {
            if (this.props.projectionSummary.projection_periods[0].essential_spend_info.essential_spend.length > 0) {
                spend1 = 'spend0';
                let tag = this.props.projectionSummary.projection_periods[0].essential_spend_info.essential_spend.map((eSpendings, index) => {
                    return <div className="tag-item" id={index}>{eSpendings.display_name}&nbsp;<span className="amount"><strong>{NumberUtils.appendCurrency('{}', eSpendings.amount.value)} </strong></span></div>;
                });
                return (<div className="projection-tags">
                    <table className="tag-list" >
                        <tbody>
                            <tr>
                                <td width="60%">{tag}</td>
                                <td width="25%" className="text-right valign-bottom">Total</td>
                                <td width="25%" className="text-right valign-bottom"><strong>{NumberUtils.appendCurrency('{}', this.props.projectionSummary.projection_periods[0].essential_spend_info.total_amount.value)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>);
            }
        }
    },
    _showTagsTotalAmount() {
        if (this.isProjectionPeriodAvailable()) {
            let tagTotalmount = <strong>{NumberUtils.appendCurrency('{}', this.props.projectionSummary.projection_periods[0].essential_spend_info.total_amount.value)}</strong>;
            return <div className="spending-amount">{tagTotalmount}</div>;
        }
    },
    _showNextEarningsAmount() {
        if (this.isProjectionPeriodAvailable()) {
            return (<span>{NumberUtils.appendCurrency('{}', this.props.projectionSummary.projection_periods[0].period.to.available_balance.value)}</span>);
        }
    },
    _showThresholdAmount() {
        if (this.isProjectionPeriodAvailable()) {
            const amount = this.props.projectionSummary.thresholds.lower.amount.value;
            return (<div className="threshold-amount"><strong>{NumberUtils.appendCurrency('{}', amount)}</strong></div>);
        }
    },
    _showCommitmentTransactions() {
        let ctrans;
        if (this.isProjectionPeriodAvailable()) {
            if (this.props.projectionSummary.projection_periods[0].projected_transactions.transactions.length > 0) {
                ctrans = this.props.projectionSummary.projection_periods[0].projected_transactions.transactions.map((tData, index) =>
                    <tbody>
                        <tr id={index}>
                            <td width="10%">{this.dateConversion(tData.when)}</td>
                            <td width="50%"><strong>{tData.display_name}</strong></td>
                            <td width="25%">{tData.type}</td>

                            <td width="15%" className="text-right"><strong>{NumberUtils.appendCurrency('{}', tData.amount.value)}</strong></td>
                        </tr>
                    </tbody>
                );
                return (<div className="commitment-transactions" onclick="return false;">
                    <table>{ctrans}</table>
                    <table className="transaction-total">
                        <tbody>
                            <tr>
                                <td width="10%">&nbsp; </td>
                                <td width="50%">&nbsp; </td>
                                <td width="25%" className="text-right valign-bottom">Total</td>
                                <td width="15%" className="text-right valign-bottom"><strong>{NumberUtils.appendCurrency('{}', this.props.projectionSummary.projection_periods[0].projected_transactions.total_amount.value)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>);
            } else {
                return (<div className=''></div>);
            }
        }
    },

    showNewEarnings() {
        const totalComponent = [];
        let newComponent;
        let essentialFlag;
        let newEarningsDiv;
        let essentialCss = "spending last";
        let commitmentLastCss = "commitment last";

        if (this.isProjectionPeriodAvailable()) {
            if (this.props.projectionSummary.projection_periods.length >= 1) {
                let i;
                let spend1 = 'spend';
                let commit1 = 'commit';
                let commitDropDown = '';
                let commitClick;
                let commitDivs;
                let commitClass;
                let lastNextEarningDiv = '';
                for (i = 1; i < this.props.projectionSummary.projection_periods.length; i++) {
                    let commitmentCount = this.props.projectionSummary.projection_periods[i].projected_transactions.transactions.length;
                    let commitMessage = 'You have ' + commitmentCount + ' projected commitments before your next earning';

                    if (this.props.projectionSummary.projection_periods[i].essential_spend_info.total_amount.value === 0) {
                        essentialFlag = false;
                    } else {
                        essentialFlag = true;
                    }
                    if (commitmentCount >= 1) {
                        commit1 = 'commit';
                        commitClass = 'commitment';

                    } else {
                        commitClass = 'commitment no-commit';

                    }
                    if (this.props.projectionSummary.projection_periods[i].projected_transactions.total_amount.value !== 0) {
                        commitDropDown = <input type="checkbox" id={`${commit1}${i}`} />;
                        commitClick = 'return false;';
                    }
                    if (i === this.props.projectionSummary.projection_periods.length - 1) {
                        commitMessage = 'You have ' + commitmentCount + ' projected commitments';
                        essentialCss = "spending";
                        lastNextEarningDiv = (<div className="result">
                            <div className="result-title">Your projected balance in the next 31 days</div>
                            <div className="result-total">&nbsp;&nbsp;</div>
                            <div className="result-amount"><strong>{NumberUtils.appendCurrency('{}', this.props.projectionSummary.projection_periods[i].period.to.available_balance.value)}</strong></div>
                        </div>);
                    }
                    newEarningsDiv = this.props.projectionSummary.projection_periods[i].earnings.map((earningsData) => {
                        return (
                            <div className="projection">
                                <div className="projection-date">
                                    {this.dateConversion(earningsData.when)}
                                </div>
                                <div className="projection-account"><strong>
                                    {earningsData.display_name}
                                </strong></div>
                                <div className="projection-tag">Earning</div>
                                <div className="projection-total">&nbsp;&nbsp;</div>
                                <div className="projection-amount "><strong>
                                    {NumberUtils.appendCurrency('{}', earningsData.amount.value)}
                                </strong></div>
                            </div>);
                    });
                    newComponent = (
                        <div className="projection__row green topMargin">
                            {newEarningsDiv}
                            <div className={commitClass}>
                                {commitDropDown}
                                <label htmlFor={`${commit1}${i}`}>
                                    <div className="commitment-title">{commitMessage}</div>
                                    <div className="commitment-total">Total</div>
                                    <div className="commitment-amount"><strong>{
                                        NumberUtils.appendCurrency('{}', this.props.projectionSummary.projection_periods[i].projected_transactions.total_amount.value)
                                    }</strong></div>
                                </label>
                                <div className="commitment-transactions" onclick={commitClick}>
                                    {this.props.projectionSummary.projection_periods[i].projected_transactions.transactions.map((trans, index) =>
                                        <table>
                                            <tbody>
                                                <tr id={index}>
                                                    <td width="10%">{this.dateConversion(trans.when)}</td>
                                                    <td width="50%"><strong>{trans.display_name}</strong></td>
                                                    <td width="25%">{trans.type}</td>

                                                    <td width="15%" className="text-right"><strong>{
                                                        NumberUtils.appendCurrency('{}', trans.amount.value)
                                                    }</strong></td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    )}
                                    <table className="transaction-total">
                                        <tbody>
                                            <tr>
                                                <td width="10%">&nbsp; </td>
                                                <td width="50%">&nbsp; </td>
                                                <td width="25%" className="text-right valign-bottom">Total</td>
                                                <td width="15%" className="text-right valign-bottom"><strong>{
                                                    NumberUtils.appendCurrency('{}', this.props.projectionSummary.projection_periods[i].projected_transactions.total_amount.value)
                                                }</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {essentialFlag ? <div className={essentialCss}>
                                <input type="checkbox" id={`${spend1}${i}`} />
                                <label htmlFor={`${spend1}${i}`}>
                                    <div className="spending-title">Essential spend based on previous spending patterns</div>
                                    <div className="spending-total">Total</div>
                                    <div className="spending-amount"><strong>{
                                        NumberUtils.appendCurrency('{}', this.props.projectionSummary.projection_periods[i].essential_spend_info.total_amount.value)
                                    }</strong></div>
                                </label>
                                <div className="spending-items">
                                    <div className="projection-tags">
                                        <table className="tag-list">
                                            <tbody>
                                                <tr>
                                                    <td width="60%">{this.props.projectionSummary.projection_periods[i].essential_spend_info.essential_spend.map((eSpendings, index) =>
                                                        <div className="tag-item" id={index}>{eSpendings.display_name}<span className="amount"><strong>{NumberUtils.appendCurrency('{}', eSpendings.amount.value)} </strong></span></div>
                                                    )}</td>
                                                    <td width="25%" className="text-right valign-bottom">Total</td>
                                                    <td width="25%" className="text-right valign-bottom"><strong>{
                                                        NumberUtils.appendCurrency('{}', this.props.projectionSummary.projection_periods[i].essential_spend_info.total_amount.value)
                                                    }</strong></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div> : null}

                            {lastNextEarningDiv}
                        </div>);
                    totalComponent.push(newComponent);
                }
            }
        }
        return totalComponent;
    },
    render() {
        let earningsString = '';
        let commitmentDiv;
        let earningDiv;
        
        if (this.isProjectionPeriodAvailable()) {
            if (this.props.projectionSummary.projection_periods[0].warning_days.length === 0) {
                warningCss = 'projection__row green topMargin';
            } else {
                warningCss = 'projection__row rejig';
            }
            commitmentString = 'You have' + ' ' + this.props.projectionSummary.projection_periods[0].projected_transactions.transactions.length + ' ' + 'projected commitments';
            if (this.nextEarningProjectionPeriod()) {
                commitmentString = 'You have' + ' ' + this.props.projectionSummary.projection_periods[0].projected_transactions.transactions.length + ' ' + 'projected commitments before your next earning';
            }
            if (this.props.projectionSummary.projection_periods[0].projected_transactions.transactions.length > 0) {
                commit1 = 'commit0';

                commitmentDiv = <div className="commitment">
                    <input type="checkbox" id={commit1} />
                    <label htmlFor={commit1}>
                        <div className="commitment-title">{commitmentString}</div>
                        <div className="commitment-total">Total</div>
                        {this._showCommitmentsAmount()}
                    </label>

                    {this._showCommitmentTransactions()}

                </div>
            } else {
                commit1 = 'no-commit';

                commitmentDiv = <div className="commitment no-commit">

                    <label htmlFor={commit1}>
                        <div className="commitment-title">{commitmentString}</div>
                        <div className="commitment-total">Total</div>
                        {this._showCommitmentsAmount()}
                    </label>
                </div>
            }
        }
        if (this.props.projectionSummary !== undefined) {
            earningsString = 'Your projected balance in the next 31 days';
            if (this.nextEarningProjectionPeriod()) {
                earningsString = 'Your projected balance just before your next earning';
            }
        }
        if (this.props.projectionSummary !== undefined) {
            if (this.props.projectionSummary.projection_periods.length > 0) {
                if (this.props.projectionSummary.projection_periods[0].earnings.length > 0) {
                    earningDiv = this.props.projectionSummary.projection_periods[0].earnings.map((earningsData) => {
                        return (
                            <div className="projection">
                                <div className="projection-date earnings">
                                    {this.dateConversion(earningsData.when)}
                                </div>
                                <div className="projection-account"><strong>
                                    {earningsData.display_name}
                                </strong></div>
                                <div className="projection-tag">Earning</div>
                                <div className="projection-total">&nbsp;&nbsp;</div>
                                <div className="projection-amount "><strong>
                                    {NumberUtils.appendCurrency('{}', earningsData.amount.value)}
                                </strong></div>
                            </div>);
                    });
                }
            }
        }
        return (
            <div className="projection-detail">
                <div className="projection-detail__list">
                    <div className="projection-detail__list__item">
                        <div className={warningCss}>
                            <div className="projection">
                                <div className="projection-date">{this._showCurrentBalanceDate()}</div>
                                <div className="projection-account projection-currentBalance"><strong>Current Balance</strong></div>
                                <div className="projection-total">&nbsp;&nbsp;</div>
                                {this._showCurrentBalance()}
                            </div>

                            {earningDiv}
                            {commitmentDiv}
                            {this._essentialSpendingsFlag() ?
                                <div className="spending">
                                    <input type="checkbox" id={spend1} />
                                    <label htmlFor={spend1}>
                                        <div className="spending-title">Essential spend based on previous spending patterns</div>
                                        <div className="spending-total">Total</div>
                                        {this._showTagsTotalAmount()}
                                    </label>
                                    <div className="spending-items">
                                        {this._showEssentialSpendingsTagData()}
                                    </div>
                                </div>
                                : ''
                            }

                            {this._warningsFlag() ?
                                <div className="full-width">
                                    <div className="threshold">
                                        <div className="threshold-title">Your threshold </div>
                                        {this._showThresholdAmount()}
                                    </div>
                                    <div className="result">
                                        <div className="result-title">{earningsString}</div>
                                        <div className="result-total">&nbsp;&nbsp;</div>
                                        <div className="result-amount"><strong>{this._showNextEarningsAmount()}</strong></div>
                                    </div>
                                </div>
                                :
                                <div className="full-width">
                                    <div className="result">
                                        <div className="result-title">{earningsString}</div>
                                        <div className="result-total">&nbsp;&nbsp;</div>
                                        <div className="result-amount"><strong>{this._showNextEarningsAmount()}</strong></div>
                                    </div>
                                    <div className="threshold1">
                                        <div className="threshold-title">Your threshold </div>
                                        {this._showThresholdAmount()}
                                    </div>
                                </div>
                            }
                        </div>
                        {this.showNewEarnings()}
                    </div>

                </div>
            </div>
        );
    },
});
module.exports = ProjectionDetails;

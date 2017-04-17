/**
 * @module Earnings and commitments component
 */
const React = require('react');
const Helmet = require('react-helmet');
const ProjectionStore = require('../../../stores/ProjectionStore');
const PropTypes = React;
const NumberUtils = require('../../../utils/NumberUtils');
const DateUtils = require('../../../utils/DateUtils');
const _ = require('lodash');
const ProjectionActionCreator = require('../../../actions/ProjectionActionCreator');
//let panelContent = 'panel-content account-1';
const _rowData = [];
//let selectedEarnings = [];
let earningsId = [];
const getStateFromStores = () => {
    return {
        contents: ProjectionStore.getEarningsAndCommitments(),
    };
};
const EarningAndCommitmentComponent = React.createClass({
    getInitialState() {
        return getStateFromStores();
    },
    getEarningsId(id, flag) {
        this.props.getEarningsId(id,flag);
    },
    dateConversion(value) {
        if (value !== '') {
            const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const fullDate = new Date(value);
            const day = fullDate.getDate();
            const month = fullDate.getMonth();
            const year = fullDate.getFullYear();
            const dateStr = ('0'+day).slice(-2) + ' ' + monthName[month].substr(0, 3) + ' ' + year.toString().substr(2, 4);
            return (<label>{dateStr}</label>);
        }
    },
    earnings() {
        if (this.props.data.earnings !== undefined) {
            let earningsIds = ProjectionStore.getEarningId();
            let rowData = this.props.data.earnings.map((rows, keys) => {
                let date = rows.last_known_date;
                let newDate;
                if(date == null){
                  newDate = '';
                }
                else{
                    newDate = this.dateConversion(rows.last_known_date);
                }
                let value = _.indexOf(earningsIds, rows.id);
                const isEarnigsEnabled = value >= 0;
                return (<tr id={keys} key={rows.id}>
                    <td>
                        <div className="option-select">
                            <input type="checkbox" id={rows.id}
                                name={rows.display_name}
                                onChange={this.getEarningsId.bind(this, rows.id, rows.enabled)}
                                defaultValue={rows.id}
                                value={isEarnigsEnabled}
                                checked={isEarnigsEnabled}
                                />
                            <label htmlFor={rows.id}></label>
                        </div>
                        {rows.display_name}
                    </td>
                    <td>{newDate}</td>
                    <td>{rows.frequency}</td>
                    <td>{NumberUtils.appendCurrency('{}', rows.amount.value)}</td>
                </tr>);
            });
            return rowData;
        }
        else{
           <tr>Loading .............................</tr>;
        }
    },
    standingOrders() {
        if (this.props.data.commitments !== undefined) {
            let standingOrders = this.props.data.commitments.standing_orders.map((rowData, i) => {
                let date = rowData.last_known_date;
                let newDate;
                if(date == null){
                  newDate = '';
                }
                else{
                    newDate = this.dateConversion(rowData.last_known_date);
                }
                return <tr key={rowData.id} id={i}><td>{rowData.display_name}</td>
                    <td> {newDate} </td>
                    <td>{rowData.frequency} </td>
                    <td>{NumberUtils.appendCurrency('{}', rowData.amount.value)}</td>
                </tr>
            });
            return standingOrders;
        }
        else{
          <tr>Loading .............................</tr>;
        }
    },
    directdebits() {
        if (this.props.data.commitments !== undefined) {

            let directdebits = this.props.data.commitments.direct_debits.map((rowData, i) => {
                let date = rowData.last_payment_date;
                let newDate;
                if(date == null){
                  newDate = '';
                }
                else{
                    newDate = this.dateConversion(rowData.last_payment_date);
                }
                return <tr key={rowData.id} id={i}>
                    <td> {rowData.display_name}</td>
                    <td> {newDate} </td>
                    <td> {rowData.frequency} </td>
                    <td>  {NumberUtils.appendCurrency('{}', rowData.amount.value)}</td></tr>;
            });

            return directdebits;
        }
    },
    render() {
        return (
            <div >
                <Helmet title="Projections" />
                <div>
                    <div>
                        <div className="settings-content-wrapper">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div id="earnings-tab-container" className="account-1">
                                            <p className="tab-header">{this.props.content.projectionSettingsEarningsAndCommitmentsHeader}</p>
                                            <table className="earnings-table1">
                                            <tbody key="1">
                                                <tr>
                                                    <th width="35%">{this.props.content.projectionSettingsEarningsAndCommitmentsEarnings}</th>
                                                    <th width="15%">{this.props.content.projectionSettingsEarningsAndCommitmentsLastKnown}</th>
                                                    <th width="25%">{this.props.content.projectionSettingsEarningsAndCommitmentsFrequency}</th>
                                                    <th width="25%">{this.props.content.projectionSettingsEarningsAndCommitmentsLastKnownAmount}</th>
                                                </tr>
                                                {this.earnings()}    
                                                </tbody>                  
                                                 </table>
                                            <table className="earnings-table2">
                                            <tbody key="2">
                                                <tr>
                                                    <th width="35%">{this.props.content.projectionSettingsEarningsAndCommitmentsStandingOrders}</th>
                                                    <th width="15%">{this.props.content.projectionSettingsEarningsAndCommitmentsLastKnown}</th>
                                                    <th width="25%">{this.props.content.projectionSettingsEarningsAndCommitmentsFrequency}</th>
                                                    <th width="25%">{this.props.content.projectionSettingsEarningsAndCommitmentsLastKnownAmount}</th>
                                                </tr>
                                                {this.standingOrders()}
                                                </tbody>
                                            </table>
                                            <table className="earnings-table3">
                                            <tbody key="3">
                                                <tr>
                                                    <th width="35%">{this.props.content.projectionSettingsEarningsAndCommitmentsDirectDebits}</th>
                                                    <th width="15%">{this.props.content.projectionSettingsEarningsAndCommitmentsLastKnown}</th>
                                                    <th width="25%">{this.props.content.projectionSettingsEarningsAndCommitmentsFrequency}</th>
                                                    <th width="25%">{this.props.content.projectionSettingsEarningsAndCommitmentsLastKnownAmount}</th>
                                                </tr>
                                                {this.directdebits()}
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
});

module.exports = EarningAndCommitmentComponent;

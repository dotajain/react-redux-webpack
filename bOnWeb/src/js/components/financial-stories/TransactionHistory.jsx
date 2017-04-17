/**
 * @module TransactionHistory
 */
const React = require('react');
import { Col, Tab, Nav, NavItem } from 'react-bootstrap/lib';
const TransactionHistoryGrid = require('./transactonHistory/TransactionHistoryGrid');
const FinancialStoriesStore = require('../../stores/FinancialStoriesStore');
const CustomeDatePicker = require('./CustomeDatePicker');
const { PropTypes } = React;

const TransactionHistory = React.createClass({

    propTypes: {
        id: PropTypes.number.isRequired,
        selectedTabKey: PropTypes.string,
        enterTab : PropTypes.func,
        onTabSelect : PropTypes.func,
        onTransactionDateChange : PropTypes.func,
        onShowProgressIconClick : PropTypes.func,
        transactionHistoryData : PropTypes.array,
        content : PropTypes.object,
        openSideBar : PropTypes.func,
        resetTranTagSelection:PropTypes.bool,
        openGridCheckBoxColumn:PropTypes.bool,
        mobileView:PropTypes.bool,
        nextAccountDetails:PropTypes.bool,
    },

    getInitialState() {
        return {
            fromDate : FinancialStoriesStore.getFromDate(),
            toDate : FinancialStoriesStore.getToDate(),
        };
    },

    onTransactionDateChange(startDate, endDate) {
        this.props.onTransactionDateChange(startDate, endDate);
    },
    render() {
        return (
            <div className="row no-gutters">
                <div className="col-lg-6 col-md-6 col-sm-0 col-xs-0 filters">
                     <CustomeDatePicker nextAccountDetails={this.props.nextAccountDetails} content ={this.props.content} onMenuSelect={this.onTransactionDateChange} fromDate={FinancialStoriesStore.getFromDate()} toDate={FinancialStoriesStore.getToDate()}/>
                 </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 text-center grid-nav">
                    <Nav justified activeKey={this.props.selectedTabKey} onSelect={this.props.onTabSelect}>
                        <NavItem eventKey="all">All</NavItem>
                        <NavItem eventKey="moneyin">Money In</NavItem>
                        <NavItem eventKey="moneyout">Money Out</NavItem>
                        <NavItem eventKey="repeating">Repeating</NavItem>
                    </Nav>
                </div>

                <Tab.Container onSelect={this.props.onTabSelect} id={this.props.id} activeKey={this.props.selectedTabKey} >
                    <Col>
                        <Tab.Content>
                            <Tab.Pane eventKey="all" onEnter={this.props.enterTab} unmountOnExit>
                                {this.props.selectedTabKey === 'all' && <TransactionHistoryGrid openSideBar={this.props.openSideBar} resetTranTagSelection={this.props.resetTranTagSelection} data={this.props.transactionHistoryData} content={this.props.content} onShowProgressIconClick={this.props.onShowProgressIconClick} openGridCheckBoxColumn={this.props.openGridCheckBoxColumn} mobileView={this.props.mobileView} />}
                            </Tab.Pane>
                            <Tab.Pane eventKey="moneyin" onEnter={this.props.enterTab} unmountOnExit>
                                {this.props.selectedTabKey === 'moneyin' && <TransactionHistoryGrid openSideBar={this.props.openSideBar} resetTranTagSelection={this.props.resetTranTagSelection} data={this.props.transactionHistoryData} content={this.props.content} onShowProgressIconClick={this.props.onShowProgressIconClick} openGridCheckBoxColumn={this.props.openGridCheckBoxColumn} mobileView={this.props.mobileView} /> }
                            </Tab.Pane>
                            <Tab.Pane eventKey="moneyout" onEnter={this.props.enterTab} unmountOnExit>
                                {this.props.selectedTabKey === 'moneyout' && <TransactionHistoryGrid openSideBar={this.props.openSideBar} resetTranTagSelection={this.props.resetTranTagSelection} data={this.props.transactionHistoryData} content={this.props.content} onShowProgressIconClick={this.props.onShowProgressIconClick} openGridCheckBoxColumn={this.props.openGridCheckBoxColumn} mobileView={this.props.mobileView} /> }
                            </Tab.Pane>
                            <Tab.Pane eventKey="repeating" onEnter={this.props.enterTab} unmountOnExit>
                                {this.props.selectedTabKey === 'repeating' && <TransactionHistoryGrid openSideBar={this.props.openSideBar} resetTranTagSelection={this.props.resetTranTagSelection} data={this.props.transactionHistoryData} content={this.props.content} onShowProgressIconClick={this.props.onShowProgressIconClick} openGridCheckBoxColumn={this.props.openGridCheckBoxColumn} mobileView={this.props.mobileView} />}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Tab.Container>
            </div>
        );
    },
});

module.exports = TransactionHistory;


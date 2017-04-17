/**
 * @module AccountTransactionComponent
 */

const React = require('react');
const FinancialStoriesActionCreator = require('../../actions/FinancialStoriesActionCreator');
const { PropTypes } = React;
const TransactionHistory = require('./TransactionHistory.jsx');
const RegexUtils = require('../../utils/RegexUtils');
let isSearching = false;

const AccountTransactionComponent = React.createClass({
	propTypes:{
		transactionsState: PropTypes.object,
		openSideBar: PropTypes.func,
		onShowProgressIconClick: PropTypes.func,
		content: PropTypes.object,
		nextAccountDetails:PropTypes.bool,
		isPopupOpen:PropTypes.bool,
		resetTranTagSelection:PropTypes.bool,
		openGridCheckBoxColumn:PropTypes.bool,
		cancelTransactionSearch: PropTypes.func,
		mobileView:PropTypes.bool,
	},

	componentDidMount() {
		// FinancialStoriesActionCreator.getTransactionHistoryList(this.props.transactionsState.selectedTabKey);
	},

	componentWillReceiveProps() {
		if (this.props.nextAccountDetails) {
			this.refs.searchInput.value = '';
			isSearching = false;
		}
	},

	onTabSelect(tabKey) {
		FinancialStoriesActionCreator.tabSelect(tabKey);
	},

	onTransactionDateChange(startDate, endDate) {
		const dateRange = { startDate:startDate, endDate:endDate };
		FinancialStoriesActionCreator.getTransactionDateRangeList(dateRange);
	},

	onInputSearchChange() {
		// const text = this.refs.searchInput.value;
		this.setState({ enableSearchIcon: true });
			// FinancialStoriesActionCreator.transactionSearchTextList(text);
	},

	getSearchData(data) {
		this.refs.searchInput.value = data.text;

		if (!this.props.nextAccountDetails) {
			FinancialStoriesActionCreator.getTransactionSearchList(data.text);
		}
	},

	moveCaretAtEnd(event) {
		event.preventDefault();
		const e = event;
		e.target.value = e.target.value;
		isSearching = true;
		this.forceUpdate();
	},

	clearclick() {
		this.refs.searchInput.value = '';
		FinancialStoriesActionCreator.resetTransactionSearchText();
	},

	searchSuggestedPopup() {
		if (!this.props.transactionsState.searchTextData.length) {
			return false;
		} else {
			let suggestion = this.props.transactionsState.searchTextData.map((data, index) =>
				<li key={index}><a onClick={this.getSearchData.bind(null, data) }>{data.text}</a></li>
			);
			return (<ul className="searchSuggest">
				{suggestion}
			</ul>);
		}
	},

	// To cancel the Transaction Search
	cancelTransactionSearch() {
		isSearching = false;
		this.refs.searchInput.value = '';
		const data = { text:'' };
		this.getSearchData(data);
	},

	// hnadles the onKeyPress
	handleKeyPress(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			const text = this.refs.searchInput.value;
			if (RegexUtils.isValid(text, RegexUtils.regexes.timelineSearchData)) {
				FinancialStoriesActionCreator.getTransactionSearchList(text);
			}
		}
	},

	render() {
		const className = isSearching > 0 ? 'focused' : '';
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<form action="." className="autofillSearch">
					<input id="timelineSearch"
						type="search"
						placeholder="Search"
						ref="searchInput"
						onKeyPress={this.handleKeyPress}
						onFocus={this.moveCaretAtEnd}
						onChange={this.onInputSearchChange}
						className={className}
						minLength={2}
					/>
				<div>
					{(this.refs.searchInput && this.refs.searchInput.value.length > 0) ? <a className="searchClear icon icon-clear" onClick={this.clearclick}></a> : ''}
				</div>
					<a className="search-cancel opt-green" onClick={this.cancelTransactionSearch}>Cancel</a>
				</form>

				{this.props.isPopupOpen ? this.searchSuggestedPopup() : ''}

				<TransactionHistory selectedTabKey={this.props.transactionsState.selectedTabKey} mobileView={this.props.mobileView}
					onTransactionDateChange = {this.onTransactionDateChange} nextAccountDetails={this.props.nextAccountDetails}
					resetTranTagSelection={this.props.resetTranTagSelection}
					id={123} onTabSelect={this.onTabSelect} openSideBar={this.props.openSideBar}
					transactionHistoryData={this.props.transactionsState.transactionHistoryData} content={this.props.content}
					onShowProgressIconClick={this.props.onShowProgressIconClick} openGridCheckBoxColumn={this.props.openGridCheckBoxColumn}
				/>

			</div>
		);
	},
});

module.exports = AccountTransactionComponent;


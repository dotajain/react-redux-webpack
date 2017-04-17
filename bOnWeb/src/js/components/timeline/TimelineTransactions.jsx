/* eslint-disable react/jsx-no-bind */
const React = require('react');
const { PropTypes } = React;
// const ReactDOM = require('react-dom');
const Waypoint = require('react-waypoint');
const NumberUtils = require('../../utils/NumberUtils');
const DateUtils = require('../../utils/DateUtils');
const RegexUtils = require('../../utils/RegexUtils');
const AccountsStore = require('../../stores/AccountsStore');
const TimelineActionCreator = require('../../actions/TimelineActionCreator');
let isSearching = false;

const TimelineTransactions = React.createClass({
	propTypes: {
		data: PropTypes.array,
		hits: PropTypes.string,
		doTransactionSearch: PropTypes.func,
		getSelectedTypeTransactions: PropTypes.func,
		searchText: PropTypes.string,
		isPopupOpen: PropTypes.bool,
		searchSuggestedData: PropTypes.array,
		cancelTransactionSearch: PropTypes.func,
		closeBtnClick: PropTypes.func,
		loadTransactions: PropTypes.func,
		endOfTransactions: PropTypes.func,
		content: PropTypes.object,
    },

    componentDidMount() {
		if (this.props.searchText.length > 0) {
			isSearching = true;
			//	ReactDOM.findDOMNode(this.refs.searchInput).focus();
			this.refs.searchInput.value = this.props.searchText;
		} else {
			isSearching = false;
		}
    },
	// to get the Serach Data
	getSearchData(data) {
		this.props.getSelectedTypeTransactions(data);
    },

	getSelectedTypeTransactions(data) {
		this.refs.searchInput.value = data.text;
		this.props.getSelectedTypeTransactions(data);
		this.outsideClick();
	},
	// gets the suggested searchpopup
    searchSuggestedPopup() {
		if (!this.props.searchSuggestedData.length) {
			return false;
		} else {
			let suggestion = this.props.searchSuggestedData.map((data, index) =>
				<li key={index}><a onClick={this.getSelectedTypeTransactions.bind(null, data) }>{data.text}</a></li>
			);
			return (<ul className="searchSuggest">
				{suggestion}
			</ul>);
		}
    },
    // to do the Transaction Search
	doTransactionSearch() {
		this.props.doTransactionSearch(this.refs.searchInput.value);
	},
	closeBtnClick() {
		this.refs.searchInput.value = '';
		this.props.closeBtnClick();
	},

    // To cancel the Transaction Search
	cancelTransactionSearch() {
		isSearching = false;
		this.refs.searchInput.value = '';
		this.props.cancelTransactionSearch();
	},
	// display the transaction date

	dayDisplay(transactionDate) {
		let dateStr = transactionDate ? DateUtils.getDateForTimeline(transactionDate) : '';
		return (<span className="timeline-label">{dateStr}</span>);
	},
// handles the onFocus
	moveCaretAtEnd(event) {
		event.preventDefault();
		const e = event;
		e.target.value = e.target.value;
		isSearching = true;
		this.forceUpdate();
	},
	// hnadles the onKeyPress
	handleKeyPress(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (RegexUtils.isValid(this.refs.searchInput.value, RegexUtils.regexes.timelineSearchData)) {
				const searchData = { text: this.refs.searchInput.value };
				this.props.getSelectedTypeTransactions(searchData);
			}
		}
	},

	timelineBody() {
		return this.props.data.map((transactions, index) => {
			let classNames = '';
			let categories = '';
			let balance = NumberUtils.appendCurrency('{}', transactions._source.details.amount.value);
			if (transactions._source.metadata.categories) {
				categories = (
					<p>
						{transactions._source.metadata.categories.map((tags, index) => {
							if (tags.value !== 'Untagged') {
								return (<span><span className="icon icon-tag" key={`${index}tags`}></span><span>{tags.value}</span></span>);
							}
							return false;
						}
						) }
					</p>
				);
			}
			const accntId = AccountsStore.getAccountType(transactions._source.this_account.uuid);
			if (accntId) {
				classNames = accntId.accntClass;
			}
			return (<div className="transactions" key={index}>
				{this.dayDisplay(transactions._source.details.when) }
				<div className={`timeline-item ${classNames}`}>
					<div className={transactions._source.details.when !== '' ? 'timeline-point timeline-point-default' : 'timeline-point timeline-point-blank'}>
					</div>
					<div className="timeline-event">
						<div className="transactionInfo">
							<h4>{transactions._source.details.narrative.small}</h4>
							{ categories }
						</div>
						<div className="transactionFigure">
							<h3>{balance}</h3>
							{transactions._source.details.type}
						</div>
					</div>
				</div>
			<div className= "timeline-item account-">
				<div>
				</div>
			</div>
		</div>
			);
		});
	},
	outsideClick() {
		TimelineActionCreator.resetSearchInfo({ isSearchTextReset: false, isPopupOpenReset: true, close: true });
	},
	render() {
		const className = isSearching > 0 ? 'focused' : '';
		return (
			<div>
				<form action="." className="autofillSearch">
					<input id="timelineSearch"
						type="search"
						placeholder="Search"
						ref="searchInput"
						onFocus={this.moveCaretAtEnd}
						onChange={this.doTransactionSearch}
						className={className}
						onKeyPress={this.handleKeyPress}
						pattern={RegexUtils.regexes.timelineSearchData}
						autoComplete="off"
					/>
					<a className="searchClear">
						{this.props.searchText.length > 0 ? <span className="icon icon-clear" onClick={this.closeBtnClick}></span> : ''}
					</a>
					<a className="search-cancel opt-green" onClick={this.cancelTransactionSearch}>Cancel</a>
				</form>
				{this.props.isPopupOpen ? <button className="timeline_backdrop" onClick={this.outsideClick}></button> : ''}
				{this.props.isPopupOpen ? this.searchSuggestedPopup() : ''}
				{this.props.data.length ? <div className="timeline timeline-single-column">{this.timelineBody() }</div> : <div className="text-center">{ this.props.content.noTransactionFound }</div>}
				<div>
				<Waypoint onEnter = {this.props.loadTransactions}/>
				</div>
			</div>
		);
	},
});


module.exports = TimelineTransactions;

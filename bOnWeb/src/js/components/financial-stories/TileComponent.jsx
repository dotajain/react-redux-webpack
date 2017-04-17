/**
 * @module TileComponent
 */

const React = require('react');
const { PropTypes } = React;
const FinancialStoriesStore = require('../../stores/FinancialStoriesStore');
const FinancialStoriesActionCreator = require('../../actions/FinancialStoriesActionCreator');
const moment = require('moment');
const config = require('../../config');
const Select = require('react-select-box');
let _monthsList = [];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const NumberUtils = require('../../utils/NumberUtils');
const BrowserUtils = require('../../utils/BrowserUtils');
const _ = require('lodash');
const ReactDOM = require('react-dom');
const ScrollToTop = require('react-scroll-up');

const TileComponent = React.createClass({
	propTypes: {
		content: PropTypes.object,
		data: PropTypes.object,
		tileType: PropTypes.string,
		dropDownData: PropTypes.object,
	},
	getInitialState() {
		return {
			transactionHistoryData: FinancialStoriesStore.getState().transactionHistoryData,
			selectedMonth: 0,
			tileData: this.props.data,
			selectedMon: moment().month(),
		};
	},
	componentWillMount() {
        BrowserUtils.setViewPort(0);
		FinancialStoriesStore.setLoadingStatus();
    },
	componentDidMount() {
		this.getTileServiceCall(0);
		
	},
	onMonthChange(e) {
		let actualMonth = parseInt(e);
		if (parseInt(e) > 0) {
			actualMonth = moment().month() - parseInt(e);
		}
		this.getTileServiceCall(actualMonth);
		this.setState({ selectedMonth: actualMonth });
		this.setState({ selectedMon: e });
	},
	getTileServiceCall(actualMonth) {
		const selectedDate = moment().subtract(actualMonth, 'months').startOf('month').format('YYYY-MM-DDTHH:mm:ss.sss') + 'Z';
		const upperDate = moment().subtract(actualMonth, 'months').endOf('month').format('YYYY-MM-DD') + 'T23:59:59.000Z';

		const object = {};
		object.tileType = this.props.tileType;
		object.date_lower_bound = selectedDate;
		object.date_upper_bound = upperDate;
		object.selectedMonth = actualMonth;
		switch (this.props.tileType) {
			case this.props.content.MicroTransaction:
				FinancialStoriesActionCreator.getMicroTransaction(object);
				break;
			case this.props.content.Cashpoint:
				FinancialStoriesActionCreator.getCashPointTransaction(object);
				break;
			case this.props.content.InAndOut:
				FinancialStoriesActionCreator.getInAndOutTransaction(object);
				break;
			default:
		}
		// }
	},
	// getTileData() {
	//     switch (this.props.tileType) {
	//         case this.props.content.MicroTransaction:
	//             this.setState({ tileData: FinancialStoriesStore.getMicroTileData() });
	//             break;
	//         case this.props.content.Cashpoint:
	//             this.setState({ tileData: FinancialStoriesStore.getCashPointData() });
	//             break;
	//         case this.props.content.InAndOut:
	//             this.setState({ tileData: FinancialStoriesStore.getInOutData() });
	//             break;
	//         default:
	//     }
	// },

	getMonthsList() {
		const currentMonth = moment().month();
		_monthsList = [];
		_monthsList.push(<option value={currentMonth}>this month</option>);

		if (this.props.dropDownData.hits !== undefined) {
			if (this.props.dropDownData.hits.hits.length === 0) {
				return _monthsList;
			}
			const oldTransactionDate = this.props.dropDownData.hits.hits[0]._source.details.when;
			const oldTransactionMonth = moment(oldTransactionDate).month();
			const currentYear = moment().year();
			const oldTransactionYear = moment(oldTransactionDate).year();
			let monthCount = moment([currentYear, currentMonth, 1]).diff(moment([oldTransactionYear, oldTransactionMonth, 1]), 'months');
			monthCount = monthCount + 1;
			if (monthCount > 6) {
				monthCount = 6;
			}
			for (let i = 1; i < monthCount; i++) {
				if (i === 1) {
					_monthsList.push(<option value={currentMonth - 1} >last month</option>);
				} else {
					const j = currentMonth - i;
					let k = j >= 0 ? j : j + 12;
					let val = 'in ' + monthNames[k];
					_monthsList.push(<option value={k}>{val}</option>);
				}
			}
		}
		return _monthsList;
	},

	getFooterInAndOutText() {
		const keyString = this.getDate(); // moment('2016-05-01T00:00:00.000+01:00').format('YYYY-MM-DD'); // month
		let creditSum = 0;
		let debitSum = 0;
		let modifiedDebitSum = 0;
		let modifiedCreditSum = 0;
		if (this.props.data) {
			const aggregation = this.props.data.aggregations;
			let buckets = aggregation.credit.filtered_by_date.buckets;
			if (buckets) {
				creditSum = buckets.filter(c => moment(c.key_as_string).format('YYYY-MM') === keyString).map(c => c.monthly_spend.sum)[0];
				if (!creditSum) {
					creditSum = 0;
				}
				modifiedCreditSum = config.currencySign + NumberUtils.formatAmount(creditSum.toFixed(2).toString().replace('-', ''));
			}
			buckets = aggregation.debit.filtered_by_date.buckets;
			if (buckets) {
				debitSum = buckets.filter(c => moment(c.key_as_string).format('YYYY-MM') === keyString).map(c => c.monthly_spend.sum)[0];
				if (!debitSum) {
					debitSum = 0;
				}
				modifiedDebitSum = config.currencySign + NumberUtils.formatAmount(debitSum.toFixed(2).toString().replace('-', ''));
			}
		}

		// if (creditSum > 0 || debitSum > 0) {
			return this.props.content.inAndOutFootrText.replace('{credit}', modifiedCreditSum).replace('{debit}', modifiedDebitSum);
		// } else {
	},
	getHeaderInAndOutText() {
		const keyString = this.getDate();
		let sum = 0;
		let modifiedSum;
		if (this.props.data) {
			const aggregation = this.props.data.aggregations;
			const buckets = aggregation.totals_of_debit_and_credits.filtered_by_date.buckets;
			if (buckets) {
				sum = buckets.filter(c => moment(c.key_as_string).format('YYYY-MM') === keyString).map(c => c.monthly_spend.sum)[0];
				sum = !sum ? 0 : sum;
				modifiedSum = this.getFormattedAmount(config.currencySign + NumberUtils.formatAmount(sum.toFixed(2).toString().replace('-', '')));
			}
		}
		if (this.props.data.selectedMonth === undefined || this.props.data.selectedMonth === 0 || this.props.data.selectedMonth === moment().month()) {
				if (sum === 0) {
					return this.props.content.inAndOut_headerTextCurrentMonth;
				} else if (sum > 0) {
					return this.props.content.inAndOut_headerTextCurrentMonthPositiveSum.replace('{sum}', modifiedSum);
				} else {
					return this.props.content.inAndOut_headerTextCurrentMonthNegativeSum.replace('{sum}', modifiedSum);
				}
			} else {
				if (sum === 0) {
					return this.props.content.inAndOut_headerTextOtherMonths;
				} else if (sum > 0) {
					return this.props.content.inAndOut_headerTextOtherMonthsPositiveSum.replace('{sum}', modifiedSum);
				} else {
					return this.props.content.inAndOut_headerTextOtherMonthsNegativeSum.replace('{sum}', modifiedSum);
				}
			}
	},

	getFooterCashPointText() {
		const keyString = this.getDate();
		let sum = 0;
		let modifiedSum;
		if (this.props.data) {
			const aggregation = this.props.data.aggregations;
			const buckets = aggregation.debit.filtered_by_date.buckets;
			if (buckets) {
				sum = buckets.filter(c => moment(c.key_as_string).format('YYYY-MM') === keyString).map(c => c.most_popular_transaction.buckets[0].key)[0];
				sum = !sum ? 0 : sum;
				modifiedSum = config.currencySign + NumberUtils.formatAmount(sum.toFixed(2).toString().replace('-', ''));
			}
		}

		if (sum !== 0) {
			return this.props.content.cashpoint_footerText.replace('{sum}', modifiedSum);
		} else {
			return null;
		}
	},
	getHeaderCashPointText() {
		const keyString = this.getDate();
		let sum = 0;
		let modifiedSum;
		if (this.props.data) {
			const aggregation = this.props.data.aggregations;
			const buckets = aggregation.debit.filtered_by_date.buckets;
			if (buckets) {
				sum = buckets.filter(c => moment(c.key_as_string).format('YYYY-MM') === keyString).map(c => c.monthly_spend.sum)[0];
				sum = !sum ? 0 : sum;
				modifiedSum = this.getFormattedAmount(config.currencySign + NumberUtils.formatAmount(sum.toFixed(2).toString().replace('-', '')));
			}
		}
		if (this.props.data.selectedMonth === undefined || this.props.data.selectedMonth === 0 || this.props.data.selectedMonth === moment().month()) {
			if (sum === 0) {
				return this.props.content.cashpoint_headerTextCurrentMonth;
			} else if (Math.abs(sum) > 0) {
				return this.props.content.cashpoint_headerTextCurrentMonthSum.replace('{sum}', modifiedSum);
			}
		} else {
			if (sum === 0) {
				return this.props.content.cashpoint_headerTextOtherMonths;
			} else if (Math.abs(sum) > 0) {
				return this.props.content.cashpoint_headerTextOtherMonthsSum.replace('{sum}', modifiedSum);
			}
		}
	},
	getHeaderMicroText() {
		const keyString = this.getDate();
		let sum = 0;
		let modifiedSum;
		if (this.props.data) {
			const aggregation = this.props.data.aggregations;
			const buckets = aggregation.debit.filtered_by_date.buckets;
			if (buckets) {
				sum = buckets.filter(c => moment(c.key_as_string).format('YYYY-MM') === keyString).map(c => c.monthly_spend.sum)[0];
				sum = !sum ? 0 : sum;
				modifiedSum = this.getFormattedAmount(config.currencySign + sum.toFixed(2).toString().replace('-', ''));
			}
		}
		if (this.props.data.selectedMonth === undefined || this.props.data.selectedMonth === 0 || this.props.data.selectedMonth === moment().month()) {
			if (sum === 0) {
				return this.props.content.micro_headerTextCurrentMonth;
			} else if (Math.abs(sum) > 0) {
				return this.props.content.micro_headerTextCurrentMonthWithSum.replace('{sum}', modifiedSum);
			}
		} else {
			if (sum === 0) {
				return this.props.content.micro_headerTextOtherMonths;
			} else {
				return this.props.content.micro_headerTextOtherMonthsWithSum.replace('{sum}', modifiedSum);
			}
		}
	},

	getFooterMicroText() {
		const keyString = this.getDate();
		let sum = 0;
		let modifiedSum;
		if (this.props.data) {
			const aggregation = this.props.data.aggregations;
			const buckets = aggregation.debit.filtered_by_date.buckets;
			if (buckets) {
				sum = buckets.filter(c => moment(c.key_as_string).format('YYYY-MM') === keyString).map(c => c.monthly_spend.avg)[0];
				sum = !sum ? 0 : sum;
				modifiedSum = config.currencySign + sum.toFixed(2).toString().replace('-', '');
			}
		}

		if (sum !== 0) {
			return this.props.content.micro_footerText.replace('{sum}', modifiedSum);
		} else {
			return null;
		}
	},

	getHeader() {
		switch (this.props.tileType) {
			case this.props.content.Cashpoint:
				return this.getHeaderCashPointText();
			case this.props.content.InAndOut:
				return this.getHeaderInAndOutText();
			case this.props.content.MicroTransaction:
				return this.getHeaderMicroText();
			default:
		}
	},

	getFooter() {
		switch (this.props.tileType) {
			case this.props.content.Cashpoint:
				return this.getFooterCashPointText();
			case this.props.content.InAndOut:
				return this.getFooterInAndOutText();
			case this.props.content.MicroTransaction:
				return this.getFooterMicroText();
			default:
		}
	},

	getTileImageClass() {
		switch (this.props.tileType) {
			case this.props.content.Cashpoint:
				return 'chocolate-box';
			case this.props.content.InAndOut:
				return 'slinky';
			case this.props.content.MicroTransaction:
				return 'coffee';
			default:
		}
	},

	getDocCount() {
		const keyString = this.getDate();
		let docCount = 0;
		const aggregation = this.props.data.aggregations;
		if (this.props.data) {
			const buckets = aggregation.totals_of_debit_and_credits.filtered_by_date.buckets;
			if (buckets) {
				docCount = buckets.filter(c => moment(c.key_as_string).format('YYYY-MM') === keyString).map(c => c.doc_count)[0];
			}
		}
		return docCount;
	},

	getFormattedAmount(amount) {
		const value = _.split(amount, '.');
		const modifiedSum = `<span class="down-value">${value[0]}<span class="sec-value">.${value[1]}</span></span>`;
		return modifiedSum;
	},

	getDate() {
		return moment().subtract(this.props.data.selectedMonth, 'months').format('YYYY-MM');
	},

	getPanelData() {
		if (this.props.data !== undefined && this.props.data.hits !== undefined) {
			let TotalTransactions;
			if (this.props.data.hits.total > 0) {
				TotalTransactions = this.props.data.hits.hits.map((transactions, i) => {
					return (
						<tr key={i}>
							<td width="15%">{moment(transactions._source.details.when).format('DD-MMM-YY').split('-').join(' ') }</td>
							<td width="30%"><strong> {transactions._source.suggested_terms}</strong></td>
							<td width="20%"> {transactions._source.details.type} </td>
							<td width="20%"><span className="icon icon-tag"></span>{(transactions._source.metadata.tags && transactions._source.metadata.tags.length > 0 ? transactions._source.metadata.tags[0].value :
								((transactions._source.metadata.categories && transactions._source.metadata.categories.length > 0) && transactions._source.metadata.categories[0].value)) } </td>
							<td width="15%" className="text-right" > <strong>{NumberUtils.appendCurrency('{}', transactions._source.details.amount.value)}</strong></td>
						</tr>);
				}
				);
			} else {
				TotalTransactions = <tr className="no-data"><td className="text-center">{this.props.content.noTransactionFound}</td></tr>;
			}

			return (<table><tbody>{TotalTransactions}</tbody></table>);
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
		if (!FinancialStoriesStore.getAssignTagStatus()) {
		return (
			<div className="fc-main-wrapper">
				<p><a ref="donBtn" href="#" onClick={this.doneClick}>{this.props.content.doneButton}</a></p>
				<div className="inner-wrapper">
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">

								<h3 className="statement1 break-line"><span dangerouslySetInnerHTML={{ __html: this.getHeader() }}></span></h3>
								<div className="fc-select">
									<Select name="select" autoFocus value={this.state.selectedMon} onChange={this.onMonthChange}>
										{this.getMonthsList() }
									</Select>
								</div>
								<div className="stmnt-wrapper"><h3 className="statement2">{this.getFooter() }</h3></div>
							</div>
							<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
								<div className="banner-img">
									<div className={this.getTileImageClass() }></div>
								</div>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="fc-table">

									{this.getPanelData() }

								</div>
							</div>
						</div>
					</div>
				</div>
				<p className="back_to_head"><a href="#" onClick={this.backToTop}><img src="../images/b/backtoTop.png" alt="" title="" /></a></p>
			</div>
		);
		} else {
			return <div className="chicken-loading"></div>;
		}
	},
});
module.exports = TileComponent;

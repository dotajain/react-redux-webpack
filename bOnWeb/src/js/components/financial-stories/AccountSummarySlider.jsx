/**
 * @module AccountSummarySlider
 */
const React = require('react');
const Slider = require('react-slick');
const { PropTypes } = React;
const FinancialStoriesStore = require('../../stores/FinancialStoriesStore');
const FinancialStoriesActionCreator = require('../../actions/FinancialStoriesActionCreator');
const _ = require('lodash');

const AccountSummarySlider = React.createClass({
	propTypes:{
		content: PropTypes.object,
		onTagsClick:PropTypes.func,
		onNextAccountDetails:PropTypes.func,
	},
	getInitialState() {
		return {
		accountsState: FinancialStoriesStore.getState(),
		};
	},
	getSlide() {
		const accountList = this.state.accountsState.accountList;
		const accountDetails = this.state.accountsState.accountDetails;
		const accountDetailError = FinancialStoriesStore.isInternalServerError();
		const slides = [];
		let amount;
		if (accountDetails.currentBalance) {
			amount = _.split(accountDetails.currentBalance, '.');
		}
		if (accountList.length > 0) {
			for (let i = 0; i < accountList.length; i++) {
				slides.push(
					<div key={i} className="slide">
						<a href="#" className="slide-content">
							<h3>{accountDetails.name}</h3>
							{!accountDetailError && <h2>{amount[0]}.<sub>{!amount[1] ? '00' : amount[1]}</sub></h2>}
						</a>
					</div>
				);
			}
		}
		return slides;
	},
	getSelectedAccountSliderIndex () {
		const accountList = this.state.accountsState.accountList;
		for (let i = 0; i < accountList.length; i++) {
			if (accountList[i].id === this.state.accountsState.accountId) {
				return i;
			}
		}
		// const index = _.findIndex(accountList, function(o) { return o.user === 'barney'; });
		// return accountList.findIndex(x => x.id === this.state.accountsState.accountId);
	},

	beforeChange (current, index) {
		index !== -1 && this.nextSlide(index);
	},

	nextSlide(index) {
		const accountList = this.state.accountsState.accountList;// this.props.accountList;
		const nextSlide = index;
		FinancialStoriesActionCreator.getAccountDetails(accountList[nextSlide].id, accountList[nextSlide].type, accountList[nextSlide].counter + 1);
		this.props.onNextAccountDetails();
  },

	render() {
		const settings = {
			fade: true,
			arrows: true,
			dots: true,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			draggable: false,
			swipe: false,
			beforeChange:this.beforeChange,
			initialSlide:this.getSelectedAccountSliderIndex(),
			responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }, { breakpoint: 991, settings: { slidesToShow: 1 } }, { breakpoint: 1024, settings: { slidesToShow: 1 } }, { breakpoint: 1200, settings: { slidesToShow: 1 } }],
		};

	return (
		<Slider ref="slider" {...settings}>
			{this.getSlide()}
		</Slider>
	);
  },
});

module.exports = AccountSummarySlider;

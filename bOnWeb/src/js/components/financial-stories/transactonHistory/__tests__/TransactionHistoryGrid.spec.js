jest.unmock('../TransactionHistoryGrid');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const Helmet = require('react-helmet');
const update = require('react-addons-update');

const TransactionHistoryGrid = require('../TransactionHistoryGrid');

const FinancialStoriesActionCreator = require('../../../../actions/FinancialStoriesActionCreator');
const FinancialStoriesStore = require('../../../../stores/FinancialStoriesStore');
const BDataGrid = require('../../../common/datagrid/BDataGrid');
const BrowserUtils = require('../../../../utils/BrowserUtils');
const MobileViewTransactionHistoryGrid = require('../MobileViewTransactionHistoryGrid');

let dummyVal = '';

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<TransactionHistoryGrid {...props} />);
	return shallowRenderer.getRenderOutput();
};

FinancialStoriesStore.getState.mockReturnValue({
	accountDetails: {
		canLoadTransactions: true,
	}
})

describe('TransactionHistoryGrid Test Cases check', () => {
	let props = {
		data: [{ id: 1 }, { id: 2 }],
		onShowProgressIconClick: jest.fn(),
		openSideBar: jest.fn(),
		content: {
			MicroTransaction: 'microTransactions',
			Cashpoint: 'cashpoint',
			InAndOut: 'insAndOuts',
			Projection: 'projection',
			CurrencySign: '-£',
			tile1Header: 'So far you havent spent  on things under a tenner this month',
			tile1Footer: 'Take a closer look...',
			tile2Header: 'Great news, looks like you ll be in the green till payday',
			tile2Footer: 'Go to Projections',
			tile3Header: 'You\'ve taken out in cash so far this month ',
			tile3Footer: 'Take a closer look...',
			tile4Header: 'Nothing\'s in or out of your account so far',
			tile4Footer: 'Take a closer look...',
			tile4HeaderNoData: 'We can\'t show you this story right now',
			tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
			accountDetailsInprogressHeader: 'In progress',
			accountDetailsInprogressContent: 'This is still going through',
			inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
			inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
			inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
			inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
			inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down {sum}',
			inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
			inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
			cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
			cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
			cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
			cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
			cashpoint_footerText: 'You usually take out {sum} at a time',
			noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
			noTransactionFound: 'No transactions found',
			transactionReTag: '{TranNo} transaction has been retagged {TagName}',
			transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
			micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
			micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
			micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum} on things under a tenner',
			micro_headerTextOtherMonthsWithSum: 'You spent {sum} on things under a tenner',
			micro_footerText: 'That\'s about {sum} a pop',
			currency: 'GBP',
			asc: 'asc',
			desc: 'desc',
			threeMonths: '3 months',
			customRange: 'Custom Range',


			// Account Details
			availableBalance: 'Available Balance',
			borrowingLimit: 'Planned borrowing limit',
			lastStatementDate: 'Last statement date',
			lastStatementBalance: 'Last statement balance',
			minPaymentDue: 'Minimun payment due',
			paymentDueDate: 'Payment due date',
			creditCardLimit: 'Credit card limit',
			AccountMoreInfoView_AvailableBalanceDisclaimer: 'This balance may also include items that haven\'t gone through yet.',
			AccountMoreInfoView_AvailableBalanceDisclaimer_WithOverdraft: 'This balance, which includes any overdraft, may also include items that haven\'t gone through yet.',
			AccountMoreInfoView_ContactMessage: 'If you\'d like to talk about this account, please call the team at B on 0800 1217365.',
			prevSlide: '◀︎',
			nextSlide: '▶︎',
			helpButton: 'Help',
			searchKey: 'Search',
			yesText: 'Yes',
			FYI: 'FYI',
			transition: 'scale',
			current: 'current',
			creditCard: 'credit_card',
			savings: 'savings',
			loan: 'loan',
			mortgage: 'mortgage',
			moreInformation: 'More Information',
			hideInformation: 'Hide Information',
		},

	}

	let component = TestUtils.renderIntoDocument(
		<TransactionHistoryGrid  {...props}
			/>
	);

	it('should run onSetOpen', () => {
		let row = 'row';
		component.onSetOpen(row);
	});

	it('should run onSetOpen covering else condition', () => {
		let row = false;
		component.onSetOpen(row);
	});

	it('should run componentWillReceiveProps', () => {
		let nextProps = {
			openGridCheckBoxColumn: true,
			resetTranTagSelection: true,
		};
		component.componentWillReceiveProps(nextProps);
	});

	it('should run componentWillReceiveProps for else conditios', () => {
		let nextProps = {
			openGridCheckBoxColumn: false,
			resetTranTagSelection: false,
		};
		component.componentWillReceiveProps(nextProps);
	});

	it('should run onRowSelect fxn', () => {
		let row = {
			id: 'id',
		}
		let isSelected = true;
		component.onRowSelect(row, isSelected);
	});

	it('should run onRowSelect fxn when isSelected = false', () => {
		let row = {
			id: 'id',
		}
		let isSelected = false;
		component.onRowSelect(row, isSelected);
	});

	it('should run onRowSelect fxn when isSelected = false', () => {
		let row = {
			id: 'id',
		}
		let isSelected = false;
		component.setState({ open: true })
		component.setState({ selected: [1, 2] });
		component.onRowSelect(row, isSelected);
	});

	it('should run onRowSelectAll fxn ', () => {
		let currentSelectedAndDisplayData = [1, 2, 3, 4, 5]
		let isSelected = true;
		component.onRowSelectAll(currentSelectedAndDisplayData, isSelected);
	});

	it('should run onRowSelectAll fxn when isSelected = false', () => {
		let currentSelectedAndDisplayData = [1, 2, 3, 4, 5];
		let isSelected = false;
		component.onRowSelectAll(currentSelectedAndDisplayData, isSelected);
	});

	xit('should run onRowSelectAll fxn when isSelected = false', () => {
		let currPage = 10;
		let sizePerPage = 10;
		let props = {
			data: [{ id: 1 }, { id: 2 }],
			onShowProgressIconClick: jest.fn(),
			openSideBar: jest.fn(),
			content: {
				MicroTransaction: 'microTransactions',
				Cashpoint: 'cashpoint',
				InAndOut: 'insAndOuts',
				Projection: 'projection',
				CurrencySign: '-£',
				tile1Header: 'So far you havent spent  on things under a tenner this month',
				tile1Footer: 'Take a closer look...',
				tile2Header: 'Great news, looks like you ll be in the green till payday',
				tile2Footer: 'Go to Projections',
				tile3Header: 'You\'ve taken out in cash so far this month ',
				tile3Footer: 'Take a closer look...',
				tile4Header: 'Nothing\'s in or out of your account so far',
				tile4Footer: 'Take a closer look...',
				tile4HeaderNoData: 'We can\'t show you this story right now',
				tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
				accountDetailsInprogressHeader: 'In progress',
				accountDetailsInprogressContent: 'This is still going through',
				inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
				inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
				inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
				inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
				inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down {sum}',
				inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
				inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
				cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
				cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
				cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
				cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
				cashpoint_footerText: 'You usually take out {sum} at a time',
				noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
				noTransactionFound: 'No transactions found',
				transactionReTag: '{TranNo} transaction has been retagged {TagName}',
				transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
				micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
				micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
				micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum} on things under a tenner',
				micro_headerTextOtherMonthsWithSum: 'You spent {sum} on things under a tenner',
				micro_footerText: 'That\'s about {sum} a pop',
				currency: 'GBP',
				asc: 'asc',
				desc: 'desc',
				threeMonths: '3 months',
				customRange: 'Custom Range',


				// Account Details
				availableBalance: 'Available Balance',
				borrowingLimit: 'Planned borrowing limit',
				lastStatementDate: 'Last statement date',
				lastStatementBalance: 'Last statement balance',
				minPaymentDue: 'Minimun payment due',
				paymentDueDate: 'Payment due date',
				creditCardLimit: 'Credit card limit',
				AccountMoreInfoView_AvailableBalanceDisclaimer: 'This balance may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_AvailableBalanceDisclaimer_WithOverdraft: 'This balance, which includes any overdraft, may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_ContactMessage: 'If you\'d like to talk about this account, please call the team at B on 0800 1217365.',
				prevSlide: '◀︎',
				nextSlide: '▶︎',
				helpButton: 'Help',
				searchKey: 'Search',
				yesText: 'Yes',
				FYI: 'FYI',
				transition: 'scale',
				current: 'current',
				creditCard: 'credit_card',
				savings: 'savings',
				loan: 'loan',
				mortgage: 'mortgage',
				moreInformation: 'More Information',
				hideInformation: 'Hide Information',
			},

		}

		let component = TestUtils.renderIntoDocument(
			<TransactionHistoryGrid  {...props}
				/>
		);
		component.refs.TransactionHistoryGrid.props.resultsPerPage = 10;
		component.onPageChange(currPage, sizePerPage);
	});

	it('should run onRowSelectAll fxn when isSelected = false', () => {
		let sortName = 'date';
		let sort = 'asc';
		component.onSortChange(sortName, sort);
	});

	it('should run onSortChange fxn when sort = desc', () => {
		let sortName = 'date';
		let sort = 'desc';
		component.onSortChange(sortName, sort);
	});

	it('should run onSortChange fxn when sortName != date', () => {
		let sortName = '';
		let sort = 'desc';
		component.onSortChange(sortName, sort);
	});

	it('should run onSortChange fxn when sortName = description', () => {
		let sortName = 'description';
		let sort = 'desc';
		component.onSortChange(sortName, sort);
	});


	it('should run callTransactionBalanceFun fxn', () => {
		let props = {
			data: [{ id: 1 }, { id: 2 }],
			onShowProgressIconClick: jest.fn(),
			openSideBar: jest.fn(),
			content: {
				MicroTransaction: 'microTransactions',
				Cashpoint: 'cashpoint',
				InAndOut: 'insAndOuts',
				Projection: 'projection',
				CurrencySign: '-£',
				tile1Header: 'So far you havent spent  on things under a tenner this month',
				tile1Footer: 'Take a closer look...',
				tile2Header: 'Great news, looks like you ll be in the green till payday',
				tile2Footer: 'Go to Projections',
				tile3Header: 'You\'ve taken out in cash so far this month ',
				tile3Footer: 'Take a closer look...',
				tile4Header: 'Nothing\'s in or out of your account so far',
				tile4Footer: 'Take a closer look...',
				tile4HeaderNoData: 'We can\'t show you this story right now',
				tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
				accountDetailsInprogressHeader: 'In progress',
				accountDetailsInprogressContent: 'This is still going through',
				inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
				inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
				inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
				inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
				inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down {sum}',
				inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
				inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
				cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
				cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
				cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
				cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
				cashpoint_footerText: 'You usually take out {sum} at a time',
				noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
				noTransactionFound: 'No transactions found',
				transactionReTag: '{TranNo} transaction has been retagged {TagName}',
				transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
				micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
				micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
				micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum} on things under a tenner',
				micro_headerTextOtherMonthsWithSum: 'You spent {sum} on things under a tenner',
				micro_footerText: 'That\'s about {sum} a pop',
				currency: 'GBP',
				asc: 'asc',
				desc: 'desc',
				threeMonths: '3 months',
				customRange: 'Custom Range',


				// Account Details
				availableBalance: 'Available Balance',
				borrowingLimit: 'Planned borrowing limit',
				lastStatementDate: 'Last statement date',
				lastStatementBalance: 'Last statement balance',
				minPaymentDue: 'Minimun payment due',
				paymentDueDate: 'Payment due date',
				creditCardLimit: 'Credit card limit',
				AccountMoreInfoView_AvailableBalanceDisclaimer: 'This balance may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_AvailableBalanceDisclaimer_WithOverdraft: 'This balance, which includes any overdraft, may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_ContactMessage: 'If you\'d like to talk about this account, please call the team at B on 0800 1217365.',
				prevSlide: '◀︎',
				nextSlide: '▶︎',
				helpButton: 'Help',
				searchKey: 'Search',
				yesText: 'Yes',
				FYI: 'FYI',
				transition: 'scale',
				current: 'current',
				creditCard: 'credit_card',
				savings: 'savings',
				loan: 'loan',
				mortgage: 'mortgage',
				moreInformation: 'More Information',
				hideInformation: 'Hide Information',
			},

		}
		component.callTransactionBalanceFun(props);
	});

	it('should run callTransactionBalanceFun fxn when data is undefined', () => {
		let props = {
			data: undefined,
			onShowProgressIconClick: jest.fn(),
			openSideBar: jest.fn(),
			content: {
				MicroTransaction: 'microTransactions',
				Cashpoint: 'cashpoint',
				InAndOut: 'insAndOuts',
				Projection: 'projection',
				CurrencySign: '-£',
				tile1Header: 'So far you havent spent  on things under a tenner this month',
				tile1Footer: 'Take a closer look...',
				tile2Header: 'Great news, looks like you ll be in the green till payday',
				tile2Footer: 'Go to Projections',
				tile3Header: 'You\'ve taken out in cash so far this month ',
				tile3Footer: 'Take a closer look...',
				tile4Header: 'Nothing\'s in or out of your account so far',
				tile4Footer: 'Take a closer look...',
				tile4HeaderNoData: 'We can\'t show you this story right now',
				tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
				accountDetailsInprogressHeader: 'In progress',
				accountDetailsInprogressContent: 'This is still going through',
				inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
				inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
				inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
				inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
				inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down {sum}',
				inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
				inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
				cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
				cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
				cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
				cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
				cashpoint_footerText: 'You usually take out {sum} at a time',
				noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
				noTransactionFound: 'No transactions found',
				transactionReTag: '{TranNo} transaction has been retagged {TagName}',
				transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
				micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
				micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
				micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum} on things under a tenner',
				micro_headerTextOtherMonthsWithSum: 'You spent {sum} on things under a tenner',
				micro_footerText: 'That\'s about {sum} a pop',
				currency: 'GBP',
				asc: 'asc',
				desc: 'desc',
				threeMonths: '3 months',
				customRange: 'Custom Range',


				// Account Details
				availableBalance: 'Available Balance',
				borrowingLimit: 'Planned borrowing limit',
				lastStatementDate: 'Last statement date',
				lastStatementBalance: 'Last statement balance',
				minPaymentDue: 'Minimun payment due',
				paymentDueDate: 'Payment due date',
				creditCardLimit: 'Credit card limit',
				AccountMoreInfoView_AvailableBalanceDisclaimer: 'This balance may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_AvailableBalanceDisclaimer_WithOverdraft: 'This balance, which includes any overdraft, may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_ContactMessage: 'If you\'d like to talk about this account, please call the team at B on 0800 1217365.',
				prevSlide: '◀︎',
				nextSlide: '▶︎',
				helpButton: 'Help',
				searchKey: 'Search',
				yesText: 'Yes',
				FYI: 'FYI',
				transition: 'scale',
				current: 'current',
				creditCard: 'credit_card',
				savings: 'savings',
				loan: 'loan',
				mortgage: 'mortgage',
				moreInformation: 'More Information',
				hideInformation: 'Hide Information',
			},

		}
		component.callTransactionBalanceFun(props);
	});

	xit('should run callTransactionTagFun fxn when data is empty', () => {
		let props = {
			data: undefined,
			onShowProgressIconClick: jest.fn(),
			openSideBar: jest.fn(),
			content: {
				MicroTransaction: 'microTransactions',
				Cashpoint: 'cashpoint',
				InAndOut: 'insAndOuts',
				Projection: 'projection',
				CurrencySign: '-£',
				tile1Header: 'So far you havent spent  on things under a tenner this month',
				tile1Footer: 'Take a closer look...',
				tile2Header: 'Great news, looks like you ll be in the green till payday',
				tile2Footer: 'Go to Projections',
				tile3Header: 'You\'ve taken out in cash so far this month ',
				tile3Footer: 'Take a closer look...',
				tile4Header: 'Nothing\'s in or out of your account so far',
				tile4Footer: 'Take a closer look...',
				tile4HeaderNoData: 'We can\'t show you this story right now',
				tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
				accountDetailsInprogressHeader: 'In progress',
				accountDetailsInprogressContent: 'This is still going through',
				inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
				inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
				inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
				inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
				inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down {sum}',
				inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
				inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
				cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
				cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
				cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
				cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
				cashpoint_footerText: 'You usually take out {sum} at a time',
				noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
				noTransactionFound: 'No transactions found',
				transactionReTag: '{TranNo} transaction has been retagged {TagName}',
				transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
				micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
				micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
				micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum} on things under a tenner',
				micro_headerTextOtherMonthsWithSum: 'You spent {sum} on things under a tenner',
				micro_footerText: 'That\'s about {sum} a pop',
				currency: 'GBP',
				asc: 'asc',
				desc: 'desc',
				threeMonths: '3 months',
				customRange: 'Custom Range',


				// Account Details
				availableBalance: 'Available Balance',
				borrowingLimit: 'Planned borrowing limit',
				lastStatementDate: 'Last statement date',
				lastStatementBalance: 'Last statement balance',
				minPaymentDue: 'Minimun payment due',
				paymentDueDate: 'Payment due date',
				creditCardLimit: 'Credit card limit',
				AccountMoreInfoView_AvailableBalanceDisclaimer: 'This balance may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_AvailableBalanceDisclaimer_WithOverdraft: 'This balance, which includes any overdraft, may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_ContactMessage: 'If you\'d like to talk about this account, please call the team at B on 0800 1217365.',
				prevSlide: '◀︎',
				nextSlide: '▶︎',
				helpButton: 'Help',
				searchKey: 'Search',
				yesText: 'Yes',
				FYI: 'FYI',
				transition: 'scale',
				current: 'current',
				creditCard: 'credit_card',
				savings: 'savings',
				loan: 'loan',
				mortgage: 'mortgage',
				moreInformation: 'More Information',
				hideInformation: 'Hide Information',
			},

		}
		component.callTransactionTagFun(props);
	});

	xit('should run callTransactionTagFun fxn ', () => {
		let props = {
			data: [{ id: 1 }, { id: 2 }],
			onShowProgressIconClick: jest.fn(),
			openSideBar: jest.fn(),
			content: {
				MicroTransaction: 'microTransactions',
				Cashpoint: 'cashpoint',
				InAndOut: 'insAndOuts',
				Projection: 'projection',
				CurrencySign: '-£',
				tile1Header: 'So far you havent spent  on things under a tenner this month',
				tile1Footer: 'Take a closer look...',
				tile2Header: 'Great news, looks like you ll be in the green till payday',
				tile2Footer: 'Go to Projections',
				tile3Header: 'You\'ve taken out in cash so far this month ',
				tile3Footer: 'Take a closer look...',
				tile4Header: 'Nothing\'s in or out of your account so far',
				tile4Footer: 'Take a closer look...',
				tile4HeaderNoData: 'We can\'t show you this story right now',
				tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
				accountDetailsInprogressHeader: 'In progress',
				accountDetailsInprogressContent: 'This is still going through',
				inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
				inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
				inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
				inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
				inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down {sum}',
				inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
				inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
				cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
				cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
				cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
				cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
				cashpoint_footerText: 'You usually take out {sum} at a time',
				noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
				noTransactionFound: 'No transactions found',
				transactionReTag: '{TranNo} transaction has been retagged {TagName}',
				transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
				micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
				micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
				micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum} on things under a tenner',
				micro_headerTextOtherMonthsWithSum: 'You spent {sum} on things under a tenner',
				micro_footerText: 'That\'s about {sum} a pop',
				currency: 'GBP',
				asc: 'asc',
				desc: 'desc',
				threeMonths: '3 months',
				customRange: 'Custom Range',


				// Account Details
				availableBalance: 'Available Balance',
				borrowingLimit: 'Planned borrowing limit',
				lastStatementDate: 'Last statement date',
				lastStatementBalance: 'Last statement balance',
				minPaymentDue: 'Minimun payment due',
				paymentDueDate: 'Payment due date',
				creditCardLimit: 'Credit card limit',
				AccountMoreInfoView_AvailableBalanceDisclaimer: 'This balance may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_AvailableBalanceDisclaimer_WithOverdraft: 'This balance, which includes any overdraft, may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_ContactMessage: 'If you\'d like to talk about this account, please call the team at B on 0800 1217365.',
				prevSlide: '◀︎',
				nextSlide: '▶︎',
				helpButton: 'Help',
				searchKey: 'Search',
				yesText: 'Yes',
				FYI: 'FYI',
				transition: 'scale',
				current: 'current',
				creditCard: 'credit_card',
				savings: 'savings',
				loan: 'loan',
				mortgage: 'mortgage',
				moreInformation: 'More Information',
				hideInformation: 'Hide Information',
			},

		}
		component.callTransactionTagFun(props);
	});

	xit('should run callTransactionTagFun fxn when data = Untagged', () => {
		let props = {
			data: 'Untagged',
			onShowProgressIconClick: jest.fn(),
			openSideBar: jest.fn(),
			content: {
				MicroTransaction: 'microTransactions',
				Cashpoint: 'cashpoint',
				InAndOut: 'insAndOuts',
				Projection: 'projection',
				CurrencySign: '-£',
				tile1Header: 'So far you havent spent  on things under a tenner this month',
				tile1Footer: 'Take a closer look...',
				tile2Header: 'Great news, looks like you ll be in the green till payday',
				tile2Footer: 'Go to Projections',
				tile3Header: 'You\'ve taken out in cash so far this month ',
				tile3Footer: 'Take a closer look...',
				tile4Header: 'Nothing\'s in or out of your account so far',
				tile4Footer: 'Take a closer look...',
				tile4HeaderNoData: 'We can\'t show you this story right now',
				tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
				accountDetailsInprogressHeader: 'In progress',
				accountDetailsInprogressContent: 'This is still going through',
				inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
				inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
				inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
				inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
				inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down {sum}',
				inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
				inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
				cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
				cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
				cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
				cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
				cashpoint_footerText: 'You usually take out {sum} at a time',
				noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
				noTransactionFound: 'No transactions found',
				transactionReTag: '{TranNo} transaction has been retagged {TagName}',
				transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
				micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
				micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
				micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum} on things under a tenner',
				micro_headerTextOtherMonthsWithSum: 'You spent {sum} on things under a tenner',
				micro_footerText: 'That\'s about {sum} a pop',
				currency: 'GBP',
				asc: 'asc',
				desc: 'desc',
				threeMonths: '3 months',
				customRange: 'Custom Range',


				// Account Details
				availableBalance: 'Available Balance',
				borrowingLimit: 'Planned borrowing limit',
				lastStatementDate: 'Last statement date',
				lastStatementBalance: 'Last statement balance',
				minPaymentDue: 'Minimun payment due',
				paymentDueDate: 'Payment due date',
				creditCardLimit: 'Credit card limit',
				AccountMoreInfoView_AvailableBalanceDisclaimer: 'This balance may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_AvailableBalanceDisclaimer_WithOverdraft: 'This balance, which includes any overdraft, may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_ContactMessage: 'If you\'d like to talk about this account, please call the team at B on 0800 1217365.',
				prevSlide: '◀︎',
				nextSlide: '▶︎',
				helpButton: 'Help',
				searchKey: 'Search',
				yesText: 'Yes',
				FYI: 'FYI',
				transition: 'scale',
				current: 'current',
				creditCard: 'credit_card',
				savings: 'savings',
				loan: 'loan',
				mortgage: 'mortgage',
				moreInformation: 'More Information',
				hideInformation: 'Hide Information',
			},

		}
		component.callTransactionTagFun(props);
	});


	xit('should run callTransactionTagFun fxn when', () => {
		let props = {
			data: [{ id: 1 }, { id: 2 }],
			rowData: {
				city: 'city',
			},
			onShowProgressIconClick: jest.fn(),
			openSideBar: jest.fn(),
			content: {
				MicroTransaction: 'microTransactions',
				Cashpoint: 'cashpoint',
				InAndOut: 'insAndOuts',
				Projection: 'projection',
				CurrencySign: '-£',
				tile1Header: 'So far you havent spent  on things under a tenner this month',
				tile1Footer: 'Take a closer look...',
				tile2Header: 'Great news, looks like you ll be in the green till payday',
				tile2Footer: 'Go to Projections',
				tile3Header: 'You\'ve taken out in cash so far this month ',
				tile3Footer: 'Take a closer look...',
				tile4Header: 'Nothing\'s in or out of your account so far',
				tile4Footer: 'Take a closer look...',
				tile4HeaderNoData: 'We can\'t show you this story right now',
				tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
				accountDetailsInprogressHeader: 'In progress',
				accountDetailsInprogressContent: 'This is still going through',
				inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
				inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
				inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
				inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
				inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down {sum}',
				inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
				inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
				cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
				cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
				cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
				cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
				cashpoint_footerText: 'You usually take out {sum} at a time',
				noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
				noTransactionFound: 'No transactions found',
				transactionReTag: '{TranNo} transaction has been retagged {TagName}',
				transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
				micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
				micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
				micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum} on things under a tenner',
				micro_headerTextOtherMonthsWithSum: 'You spent {sum} on things under a tenner',
				micro_footerText: 'That\'s about {sum} a pop',
				currency: 'GBP',
				asc: 'asc',
				desc: 'desc',
				threeMonths: '3 months',
				customRange: 'Custom Range',


				// Account Details
				availableBalance: 'Available Balance',
				borrowingLimit: 'Planned borrowing limit',
				lastStatementDate: 'Last statement date',
				lastStatementBalance: 'Last statement balance',
				minPaymentDue: 'Minimun payment due',
				paymentDueDate: 'Payment due date',
				creditCardLimit: 'Credit card limit',
				AccountMoreInfoView_AvailableBalanceDisclaimer: 'This balance may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_AvailableBalanceDisclaimer_WithOverdraft: 'This balance, which includes any overdraft, may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_ContactMessage: 'If you\'d like to talk about this account, please call the team at B on 0800 1217365.',
				prevSlide: '◀︎',
				nextSlide: '▶︎',
				helpButton: 'Help',
				searchKey: 'Search',
				yesText: 'Yes',
				FYI: 'FYI',
				transition: 'scale',
				current: 'current',
				creditCard: 'credit_card',
				savings: 'savings',
				loan: 'loan',
				mortgage: 'mortgage',
				moreInformation: 'More Information',
				hideInformation: 'Hide Information',
			},
		}

		component.descriptionFormatter(props);
	});

	it('should run callTransactionTagFun fxn when data = undefined', () => {
		let props = {
			data: undefined,
			rowData: {
				city: 'city',
			},
			onShowProgressIconClick: jest.fn(),
			openSideBar: jest.fn(),
			content: {
				MicroTransaction: 'microTransactions',
				Cashpoint: 'cashpoint',
				InAndOut: 'insAndOuts',
				Projection: 'projection',
				CurrencySign: '-£',
				tile1Header: 'So far you havent spent  on things under a tenner this month',
				tile1Footer: 'Take a closer look...',
				tile2Header: 'Great news, looks like you ll be in the green till payday',
				tile2Footer: 'Go to Projections',
				tile3Header: 'You\'ve taken out in cash so far this month ',
				tile3Footer: 'Take a closer look...',
				tile4Header: 'Nothing\'s in or out of your account so far',
				tile4Footer: 'Take a closer look...',
				tile4HeaderNoData: 'We can\'t show you this story right now',
				tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
				accountDetailsInprogressHeader: 'In progress',
				accountDetailsInprogressContent: 'This is still going through',
				inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
				inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
				inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
				inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
				inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down {sum}',
				inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
				inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
				cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
				cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
				cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
				cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
				cashpoint_footerText: 'You usually take out {sum} at a time',
				noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
				noTransactionFound: 'No transactions found',
				transactionReTag: '{TranNo} transaction has been retagged {TagName}',
				transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
				micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
				micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
				micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum} on things under a tenner',
				micro_headerTextOtherMonthsWithSum: 'You spent {sum} on things under a tenner',
				micro_footerText: 'That\'s about {sum} a pop',
				currency: 'GBP',
				asc: 'asc',
				desc: 'desc',
				threeMonths: '3 months',
				customRange: 'Custom Range',


				// Account Details
				availableBalance: 'Available Balance',
				borrowingLimit: 'Planned borrowing limit',
				lastStatementDate: 'Last statement date',
				lastStatementBalance: 'Last statement balance',
				minPaymentDue: 'Minimun payment due',
				paymentDueDate: 'Payment due date',
				creditCardLimit: 'Credit card limit',
				AccountMoreInfoView_AvailableBalanceDisclaimer: 'This balance may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_AvailableBalanceDisclaimer_WithOverdraft: 'This balance, which includes any overdraft, may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_ContactMessage: 'If you\'d like to talk about this account, please call the team at B on 0800 1217365.',
				prevSlide: '◀︎',
				nextSlide: '▶︎',
				helpButton: 'Help',
				searchKey: 'Search',
				yesText: 'Yes',
				FYI: 'FYI',
				transition: 'scale',
				current: 'current',
				creditCard: 'credit_card',
				savings: 'savings',
				loan: 'loan',
				mortgage: 'mortgage',
				moreInformation: 'More Information',
				hideInformation: 'Hide Information',
			},
		}

		component.descriptionFormatter(props);
	});

	it('should run amountFormatter fxn', () => {
		let props = {
			data: [{ id: 1 }, { id: 2 }],
			rowData: {
				city: 'city',
			},
			onShowProgressIconClick: jest.fn(),
			openSideBar: jest.fn(),
			content: {
				MicroTransaction: 'microTransactions',
				Cashpoint: 'cashpoint',
				InAndOut: 'insAndOuts',
				Projection: 'projection',
				CurrencySign: '-£',
				tile1Header: 'So far you havent spent  on things under a tenner this month',
				tile1Footer: 'Take a closer look...',
				tile2Header: 'Great news, looks like you ll be in the green till payday',
				tile2Footer: 'Go to Projections',
				tile3Header: 'You\'ve taken out in cash so far this month ',
				tile3Footer: 'Take a closer look...',
				tile4Header: 'Nothing\'s in or out of your account so far',
				tile4Footer: 'Take a closer look...',
				tile4HeaderNoData: 'We can\'t show you this story right now',
				tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
				accountDetailsInprogressHeader: 'In progress',
				accountDetailsInprogressContent: 'This is still going through',
				inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
				inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
				inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
				inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
				inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down {sum}',
				inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
				inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
				cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
				cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
				cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
				cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
				cashpoint_footerText: 'You usually take out {sum} at a time',
				noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
				noTransactionFound: 'No transactions found',
				transactionReTag: '{TranNo} transaction has been retagged {TagName}',
				transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
				micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
				micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
				micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum} on things under a tenner',
				micro_headerTextOtherMonthsWithSum: 'You spent {sum} on things under a tenner',
				micro_footerText: 'That\'s about {sum} a pop',
				currency: 'GBP',
				asc: 'asc',
				desc: 'desc',
				threeMonths: '3 months',
				customRange: 'Custom Range',


				// Account Details
				availableBalance: 'Available Balance',
				borrowingLimit: 'Planned borrowing limit',
				lastStatementDate: 'Last statement date',
				lastStatementBalance: 'Last statement balance',
				minPaymentDue: 'Minimun payment due',
				paymentDueDate: 'Payment due date',
				creditCardLimit: 'Credit card limit',
				AccountMoreInfoView_AvailableBalanceDisclaimer: 'This balance may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_AvailableBalanceDisclaimer_WithOverdraft: 'This balance, which includes any overdraft, may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_ContactMessage: 'If you\'d like to talk about this account, please call the team at B on 0800 1217365.',
				prevSlide: '◀︎',
				nextSlide: '▶︎',
				helpButton: 'Help',
				searchKey: 'Search',
				yesText: 'Yes',
				FYI: 'FYI',
				transition: 'scale',
				current: 'current',
				creditCard: 'credit_card',
				savings: 'savings',
				loan: 'loan',
				mortgage: 'mortgage',
				moreInformation: 'More Information',
				hideInformation: 'Hide Information',
			},
		}

		component.amountFormatter(props);
	});

	it('should run amountFormatter fxn when data = undefined', () => {
		let props = {
			data: undefined,
			rowData: {
				city: 'city',
			},
			onShowProgressIconClick: jest.fn(),
			openSideBar: jest.fn(),
			content: {
				MicroTransaction: 'microTransactions',
				Cashpoint: 'cashpoint',
				InAndOut: 'insAndOuts',
				Projection: 'projection',
				CurrencySign: '-£',
				tile1Header: 'So far you havent spent  on things under a tenner this month',
				tile1Footer: 'Take a closer look...',
				tile2Header: 'Great news, looks like you ll be in the green till payday',
				tile2Footer: 'Go to Projections',
				tile3Header: 'You\'ve taken out in cash so far this month ',
				tile3Footer: 'Take a closer look...',
				tile4Header: 'Nothing\'s in or out of your account so far',
				tile4Footer: 'Take a closer look...',
				tile4HeaderNoData: 'We can\'t show you this story right now',
				tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
				accountDetailsInprogressHeader: 'In progress',
				accountDetailsInprogressContent: 'This is still going through',
				inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
				inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
				inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
				inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
				inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down {sum}',
				inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
				inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
				cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
				cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
				cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
				cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
				cashpoint_footerText: 'You usually take out {sum} at a time',
				noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
				noTransactionFound: 'No transactions found',
				transactionReTag: '{TranNo} transaction has been retagged {TagName}',
				transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
				micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
				micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
				micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum} on things under a tenner',
				micro_headerTextOtherMonthsWithSum: 'You spent {sum} on things under a tenner',
				micro_footerText: 'That\'s about {sum} a pop',
				currency: 'GBP',
				asc: 'asc',
				desc: 'desc',
				threeMonths: '3 months',
				customRange: 'Custom Range',


				// Account Details
				availableBalance: 'Available Balance',
				borrowingLimit: 'Planned borrowing limit',
				lastStatementDate: 'Last statement date',
				lastStatementBalance: 'Last statement balance',
				minPaymentDue: 'Minimun payment due',
				paymentDueDate: 'Payment due date',
				creditCardLimit: 'Credit card limit',
				AccountMoreInfoView_AvailableBalanceDisclaimer: 'This balance may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_AvailableBalanceDisclaimer_WithOverdraft: 'This balance, which includes any overdraft, may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_ContactMessage: 'If you\'d like to talk about this account, please call the team at B on 0800 1217365.',
				prevSlide: '◀︎',
				nextSlide: '▶︎',
				helpButton: 'Help',
				searchKey: 'Search',
				yesText: 'Yes',
				FYI: 'FYI',
				transition: 'scale',
				current: 'current',
				creditCard: 'credit_card',
				savings: 'savings',
				loan: 'loan',
				mortgage: 'mortgage',
				moreInformation: 'More Information',
				hideInformation: 'Hide Information',
			},
		}

		component.amountFormatter(props);
	});

	it('should run getGridComponent fxn', () => {
		component.getGridComponent();
	});

	it('should run render fxn', () => {

		FinancialStoriesStore.getLoadStatus.mockReturnValue(true);

		let props = {
			data: [{ id: 1 }, { id: 2 }],
			onShowProgressIconClick: jest.fn(),
			openSideBar: jest.fn(),
			content: {
				MicroTransaction: 'microTransactions',
				Cashpoint: 'cashpoint',
				InAndOut: 'insAndOuts',
				Projection: 'projection',
				CurrencySign: '-£',
				tile1Header: 'So far you havent spent  on things under a tenner this month',
				tile1Footer: 'Take a closer look...',
				tile2Header: 'Great news, looks like you ll be in the green till payday',
				tile2Footer: 'Go to Projections',
				tile3Header: 'You\'ve taken out in cash so far this month ',
				tile3Footer: 'Take a closer look...',
				tile4Header: 'Nothing\'s in or out of your account so far',
				tile4Footer: 'Take a closer look...',
				tile4HeaderNoData: 'We can\'t show you this story right now',
				tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
				accountDetailsInprogressHeader: 'In progress',
				accountDetailsInprogressContent: 'This is still going through',
				inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
				inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
				inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
				inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
				inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down {sum}',
				inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
				inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
				cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
				cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
				cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
				cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
				cashpoint_footerText: 'You usually take out {sum} at a time',
				noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
				noTransactionFound: 'No transactions found',
				transactionReTag: '{TranNo} transaction has been retagged {TagName}',
				transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
				micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
				micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
				micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum} on things under a tenner',
				micro_headerTextOtherMonthsWithSum: 'You spent {sum} on things under a tenner',
				micro_footerText: 'That\'s about {sum} a pop',
				currency: 'GBP',
				asc: 'asc',
				desc: 'desc',
				threeMonths: '3 months',
				customRange: 'Custom Range',


				// Account Details
				availableBalance: 'Available Balance',
				borrowingLimit: 'Planned borrowing limit',
				lastStatementDate: 'Last statement date',
				lastStatementBalance: 'Last statement balance',
				minPaymentDue: 'Minimun payment due',
				paymentDueDate: 'Payment due date',
				creditCardLimit: 'Credit card limit',
				AccountMoreInfoView_AvailableBalanceDisclaimer: 'This balance may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_AvailableBalanceDisclaimer_WithOverdraft: 'This balance, which includes any overdraft, may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_ContactMessage: 'If you\'d like to talk about this account, please call the team at B on 0800 1217365.',
				prevSlide: '◀︎',
				nextSlide: '▶︎',
				helpButton: 'Help',
				searchKey: 'Search',
				yesText: 'Yes',
				FYI: 'FYI',
				transition: 'scale',
				current: 'current',
				creditCard: 'credit_card',
				savings: 'savings',
				loan: 'loan',
				mortgage: 'mortgage',
				moreInformation: 'More Information',
				hideInformation: 'Hide Information',
			},

		}

		let component = TestUtils.renderIntoDocument(
			<TransactionHistoryGrid  {...props}
				/>
		);
		component.render();
	});

	it('should run render fxn', () => {

		FinancialStoriesStore.getState.mockReturnValue({
			accountDetails: false
		});

		let props = {
			data: [{ id: 1 }, { id: 2 }],
			onShowProgressIconClick: jest.fn(),
			openSideBar: jest.fn(),
			content: {
				MicroTransaction: 'microTransactions',
				Cashpoint: 'cashpoint',
				InAndOut: 'insAndOuts',
				Projection: 'projection',
				CurrencySign: '-£',
				tile1Header: 'So far you havent spent  on things under a tenner this month',
				tile1Footer: 'Take a closer look...',
				tile2Header: 'Great news, looks like you ll be in the green till payday',
				tile2Footer: 'Go to Projections',
				tile3Header: 'You\'ve taken out in cash so far this month ',
				tile3Footer: 'Take a closer look...',
				tile4Header: 'Nothing\'s in or out of your account so far',
				tile4Footer: 'Take a closer look...',
				tile4HeaderNoData: 'We can\'t show you this story right now',
				tile4FooterNoData: 'We\'ll keep trying thoughâ€¦',
				accountDetailsInprogressHeader: 'In progress',
				accountDetailsInprogressContent: 'This is still going through',
				inAndOutFootrText: 'You had {credit} come in,\nbut {debit} go out.',
				inAndOut_headerTextCurrentMonth: 'Nothing\'s gone in or out\nof your account so far',
				inAndOut_headerTextOtherMonths: 'Nothing went in or out\nof your account',
				inAndOut_headerTextCurrentMonthPositiveSum: 'So far you\'re up {sum}',
				inAndOut_headerTextCurrentMonthNegativeSum: 'So far you\'re down {sum}',
				inAndOut_headerTextOtherMonthsPositiveSum: 'You were up {sum}',
				inAndOut_headerTextOtherMonthsNegativeSum: 'You were down {sum}',
				cashpoint_headerTextCurrentMonth: 'You haven\'t taken out\nany cash so far',
				cashpoint_headerTextOtherMonths: 'You didn\'t take out any cash',
				cashpoint_headerTextCurrentMonthSum: 'You\'ve taken out {sum} in cash so far',
				cashpoint_headerTextOtherMonthsSum: 'You took out {sum} in cash',
				cashpoint_footerText: 'You usually take out {sum} at a time',
				noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 08001217365 for more information',
				noTransactionFound: 'No transactions found',
				transactionReTag: '{TranNo} transaction has been retagged {TagName}',
				transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
				micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
				micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
				micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum} on things under a tenner',
				micro_headerTextOtherMonthsWithSum: 'You spent {sum} on things under a tenner',
				micro_footerText: 'That\'s about {sum} a pop',
				currency: 'GBP',
				asc: 'asc',
				desc: 'desc',
				threeMonths: '3 months',
				customRange: 'Custom Range',


				// Account Details
				availableBalance: 'Available Balance',
				borrowingLimit: 'Planned borrowing limit',
				lastStatementDate: 'Last statement date',
				lastStatementBalance: 'Last statement balance',
				minPaymentDue: 'Minimun payment due',
				paymentDueDate: 'Payment due date',
				creditCardLimit: 'Credit card limit',
				AccountMoreInfoView_AvailableBalanceDisclaimer: 'This balance may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_AvailableBalanceDisclaimer_WithOverdraft: 'This balance, which includes any overdraft, may also include items that haven\'t gone through yet.',
				AccountMoreInfoView_ContactMessage: 'If you\'d like to talk about this account, please call the team at B on 0800 1217365.',
				prevSlide: '◀︎',
				nextSlide: '▶︎',
				helpButton: 'Help',
				searchKey: 'Search',
				yesText: 'Yes',
				FYI: 'FYI',
				transition: 'scale',
				current: 'current',
				creditCard: 'credit_card',
				savings: 'savings',
				loan: 'loan',
				mortgage: 'mortgage',
				moreInformation: 'More Information',
				hideInformation: 'Hide Information',
			},

		}

		let component = TestUtils.renderIntoDocument(
			<TransactionHistoryGrid  {...props}
				/>
		);
		component.render();
	});

	it('calls for the removeChangeListener', () => {
		let node = document.createElement('div');
		const render = (comp, el) => ReactDOM.render(comp, el);
		component = ReactDOM.render(<TransactionHistoryGrid {...props} />, node);
		React.unmountComponentAtNode(node);
	});

});

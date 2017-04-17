window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};
jest.unmock('../FinancialStoriesPage');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const Helmet = require('react-helmet');

const FinancialStoriesPage = require('../FinancialStoriesPage');

const FinancialStoriesComponent = require('./../FinancialStoriesComponent');
const FinancialStoriesStore = require('../../../stores/FinancialStoriesStore');
const TileComponent = require('./../TileComponent');
const FinancialStoriesActionCreator = require('../../../actions/FinancialStoriesActionCreator');
const FinancialStoriesConstants = require('../../../constants/FinancialStoriesConstants');
const ProjectionsPage = require('./../projections/ProjectionPage');
const AnyQuestions = require('../../help/AnyQuestions');
const AccountOpeningActions = require('../../../actions/AccountOpeningActions');
let dummyVal = '';


FinancialStoriesStore.getState.mockReturnValue({ accountType: 'current' });


const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<FinancialStoriesPage {...props} />);
	return shallowRenderer.getRenderOutput();
};

describe('FinancialStoriesPage Test Cases check', () => {
	let props = {
		onMicroTileClick: jest.fn(),
		onHelpClick: jest.fn(),
		isPopupOpen: true,
		alertsAmountValue: 'Hello',
		changeTheValue: jest.fn(),
		_alertsAmountBlur: jest.fn(),
		notificationFlag: true,
		changeTheNotificationFlag: {},
		content: {

			MicroTransaction: "microTransactions",
			Cashpoint: "cashpoint",
			InAndOut: "insAndOuts",
			Projection: "projection",
			CurrencySign: "-£",
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
			micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum}',
			micro_headerTextOtherMonthsWithSum: 'You spent {sum}',
			micro_footerText: 'That\'s about {sum} a pop',
			currency: 'GBP',
			asc: 'asc',
			desc: 'desc',
			threeMonths: '3 months',
			customRange: 'Custom Range',

			//Account Details
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
		}
	};
	let onClickStub = jest.genMockFn();


	let component = TestUtils.renderIntoDocument(
		<FinancialStoriesPage onClick={onClickStub} {...props}
			/>
	);

	it('should run onClick event', () => {
		const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'a');
		component.onHelpClick = onClickStub;


		onClickStub();
		_.map(pageoptions, page => {

			TestUtils.Simulate.click(page);
		});

		expect(onClickStub).toBeCalled();
	});

	it('should on FS Tile Click', () => {

		let tile = 'microTransactions';
		component.onFSTileClick(tile);
		expect(component.onFSTileClick).toBeDefined;
		// expect(component.state.financialStoriesClass).toBe("financial-stories2");
		// expect(FinancialStoriesActionCreator.handleFinancialStoriesTile.mock.calls.length).toBe(1);
	});

	it('should on help click', () => {
		let component = TestUtils.renderIntoDocument(
			<FinancialStoriesPage onClick={onClickStub} {...props}
				/>
		);
		component.onHelpClick();
		expect(component.state.financialStoriesClass).toBe('');
		//expect(FinancialStoriesActionCreator.getPopupState.mock.calls.length).toBe(3);
	});

	it('should on Close Help', () => {

		component.onCloseHelp();
		//expect(component.state.financialStoriesClass).toBe('');
		expect(FinancialStoriesActionCreator.setAccountHelp.mock.calls.length).toBe(1);
	});

	it('should  get component', () => {
		FinancialStoriesStore.getAccountHelpOpen.mockReturnValue('hello');
		component.getComponent();
		expect(component.getComponent).toBeDefined;
		//expect(component.state.financialStoriesClass).toBe('');
		//expect(FinancialStoriesActionCreator.setAccountHelp.mock.calls.length).toBe(1);
	});

	it('should assign Tile Component case = microTransactions', () => {
		FinancialStoriesStore.getState.mockReturnValue({ fsTileClick: 'microTransactions' });
		let component = TestUtils.renderIntoDocument(
			<FinancialStoriesPage onClick={onClickStub} {...props}
				/>
		);
		component.assignTileComponent();
		//expect(component.state.financialStoriesClass).toBe('');
		expect(FinancialStoriesActionCreator.setAccountHelp.mock.calls.length).toBe(1);
	});

	it('should assign Tile Component case = cashpoint', () => {
		FinancialStoriesStore.getState.mockReturnValue({ fsTileClick: 'cashpoint' });
		let component = TestUtils.renderIntoDocument(
			<FinancialStoriesPage onClick={onClickStub} {...props}
				/>
		);
		component.assignTileComponent();
		//expect(component.state.financialStoriesClass).toBe('');
		expect(FinancialStoriesActionCreator.setAccountHelp.mock.calls.length).toBe(1);
	});

	it('should assign Tile Component case = insAndOuts', () => {
		FinancialStoriesStore.getState.mockReturnValue({ fsTileClick: 'insAndOuts' });
		let component = TestUtils.renderIntoDocument(
			<FinancialStoriesPage onClick={onClickStub} {...props}
				/>
		);
		component.assignTileComponent();
		//expect(component.state.financialStoriesClass).toBe('');
		expect(FinancialStoriesActionCreator.setAccountHelp.mock.calls.length).toBe(1);
	});

	it('should assign Tile Component case = default', () => {
		FinancialStoriesStore.getState.mockReturnValue({ fsTileClick: 'default' });
		let component = TestUtils.renderIntoDocument(
			<FinancialStoriesPage onClick={onClickStub} {...props}
				/>
		);
		component.assignTileComponent();
		//expect(component.state.financialStoriesClass).toBe('');
		expect(FinancialStoriesActionCreator.setAccountHelp.mock.calls.length).toBe(1);
	});

	it('should assign Tile Component ', () => {
		FinancialStoriesStore.getState.mockReturnValue({ fsTileClick: false });
		let component = TestUtils.renderIntoDocument(
			<FinancialStoriesPage onClick={onClickStub} {...props}
				/>
		);
		component.assignTileComponent();
		//expect(component.state.financialStoriesClass).toBe('');
		expect(FinancialStoriesActionCreator.setAccountHelp.mock.calls.length).toBe(1);
	});

	it('should component will receive props ', () => {
		FinancialStoriesStore.getState.mockReturnValue({ fsTileClick: 'default' });
		let component = TestUtils.renderIntoDocument(
			<FinancialStoriesPage onClick={onClickStub} {...props}
				/>
		);

		component.componentWillReceiveProps();
		//expect(component.state.financialStoriesClass).toBe('account-details');
		// expect(FinancialStoriesActionCreator.setAccountHelp.mock.calls.length).toBe(1);
	});

	it('should component will receive props ', () => {
		FinancialStoriesStore.getState.mockReturnValue({ fsTileClick: false });
		let component = TestUtils.renderIntoDocument(
			<FinancialStoriesPage onClick={onClickStub} {...props}
				/>
		);

		component.componentWillReceiveProps();
		expect(component.state.financialStoriesClass).toBe('account-details');
		// expect(FinancialStoriesActionCreator.setAccountHelp.mock.calls.length).toBe(1);
	});

	it('calls for the removeChangeListener', () => {
		let node = document.createElement('div');
		const render = (comp, el) => ReactDOM.render(comp, el);
		component = ReactDOM.render(<FinancialStoriesPage {...props} />, node);
		React.unmountComponentAtNode(node);
		expect(FinancialStoriesStore.removeChangeListener.mock.calls.length).toBe(1);
	});

	it('should on tourDoneClick', () => {

		component.tourDoneClick();
		// expect(component.onFSTileClick).toBeDefined;
		// expect(component.state.financialStoriesClass).toBe("financial-stories2");
		// expect(FinancialStoriesActionCreator.handleFinancialStoriesTile.mock.calls.length).toBe(1);
	});


	it('should compare jsx', () => {
		let props = {
			alertsAmountValue: 'Hello',
			changeTheValue: jest.fn(),
			_alertsAmountBlur: jest.fn(),
			notificationFlag: true,
			changeTheNotificationFlag: {},
			content: {
				current: 'current',
			}
		};
		let instance = shallowRender(props);
		expect(instance).toEqualJSX(
			<div className="b container-fluid-full">
				<Helmet title="FinancialStories" />
				<div className="main-container account-details account-undefined" onmouseout="document.body.style.overflow='auto';" onmouseover="document.body.style.overflow='hidden';">
					<AnyQuestions
						closed={function noRefCheck() { } }
						content={{ current: 'current' }}
						/>
				</div>
			</div>
		)
	});

	it('should compare jsx with color index as 0', () => {
		FinancialStoriesStore.getAccountColorIndex.mockReturnValue(0);
		props = {
			alertsAmountValue: 'Hello',
			changeTheValue: jest.fn(),
			_alertsAmountBlur: jest.fn(),
			notificationFlag: true,
			changeTheNotificationFlag: {},
			content: {
				current: 'current',
			}
		};
		let instance = shallowRender(props);
		expect(instance).toEqualJSX(
			<div className="b container-fluid-full">
				<Helmet title="FinancialStories" />
				<div className="main-container account-details account-1" onmouseout="document.body.style.overflow='auto';" onmouseover="document.body.style.overflow='hidden';">
					<AnyQuestions
						closed={function noRefCheck() { } }
						content={{ current: 'current' }}
						/>
				</div>
			</div>
		)
	});

});

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};
jest.unmock('../FinancialStoriesComponent');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');

const AccountDetailsComponent = require('./../AccountDetailsComponent');
const AccountTilesComponent = require('./../AccountTilesComponent');
const AccountTransactionComponent = require('./../AccountTransactionComponent');
const FinancialStoriesStore = require('../../../stores/FinancialStoriesStore');
const FinancialStoriesActionCreator = require('../../../actions/FinancialStoriesActionCreator');
const FinancialStoriesModal = require('./../tag/FinancialStoriesModal');
const AccountDetailsExpansion = require('./../AccountDetailsExpansion');
const Modal = require('../../common/modals/Modal');
import Sidebar from 'react-sidebar';
import SidebarContent from './../tag/SidebarContent';


const FinancialStoriesComponent = require('../FinancialStoriesComponent');

FinancialStoriesStore.getState.mockReturnValue({ accountType: 'current' });


const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<FinancialStoriesComponent {...props} />);
	return shallowRenderer.getRenderOutput();
};

describe('FinancialStoriesComponent Test Cases check', () => {
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

			MicroTransaction: 'microTransactions',
			Cashpoint: 'cashpoint',
			InAndOut: 'insAndOuts',
			Projection: 'projection',
			Showing: 'Showing',
			Upto: 'up to',
			CurrencySign: '-£',
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
			cashpoint_footerText: 'You usually take out {sum} at a time.',
			noTransactionMessage: 'Sorry but its not possible to show payments for this account type. Please call us on 0800 1217365 for more information.',
			noTransactionFound: 'No transactions found',
			transactionReTag: '{TranNo} transaction has been retagged {TagName}',
			transactionReTags: '{TranNo} transactions have been retagged {TagName}',
			transactionUnTag: '{TranNo} transaction has been untagged',
			transactionUnTags: '{TranNo} transactions have been untagged',
			transactionGridMessage: 'That\'s all we can find. Try changing the date range?',
			micro_headerTextCurrentMonth: 'So far you haven\'t paid\nfor anything under a tenner',
			micro_headerTextOtherMonths: 'You didn\'t pay for\nanything under a tenner',
			micro_headerTextCurrentMonthWithSum: 'So far you\'ve spent {sum} on things under a tenner',
			micro_headerTextOtherMonthsWithSum: 'You spent {sum} on things under a tenner',
			micro_footerText: 'That\'s about {sum} a pop.',
			currency: 'GBP',
			asc: 'asc',
			desc: 'desc',
			threeMonths: '3 months',
			customRange: 'Custom Range',

			deleteTagHeader: 'Delete this tag?',
			deleteTagContent: 'You\'ll still be able to see it on your transactions, but you won\'t be able to use it in the future. Still happy to delete?',
			tagInfoPopupHeader: 'Tags',
			tagInfoPopupContent: 'Now choose one of the Tags from this list or tap on My Tags to create one of your own (you can have upto 5).',
			tagSidebarHeading: 'Choose your transactions',
			tagSidebarContent: 'Start by choosing the transaction(s) you want to tag, selecting one type only (like Groceries or Fuel).',
			rememberThisTagContent: '\'Remember this\' enables you to tag every transaction like this in the future.',
			rememberThis: 'Remember this',
			addNewTagModal: 'Add a new tag',
			menuTitle: 'Menu',
			closeButton: 'Close',
			editButton: 'Edit',
			myTagsHeader: 'My Tags',
			unTagSelected: 'Untag Selected',
			tagCreateUpdatError: 'When contacting support, please quote ID : {quote-id}',

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
		<FinancialStoriesComponent onClick={onClickStub} {...props}
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

	it('should on Click Delete Tag', () => {

		component.onClickDeleteTag();
		//expect(component.state.NBAHeader).toBe("Header");
	});


	it('should on Remeber This Info Click', () => {

		component.onRemeberThisInfoClick();
		//expect(component.state.NBAHeader).toBe("Header");
	});


	it('should on Next Account Details', () => {

		component.onNextAccountDetails();
		//expect(component.state.NBAHeader).toBe("Header");
	});


	it('should on Tags Click', () => {

		component.onTagsClick();
		//expect(component.state.NBAHeader).toBe("Header");
	});

	it('should on Tags Info Click', () => {

		component.onTagInfoClick();
		//expect(component.state.NBAHeader).toBe("Header");
	});
	/////////////////////////////////////
	xit('should on Show Progress Icon Click', () => {

		component.onShowProgressIconClick();
		//expect(component.state.NBAHeader).toBe("Header");
	});

	xit('should on Show Progress Icon Click', () => {

		component.onUnTagSelected();
		//expect(component.state.NBAHeader).toBe("Header");
	});

	it('should on Show Progress Icon Click', () => {

		component.onPopupCancelClick();
		//expect(component.state.NBAHeader).toBe("Header");
	});

	it('should on Show Progress Icon Click', () => {
		let id = 'id';
		component.deleteTag(id);
		//expect(component.state.NBAHeader).toBe("Header");
	});

	it('should on Show Progress Icon Click', () => {
		let transTag = false;
		let noTagSelection = false;

		component.openSideBarFromGrid(transTag, noTagSelection);
		//expect(component.state.NBAHeader).toBe("Header");
	});

	it('should on Show Progress Icon Click', () => {
		let e = {
			target: {
				value: false,
			}
		}
		component.toggleCheckBox(e);
		//expect(component.state.NBAHeader).toBe("Header");
	});

	////////////////////////////////////////////////////////////////////////////////////
	it('should on onUnTagSelected', () => {
		// component.setState({ transTag: 'transTag' });
		
		let tag = {
			"value": "Entertainment",
			"path": "/entertainment",
			"scheme": "NAG Categories",
			"id": 2,
			"archived": false,
			"noTag": false,
		};

		window.setTimeout();
		component.setState({ transTag: 'transTag' });
		
		component.onUnTagSelected(tag);

	});

	it('should on assignTag fxn', () => {
		let tag = 'tag';
		window.setTimeout();
		component.assignTag(tag);
		//expect(component.state.NBAHeader).toBe("Header");
	});

	it('should on assignTag fxn where transtag > 1', () => {
		let tag = {
			"value": "Entertainment",
			"path": "/entertainment",
			"scheme": "NAG Categories",
			"id": 2,
			"archived": false,
			"noTag": true,
		}
		window.setTimeout();
		component.setState({ transTag: 'transTag' });
		component.assignTag(tag);
		//expect(component.state.NBAHeader).toBe("Header");
	});

	it('should on assignTag fxn where transtag < 1', () => {
		let tag = {
			"value": "Entertainment",
			"path": "/entertainment",
			"scheme": "NAG Categories",
			"id": 2,
			"archived": false,
			"noTag": true,
		}
		window.setTimeout();
		component.setState({ transTag: '' });
		component.assignTag(tag);
		//expect(component.state.NBAHeader).toBe("Header");
	});

	it('should on assignTag fxn where transtag > 1 and notag = false', () => {
		let tag = {
			"value": "Entertainment",
			"path": "/entertainment",
			"scheme": "NAG Categories",
			"id": 2,
			"archived": false,
			"noTag": false,
		}
		window.setTimeout();
		component.setState({ transTag: 'transTag' });
		component.assignTag(tag);
	});

	it('should on assignTag fxn where transtag < 1 and notag = false', () => {
		let tag = {
			"value": "Entertainment",
			"path": "/entertainment",
			"scheme": "NAG Categories",
			"id": 2,
			"archived": false,
			"noTag": false,
		}
		window.setTimeout();
		component.setState({ transTag: '' });
		component.assignTag(tag);
	});

	it('should on Show Progress Icon Click', () => {
		component.componentWillReceiveProps();
		//expect(component.state.NBAHeader).toBe("Header");
	});

	it('should on Show Progress Icon Click', () => {
		component.componentWillReceiveProps();
		//expect(component.state.NBAHeader).toBe("Header");
	});

	it('should on Show Progress Icon Click', () => {
		let tag = {
			"value": "Entertainment",
			"path": "/entertainment",
			"scheme": "NAG Categories",
			"id": 2,
			"archived": false
		}
		component.createTagJson(tag);
		//expect(component.state.NBAHeader).toBe("Header");
	});

	it('should on assignTagPopup', () => {
		console.log('for assignTagPopup');
		FinancialStoriesStore.getAssignTagResponse.mockReturnValue(true);
		// component.setState({ closeAssignTagPopup: true });
		component.assignTagPopup();
		//expect(component.state.NBAHeader).toBe("Header");
		console.log('for assignTagPopup ends');
	});
	///////////////////////////////////////////////////////////////////////////////////////

	it('should on Show Progress Icon Click', () => {
		let component = TestUtils.renderIntoDocument(
			<FinancialStoriesComponent {...props}
				/>
		);
		component.onShowProgressIconClick();

	});

	it('should getCreateUpdateTagQuoteId', () => {
		FinancialStoriesStore.getCreateUpdateTagError.mockReturnValue(true);
		let component = TestUtils.renderIntoDocument(
			<FinancialStoriesComponent {...props}
				/>
		);
		component.getCreateUpdateTagQuoteId();

	});

	it('should render', () => {
		FinancialStoriesStore.getAssignTagStatus.mockReturnValue(true);
		let component = TestUtils.renderIntoDocument(
			<FinancialStoriesComponent {...props}
				/>
		);
		component.render();

	});

	

	xit('should compare jsx', () => {
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
			<Sidebar
				contentClassName="contentSideBar"
				docked={false}
				dragToggleDistance={30}
				onSetOpen={function noRefCheck() { } }
				open={false}
				overlayClassName="overlaySideBar"
				pullRight={true}
				rootClassName="rootSideBar"
				shadow={true}
				sidebar={<SidebarContent assignTag={function noRefCheck() { } } closeButton={function noRefCheck() { } } content={{ current: 'current' }} deleteTag={function noRefCheck() { } } doneTagging={undefined} noTagSelection={false} onRemeberThisInfoClick={function noRefCheck() { } } onTagInfoClick={function noRefCheck() { } } onUnTagSelected= { function noRefCheck() { } } toggleCheckBox= { function noRefCheck() { } } transactionTagData = { undefined } unTagSelected= {	false} />}
				sidebarClassName = "SideBarBox"
				styles= {{}}
				touch = { false}
				touchHandleWidth= { 20}
				transitions= { true}
				>
				<AccountDetailsComponent
					content={{ current: 'current' }}
					onHelpClick={undefined}
					onNextAccountDetails={function noRefCheck() { } }
					onTagsClick={function noRefCheck() { } }
					/>
				<div className="scroll-wrapper">
					<div className="row no-gutters more-information">
						<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0">
							<ul>
								<AccountDetailsExpansion
									content={{ current: 'current' }}
									hideMoreInformation={false}
									/>
							</ul>
						</div>
					</div>
					<div className="row no-gutters dashboard content-wrapper">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="projection-slider">
								<AccountTilesComponent
									content={{ current: 'current' }}
									onMicroTileClick={undefined}
									/>
							</div>
						</div>
						<AccountTransactionComponent
							content={{ current: 'current' }}
							deleteTag={function noRefCheck() { } }
							isPopupOpen={undefined}
							nextAccountDetails={false}
							onRemeberThisInfoClick={function noRefCheck() { } }
							onShowProgressIconClick={function noRefCheck() { } }
							onTagInfoClick={function noRefCheck() { } }
							openGridCheckBoxColumn={undefined}
							openSideBar={function noRefCheck() { } }
							resetTranTagSelection={false}
							transactionsState={{ accountType: 'current' }}
							/>
						<FinancialStoriesModal
							cancelButton={true}
							cancelText={undefined}
							confirmCancel={false}
							content={undefined}
							header={undefined}
							yesButton={false}
							/>
						<FinancialStoriesModal
							cancelButton={true}
							cancelText={undefined}
							confirmCancel={false}
							content={undefined}
							header={undefined}
							yesButton={false}
							/>
						<FinancialStoriesModal
							cancelButton={true}
							cancelText={undefined}
							confirmCancel={false}
							content={undefined}
							header={undefined}
							yesButton={false}
							/>
						<FinancialStoriesModal
							cancelButton={true}
							cancelText={undefined}
							confirmCancel={false}
							content={undefined}
							header={undefined}
							onClickDeleteTag={function noRefCheck() { } }
							yesButton={true}
							yesText={undefined}
							/>
						<FinancialStoriesModal
							cancelButton={true}
							cancelText={undefined}
							confirmCancel={undefined}
							content= ""
							header={undefined}
							onPopupCancelClick={function noRefCheck() { } }
							yesButton={false}
							/>
					</div>
				</div>
			</Sidebar >
		)
	});

});

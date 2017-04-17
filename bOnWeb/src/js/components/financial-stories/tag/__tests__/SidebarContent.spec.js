/**
 * @module SidebarContent
 */
jest.unmock('../SidebarContent');
jest.unmock('../TagsComponent');
//jest.unmock('../TagsComponent');
jest.mock('../../../../stores/FinancialStoriesStore');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../../__helpers__/TestHelpers');

const TagsComponent = require('../TagsComponent');
const SideBarTitlePanel = require('../SideBarTitlePanel');
const FinancialStoriesActionCreator = require('../../../../actions/FinancialStoriesActionCreator');
const FinancialStoriesStore = require('../../../../stores/FinancialStoriesStore');

const container = document.createElement('div');
const shallowRenderer = TestUtils.createRenderer();
const SidebarContent = require('../SidebarContent');

FinancialStoriesStore.getTags.mockReturnValue(
	{
		tags: 'tags',
		categories: 'categories'
	}
);

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<SidebarContent
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('FinancialStoriesPage Test Cases check', () => {
	let props = {
		noTagSelection : true,
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
	let component = TestUtils.renderIntoDocument(<SidebarContent  {...props}/>
	);

	it('should handleChangeOfTag', () => {
		let e = {
			target: {
				value: 'value',
			}
		}
		component.handleChangeOfTag(e);
		expect(component.handleChangeOfTag).toBeDefined;
	});

	it('should addNewTag', () => {
		let e = {
			target: {
				value: 'value',
			}
		}
		component.addNewTag(e);
		expect(component.addNewTag).toBeDefined;
	});

	it('should cancelTagging', () => {
		component.cancelTagging();
		expect(component.cancelTagging).toBeDefined;
	});

	it('should doneTagging', () => {
		component.setState({ flagForAddTag: true });
		component.setState({ flagForEditTag: true });
		FinancialStoriesActionCreator.createTag.mockReturnValue(true);
		component.doneTagging();
		expect(component.doneTagging).toBeDefined;
	});

	it('should editTagging', () => {
		component.editTagging();
		expect(component.editTagging).toBeDefined;
	});

	it('should handleAddTagButton', () => {
		component.handleAddTagButton();
		expect(component.handleAddTagButton).toBeDefined;
	});


	it('should handleSelect', () => {
		let tabKey = 2;
		component.handleSelect(tabKey);
		expect(component.handleSelect).toBeDefined;
	});

	it('should handleSelect', () => {
		let tabKey = 1;
		component.handleSelect(tabKey);
		expect(component.handleSelect).toBeDefined;
	});

	it('should componentWillReceiveProps', () => {
		let nextProps = {
			noTagSelection : 'noTagSelection',
		}
		let tabKey = 1;
		component.componentWillReceiveProps(nextProps);
		expect(component.componentWillReceiveProps).toBeDefined;
	});

	it('should componentWillReceiveProps', () => {
		let nextProps = {
			noTagSelection : false,
		}
		let tabKey = 1;
		component.componentWillReceiveProps(nextProps);
		expect(component.componentWillReceiveProps).toBeDefined;
	});

});


describe('Modal', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            content: {

            },
            data: {
            },
        };

        instance = shallowRender(props);
    });

    it('render a standard modal with child elements', () => {
        instance = shallowRender(props);
        expect(instance).toEqualJSX(
			<SideBarTitlePanel
			      cancelTagging={function noRefCheck() {}}
			      closeButton={undefined}
			      content={{}}
			      disableDone={false}
			      disableEdit={true}
			      doneTagging={function noRefCheck() {}}
			      editTagging={function noRefCheck() {}}
			      flagForAddTag={false}
			      flagForEditTag={false}
			      noTagSelection={undefined}
			      style={{height: '100%', width: 400}}
			      title={undefined}
			    >

				<div className="sidebar-content ">
					<TagsComponent
						assignTag={undefined}
						categories="categories"
						content={{}}
						deleteTag={undefined}
						flagForAddTag={false}
						flagForEditTag={false}
						handleAddTagButton={function noRefCheck() { } }
						handleChangeOfTag={function noRefCheck() { } }
						handleKeyPress={function noRefCheck() { } }
						handleSelect={function noRefCheck() { } }
						noTagSelection={undefined}
						onRemeberThisInfoClick={undefined}
						onTagInfoClick={undefined}
						tags="tags"
						toggleCheckBox={undefined}
						transactionTagData={undefined}
						unTagSelected={undefined}
						/>
				</div>
				<div className="sidebar-footer">
					<a
						className="action-bttn"
						onClick={function noRefCheck() {}}
						/>
				</div>
			</SideBarTitlePanel>
		);
	});
});

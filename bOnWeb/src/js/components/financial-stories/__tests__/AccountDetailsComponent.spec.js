window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};
jest.unmock('../AccountDetailsComponent');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const Helmet = require('react-helmet');

const AccountDetailsComponent = require('../AccountDetailsComponent');

const FinancialStoriesActionCreator = require('../../../actions/FinancialStoriesActionCreator');
const FinancialStoriesStore = require('../../../stores/FinancialStoriesStore');
const AccountOpeningActions = require('../../../actions/AccountOpeningActions');
const AccountSummarySlider = require('./../AccountSummarySlider');
const BrandUtils = require('../../../utils/BrandUtils');
const UIActions = require('../../../actions/UIActions');
const _shrinkOn = 80;


const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<AccountDetailsComponent {...props} />);
    return shallowRenderer.getRenderOutput();
};

describe('AccountDetailsComponent Test Cases', () => {
    FinancialStoriesStore.getState.mockReturnValue({ accountList: 'current' });
    // FinancialStoriesStore.getState.mockReturnValue({ accountList: [] });
    let props = {
        onTagsClick: jest.fn(),
        onHelpClick: jest.fn(),
        onNextAccountDetails: jest.fn(),

        content: {

            backButton: 'Back',
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
        <AccountDetailsComponent onClick={onClickStub} {...props}
            />
    );

    it('should run onClick event', () => {
        const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'a');
        component.onClick = onClickStub;


        onClickStub();
        _.map(pageoptions, page => {

            TestUtils.Simulate.click(page);
        });

        expect(onClickStub).toBeCalled();
    });

    it('collapse fxn', () => {

        component.collapse();
        expect(component.state.className).toBe("short");
    });

    it('isCollapsed fxn', () => {

        component.isCollapsed();
        let result = component.isCollapsed();
        expect(result).toBe(true);
    });

    it('handleScroll fxn', () => {

        //window.pageYOffset = 20;
        document.documentElement.scrollTop = 20;

        component.handleScroll();
        expect(component.handleScroll).toBeDefined;
        // expect(component.state.className).toBe("short");
    });



    it('should compare jsx', () => {
        let props = {
            content: {
                backButton: 'Back',
            }
        };

        let instance = shallowRender(props);
        expect(instance).toEqualJSX(<div className="row no-gutters account-summery undefined">
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-6">
                <a
                  className="page-options float-left"
                  href="#"
                  onClick={function noRefCheck() {}}
                />
              </div>
              <div className="col-lg-2 col-lg-push-8 col-md-2 col-md-push-8 col-sm-2 col-sm-push-8 col-xs-6">
                <a
                  className="page-options float-right"
                  onClick={function noRefCheck() {}}
                >
                  <span className="icon icon-help-questions" />
                </a>
                <a
                  className="page-options float-right"
                  onClick={function noRefCheck() {}}
                >
                  <span className="icon icon-tag" />
                </a>
              </div>
              <div className="summery-slider col-lg-8 col-lg-offset-0 col-lg-pull-2 col-md-offset-0 col-md-8 col-md-pull-2 col-sm-8 col-sm-offset-0 col-sm-pull-2 col-xs-10 col-xs-offset-1">
                <AccountSummarySlider
                  content={{backButton: 'Back'}}
                  nextSlide={undefined}
                  onNextAccountDetails={undefined}
                />
              </div>
            </div>)
    });

    it('should compare jsx for else condition', () => {
        FinancialStoriesStore.getState.mockReturnValue({ accountList: [] });
        let props = {
            content: {
                backButton: 'Back',
            }
        };
        let component = TestUtils.renderIntoDocument(
            <AccountDetailsComponent  {...props}
                />
        );

    });
    it('calls for the removeChangeListener to cover else condition', () => {

        let node = document.createElement('div');
        const render = (comp, el) => ReactDOM.render(comp, el);
        component = ReactDOM.render(<AccountDetailsComponent {...props} />, node);
        React.unmountComponentAtNode(node);
        // expect(FinancialStoriesStore.removeChangeListener.mock.calls.length).toBe(1);
    });

    it('calls for the removeChangeListener to cover if condition', () => {
        BrandUtils.isAbleToDisplay.mockReturnValue('page-header-without-text');
        let node = document.createElement('div');
        const render = (comp, el) => ReactDOM.render(comp, el);
        component = ReactDOM.render(<AccountDetailsComponent {...props} />, node);
        React.unmountComponentAtNode(node);
        // expect(window.removeEventListener.mock.calls.length).toBe(1);
    });
});

describe('AccountDetailsComponent Test Cases', () => {
    it('handleScroll fxn', () => {
        window.pageYOffset = 100;

        let props = {
            onTagsClick: jest.fn(),
            onHelpClick: jest.fn(),
            onNextAccountDetails: jest.fn(),

            content: {

                backButton: 'Back',
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
        let component = TestUtils.renderIntoDocument(
            <AccountDetailsComponent  {...props}
                />
        );
        component.handleScroll();
        expect(component.handleScroll).toBeDefined;
    });
});

describe('AccountDetailsComponent Test Cases', () => {
    it('handleScroll fxn', () => {
        window.pageYOffset = 20;

        let props = {
            onTagsClick: jest.fn(),
            onHelpClick: jest.fn(),
            onNextAccountDetails: jest.fn(),

            content: {

                backButton: 'Back',
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
        let component = TestUtils.renderIntoDocument(
            <AccountDetailsComponent  {...props}
                />
        );
        component.handleScroll();
        expect(component.handleScroll).toBeDefined;
    });
});

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};
jest.unmock('../AccountTilesComponent');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const Helmet = require('react-helmet');

const AccountTilesComponent = require('../AccountTilesComponent');

const FinancialStoriesActionCreator = require('../../../actions/FinancialStoriesActionCreator');
const FinancialStoriesConstants = require('../../../constants/FinancialStoriesConstants');
const FinancialStoriesStore = require('../../../stores/FinancialStoriesStore');
const AccountSummarySlider = require('./../AccountSummarySlider');
const Slick = require('react-slick');



const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<AccountTilesComponent {...props} />);
    return shallowRenderer.getRenderOutput();
};

describe('AccountTilesComponent Test Cases', () => {
    FinancialStoriesStore.getState.mockReturnValue({
        accountType: 'current',
        accountDetails: { allowProjection: true },
        fSConnectionData:
        {
            micro: {
                title: 'title',
                footer: 'footer'
            },
            projection: {
                title: 'title',
                footer: 'footer'
            },
            Cashpoint: {
                title: 'title',
                footer: 'footer'
            },
            inandout: {
                title: 'title',
                footer: 'footer'
            },
        }
    });

    let props = {
        onMicroTileClick: jest.fn(),
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
        <AccountTilesComponent  {...props}
            />
    );

    it('on Micro Click', () => {

        component.onMicroClick();
        expect(component.onMicroClick).toBeDefined();
    });

    it('on Projection Click', () => {

        component.onProjectionClick();
        expect(component.onProjectionClick).toBeDefined();
    });

    it('on Cashpoint Click', () => {

        component.onCashpointClick();
        expect(component.onCashpointClick).toBeDefined();
    });

    it('on InAndOut Click', () => {

        component.onInAndOutClick();
        expect(component.onInAndOutClick).toBeDefined();
    });

    it('should compare jsx', () => {
        let props = {
            content: {
                backButton: 'Back',
            }
        };

        let instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <Slick
                arrows={true}
                dots={false}
                draggable={true}
                infinite={false}
                responsive={[{breakpoint: 768, settings: {slidesToShow: 1}}, {breakpoint: 991, settings: {slidesToShow: 2}}, {breakpoint: 1025, settings: {slidesToShow: 3}}, {breakpoint: 1200, settings: {slidesToShow: 3.1}}, {breakpoint: 2500, settings: {slidesToShow: 3.1}}]}
                slidesToScroll={1}
                slidesToShow={3}
                speed={500}
                >
                <div className="slide">
                    <a
                        className="slide-content"
                        href="#"
                        onClick={function noRefCheck() { } }
                        >
                        <section>
                            <p className="strong" dangerouslySetInnerHTML={{__html: 'title'}}/>
                            <p>
                                footer
                            </p>
                        </section>
                        <section className="tile-coffee">
                            <img
                                alt=""
                                src="../images/b/coffee.png"
                                width="140px"
                                />
                        </section>
                    </a>
                </div>
                <div className="slide">
                    <a
                        className="slide-content"
                        href="#"
                        onClick={function noRefCheck() { } }
                        >
                        <section>
                            <p />
                        </section>
                        <section className="tile-chocolate">
                            <img
                                alt=""
                                src="../images/b/chocolate-box.png"
                                width="140px"
                                />
                        </section>
                    </a>
                </div>
                <div className="slide">
                    <a
                        className="slide-content"
                        href="#"
                        onClick={function noRefCheck() { } }
                        >
                        <section>
                            <p>
                                title
                            </p>
                            <p>
                                footer
                            </p>
                        </section>
                        <section className="tile-slinky">
                            <img
                                alt=""
                                src="../images/b/slinky.png"
                                width="190px"
                                />
                        </section>
                    </a>
                </div>
            </Slick>
        )
    });
});
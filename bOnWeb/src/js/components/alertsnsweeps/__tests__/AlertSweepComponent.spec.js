jest.unmock('../AlertSweepComponent');
// jest.unmock('../NewUserAlertSweepComponent');

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const CreateAlert = require('../CreateAlert');
const CreateSweep = require('../CreateSweep');
const EditSweep = require('../EditSweep');
const EditAlert = require('../EditAlert');
const AlertSweepsOverlay = require('../AlertSweepsOverlay');
const EditProjection = require('../EditProjection');
const AlertsNSweepsStore = require('../../../stores/AlertsNSweepsStore');
const AlertSweepModal = require('../AlertSweepModal');
const SweepsStores = require('../../../stores/SweepsStores');
const ProjectionsStore = require('../../../stores/ProjectionsStore');
const AlertsStore = require('../../../stores/AlertsStore');
const AlertSweepInformation = require('../AlertSweepInformation');
const AlertsNSweepsActionCreator = require('../../../actions/AlertsNSweepsActionCreator');
const NewUserAlertSweepComponent = require('../NewUserAlertSweepComponent');
const NumberUtils = require('../../../utils/NumberUtils');

const AlertSweepComponent = require('../AlertSweepComponent');

const ALERT_MODEL = 'alertModal';
const SWEEP_MODEL = 'sweepModal';
const ALERT = 'alert';
const SWEEP = 'sweep';


//AlertsNSweepsStore.getAlertsList.mockReturnValue({hello : [{hello : 'hello'},{hello : 'hello'}]});

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<AlertSweepComponent
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('AlertSweepComponent Test Cases check', () => {
    let props = {
        setCss: jest.fn(),
        onMicroTileClick: jest.fn(),
        onHelpClick: jest.fn(),
        isPopupOpen: true,
        alertsAmountValue: 'Hello',
        changeTheValue: jest.fn(),
        _alertsAmountBlur: jest.fn(),
        notificationFlag: true,
        changeTheNotificationFlag: {},
        content: {
            // Alerts&Sweeps page

            //	triggerDashboardViewController_Failure_Details_Text: 'We were unable to load your alerts at this time. Please try again later',
            //	failedToLoadSweeps: 'We were unable to load your sweeps at this time. Please try again later',
            //	failedTpLoadAlertsNSweeps: 'We were unable to load your alerts or sweeps at this time. Please try again later',
            triggerDashboardViewController_NoEligibleAccounts_Title: 'No available accounts', // not used
            triggerDashboardViewController_NoEligibleAccounts_Alerts: 'To use alerts, you need to open an account which supports them.', // not used
            triggerDashboardViewController_NoEligibleAccounts_Sweeps: 'To use sweeps, you need to open an account which supports them.', // not used
            triggerDashboardViewController_NoEligibleAccounts_AlertsSweeps: 'To use alerts or sweeps, you need to open an account which supports them.', // not used
            triggerDashboardViewController_NoEligibleAccounts_ButtonTitle: 'Retry', // not used
            triggerDashboardViewController_CantCreateTrigger_Title: 'Server unavailable', // to ask
            triggerDashboardViewController_CantCreateTriggerAlert_Message: 'Can’t create any alert', // to ask
            triggerDashboardViewController_CantCreateTriggerSweep_Message: 'Can’t create any sweep', // to ask
            triggerEntryViewController_ThresholdAmount_Minimum_Error_Message: 'Threshold amount has to be at least 0 pounds.', // to ask
            triggerEntryViewController_TargetAmount_Minimum_Error_Message: 'Target amount has to be at least 100 pounds.', // to ask
            triggerEntryViewController_TargetAmount_Error_Message: 'Target amount has to be at least 100 pounds larger than the threshold amount.',
            triggerListCell_lowerThresholdAlert_Title_Prefix: 'Low balance alert',
            triggerListCell_projectionThresholdAlert_Title_Prefix: 'Projection balance alert', // differ
            triggerListCell_upperThresholdAlert_Title_Prefix: 'High balance alert',
            triggerEntryViewController_ending: 'ending',
            projectionLowBalanceAlert: 'Projection balance alert', // removed low word
            sweepAlert: 'Sweep Alert',
            jointAccountHolders: 'Joint Account Holders',
            confirmChanges: 'Confirm changes',
            alertsSweepsHead: 'Alerts & sweeps',
            alertMessage: 'Set up alerts to receive text messages when you reach a certain amount on your chosen account.',
            sweepMessage: 'Set up sweeps to be notified when your threshold is reached and select the account you want your money to be swept from to meet your target balance.',
            alerts: 'Alerts',
            errorMessage: 'Something techie has gone wrong. Please try again.',
            cancelButton: 'Cancel',
            confirmButton: 'Confirm',
            backButton: 'Back',
            infoButton: 'Info',
            deleteButton: 'Delete',
            createSweep: 'Create Sweep',
            editSweep: 'Edit Sweep',
            createAlert: 'Create Alert',
            deleteContent: 'Are you sure you want to delete this sweep',
            AlertSweep: 'Alert and sweep.',
            SweepDelete: 'Are you sure you want to delete this sweep',
            footerLabelSweep: 'Just so you know, you might still get one more balance sweep from us',
            footerLabelAlert: 'Just so you know, you might still get one more balance alert from us',
            footerLabelJointAccountHolder: 'The sweep was set up by your joint account holder.You can’t edit it,but you can give them a nudge to do it',
            maxSweepPopupHeader: 'An alert about your sweeps',
            maxSweepPopupData: 'You can only have one low balance sweep per account.But you can edit your existing sweeps.',
            failedToLoadAlerts: 'We were unable to load your alerts at this time.',
            failedToLoadSweeps: 'We were unable to load your sweeps at this time.',
            failedTpLoadAlertsNSweeps: 'We were unable to load your alerts or sweeps at this time.',

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
        <AlertSweepComponent onClick={onClickStub} {...props}
            />
    );
    xit('should compare jsx', () => {
        AlertsNSweepsStore.getAlertsList.mockReturnValue({
            "alert": [
                {
                    "lower_threshold": {
                        "enabled": true,
                        "amount": {
                            "value": 20.0,
                            "currency": "GBP"
                        }
                    }
                },
                {
                    "lower_threshold": {
                        "enabled": true,
                        "amount": {
                            "value": 20.0,
                            "currency": "GBP"
                        }
                    }
                }
            ]
        });
        AlertsNSweepsStore.getSweepsList.mockReturnValue({
            "alert": [
                {
                    "lower_threshold": {
                        "enabled": true,
                        "amount": {
                            "value": 20.0,
                            "currency": "GBP"
                        }
                    }
                },
                {
                    "lower_threshold": {
                        "enabled": true,
                        "amount": {
                            "value": 20.0,
                            "currency": "GBP"
                        }
                    }
                }
            ]
        });
        AlertsNSweepsStore.getProjectionAlertsList.mockReturnValue({
            "alert": [
                {
                    "lower_threshold": {
                        "enabled": true,
                        "amount": {
                            "value": 20.0,
                            "currency": "GBP"
                        }
                    }
                },
                {
                    "lower_threshold": {
                        "enabled": true,
                        "amount": {
                            "value": 20.0,
                            "currency": "GBP"
                        }
                    }
                }
            ]
        });
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
        console.log("asd", AlertsNSweepsStore.getAlertsList().alert.length)
        expect(instance).toEqualJSX(
            <div></div>
        )
    });
});

describe('FinancialStoriesPage Test Cases check', () => {
    AlertsNSweepsStore.getAlertsList.mockReturnValue({
        "alert": [
            {
                "lower_threshold": {
                    "enabled": true,
                    "amount": {
                        "value": 20.0,
                        "currency": "GBP"
                    }
                }
            },
            {
                "lower_threshold": {
                    "enabled": true,
                    "amount": {
                        "value": 20.0,
                        "currency": "GBP"
                    }
                }
            }
        ]
    });
    AlertsNSweepsStore.getSweepsList.mockReturnValue({
        "alert": [
            {
                "lower_threshold": {
                    "enabled": true,
                    "amount": {
                        "value": 20.0,
                        "currency": "GBP"
                    }
                }
            },
            {
                "lower_threshold": {
                    "enabled": true,
                    "amount": {
                        "value": 20.0,
                        "currency": "GBP"
                    }
                }
            }
        ]
    });
    AlertsNSweepsStore.getProjectionAlertsList.mockReturnValue({
        "alert": [
            {
                "lower_threshold": {
                    "enabled": true,
                    "amount": {
                        "value": 20.0,
                        "currency": "GBP"
                    }
                }
            },
            {
                "lower_threshold": {
                    "enabled": true,
                    "amount": {
                        "value": 20.0,
                        "currency": "GBP"
                    }
                }
            }
        ]
    });


    let props = {
        backSweep: jest.fn(),
        onClose: jest.fn(),
        setCss: jest.fn(),
        onMicroTileClick: jest.fn(),
        onHelpClick: jest.fn(),
        isPopupOpen: true,
        alertsAmountValue: 'Hello',
        changeTheValue: jest.fn(),
        _alertsAmountBlur: jest.fn(),
        notificationFlag: true,
        changeTheNotificationFlag: {},
        content: {

            alertsSweepsHead: 'Alerts & sweeps',
            alertMessage: 'Set up alerts to receive text messages when you reach a certain amount on your chosen account.',
            sweepMessage: 'Set up sweeps to be notified when your threshold is reached and select the account you want your money to be swept from to meet your target balance.',
            alerts: 'Alerts',
            errorMessage: 'Something techie has gone wrong. Please try again.',
            cancelButton: 'Cancel',
            confirmButton: 'Confirm',
            backButton: 'Back',
            infoButton: 'Info',
            deleteButton: 'Delete',
            createSweep: 'Create Sweep',
            editSweep: 'Edit Sweep',
            createAlert: 'Create Alert',
            deleteContent: 'Are you sure you want to delete this sweep',
            AlertSweep: 'Alert and sweep.',
            SweepDelete: 'Are you sure you want to delete this sweep',
            footerLabelSweep: 'Just so you know, you might still get one more balance sweep from us',
            footerLabelAlert: 'Just so you know, you might still get one more balance alert from us',
            footerLabelJointAccountHolder: 'The sweep was set up by your joint account holder.You can’t edit it,but you can give them a nudge to do it',
            maxSweepPopupHeader: 'An alert about your sweeps',
            maxSweepPopupData: 'You can only have one low balance sweep per account.But you can edit your existing sweeps.',
            failedToLoadAlerts: 'We were unable to load your alerts at this time.',
            failedToLoadSweeps: 'We were unable to load your sweeps at this time.',
            failedTpLoadAlertsNSweeps: 'We were unable to load your alerts or sweeps at this time.',

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
        <AlertSweepComponent onClick={onClickStub} {...props}
            />
    );

    it('should run applyFormatting', () => {
        let value = NumberUtils.decimalFormat('-12-3', 3, false);
        console.log('value ' + String(value).indexOf('-'));
        component.applyFormatting(value);
        // expect(component.state.name).toBe('someTechnicalError');
    });

    it('should run applyFormatting where value in string', () => {
        let value = '-123.12';
        component.applyFormatting(value);
        expect(component.applyFormatting).toBeDefined;
    });

    it('should run toggleClick', () => {
        let type = 'SWEEP';
        let isChecked = false;
        let name = 'name'
        component.toggleClick(type, name, isChecked);
        expect(component.applyFormatting).toBeDefined;
    });

    it('should run toggleClick where isChecked = true', () => {
        let type = 'SWEEP';
        let isChecked = true;
        let name = 'name'
        component.toggleClick(type, name, isChecked);
        expect(component.toggleClick).toBeDefined;
    });

    it('should run toggleClick whre AlertsNSweepsStore.isJointAccount = true', () => {
        let type = 'sweep';
        let isChecked = false;
        let name = 'name'
        AlertsNSweepsStore.isJointAccount.mockReturnValue(true);

        component.toggleClick(type, name, isChecked);
        expect(component.applyFormatting).toBeDefined;
    });
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////
    describe('should run showToggleOfMessage', () => {

        let props = {
            setCss: jest.fn(),
            onMicroTileClick: jest.fn(),
            onHelpClick: jest.fn(),
            isPopupOpen: true,
            alertsAmountValue: 'Hello',
            changeTheValue: jest.fn(),
            _alertsAmountBlur: jest.fn(),
            notificationFlag: true,
            changeTheNotificationFlag: {},
            content: {
                // Alerts&Sweeps page

                //	triggerDashboardViewController_Failure_Details_Text: 'We were unable to load your alerts at this time. Please try again later',
                //	failedToLoadSweeps: 'We were unable to load your sweeps at this time. Please try again later',
                //	failedTpLoadAlertsNSweeps: 'We were unable to load your alerts or sweeps at this time. Please try again later',
                triggerDashboardViewController_NoEligibleAccounts_Title: 'No available accounts', // not used
                triggerDashboardViewController_NoEligibleAccounts_Alerts: 'To use alerts, you need to open an account which supports them.', // not used
                triggerDashboardViewController_NoEligibleAccounts_Sweeps: 'To use sweeps, you need to open an account which supports them.', // not used
                triggerDashboardViewController_NoEligibleAccounts_AlertsSweeps: 'To use alerts or sweeps, you need to open an account which supports them.', // not used
                triggerDashboardViewController_NoEligibleAccounts_ButtonTitle: 'Retry', // not used
                triggerDashboardViewController_CantCreateTrigger_Title: 'Server unavailable', // to ask
                triggerDashboardViewController_CantCreateTriggerAlert_Message: 'Can’t create any alert', // to ask
                triggerDashboardViewController_CantCreateTriggerSweep_Message: 'Can’t create any sweep', // to ask
                triggerEntryViewController_ThresholdAmount_Minimum_Error_Message: 'Threshold amount has to be at least 0 pounds.', // to ask
                triggerEntryViewController_TargetAmount_Minimum_Error_Message: 'Target amount has to be at least 100 pounds.', // to ask
                triggerEntryViewController_TargetAmount_Error_Message: 'Target amount has to be at least 100 pounds larger than the threshold amount.',
                triggerListCell_lowerThresholdAlert_Title_Prefix: 'Low balance alert',
                triggerListCell_projectionThresholdAlert_Title_Prefix: 'Projection balance alert', // differ
                triggerListCell_upperThresholdAlert_Title_Prefix: 'High balance alert',
                triggerEntryViewController_ending: 'ending',
                projectionLowBalanceAlert: 'Projection balance alert', // removed low word
                sweepAlert: 'Sweep Alert',
                jointAccountHolders: 'Joint Account Holders',
                confirmChanges: 'Confirm changes',
                alertsSweepsHead: 'Alerts & sweeps',
                alertMessage: 'Set up alerts to receive text messages when you reach a certain amount on your chosen account.',
                sweepMessage: 'Set up sweeps to be notified when your threshold is reached and select the account you want your money to be swept from to meet your target balance.',
                alerts: 'Alerts',
                errorMessage: 'Something techie has gone wrong. Please try again.',
                cancelButton: 'Cancel',
                confirmButton: 'Confirm',
                backButton: 'Back',
                infoButton: 'Info',
                deleteButton: 'Delete',
                createSweep: 'Create Sweep',
                editSweep: 'Edit Sweep',
                createAlert: 'Create Alert',
                deleteContent: 'Are you sure you want to delete this sweep',
                AlertSweep: 'Alert and sweep.',
                SweepDelete: 'Are you sure you want to delete this sweep',
                footerLabelSweep: 'Just so you know, you might still get one more balance sweep from us',
                footerLabelAlert: 'Just so you know, you might still get one more balance alert from us',
                footerLabelJointAccountHolder: 'The sweep was set up by your joint account holder.You can’t edit it,but you can give them a nudge to do it',
                maxSweepPopupHeader: 'An alert about your sweeps',
                maxSweepPopupData: 'You can only have one low balance sweep per account.But you can edit your existing sweeps.',
                failedToLoadAlerts: 'We were unable to load your alerts at this time.',
                failedToLoadSweeps: 'We were unable to load your sweeps at this time.',
                failedTpLoadAlertsNSweeps: 'We were unable to load your alerts or sweeps at this time.',

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
            <AlertSweepComponent {...props}
                />
        );
        it('should run showToggleOfMessage where alertName = Sweep Alert', () => {
            component.setState({ showToggleOfMessage: true });
            component.setState({ alertName: 'Sweep Alert' });
            component.showToggleOfMessage();
            expect(component.showToggleOfMessage).toBeDefined;
        });

        it('should run showToggleOfMessage', () => {
            component.setState({ showToggleOfMessage: true });
            component.setState({ alertName: 'Low balance alert' });
            component.showToggleOfMessage();
            expect(component.showToggleOfMessage).toBeDefined;
        });

        it('should run showToggleOfMessage', () => {
            component.setState({ showToggleOfMessage: true });
            component.setState({ alertName: 'High balance alert' });
            component.showToggleOfMessage();
            expect(component.showToggleOfMessage).toBeDefined;
        });

        it('should run showToggleOfMessage', () => {
            component.setState({ showToggleOfMessage: true });
            component.setState({ alertName: 'Projection balance alert' });
            component.showToggleOfMessage();
            expect(component.showToggleOfMessage).toBeDefined;
        });

        it('should run showToggleOfMessage', () => {
            component.setState({ showToggleOfMessage: true });
            component.setState({ alertName: 'Joint Account Holders' });
            component.showToggleOfMessage();
            expect(component.showToggleOfMessage).toBeDefined;
        });
    });


    it('should run showModal name = sweepModal', () => {
        component.setState({ name: 'sweepModal' });
        component.showModal();
    });


    it('should run showModal name = alertModal', () => {
        component.setState({ name: 'alertModal' });
        component.showModal();
    });

    it('should run showModal name = AlertsNSweepsStore.showErrorMessage', () => {
        AlertsNSweepsStore.showErrorMessage.mockReturnValue(true);
        component.showModal();
    });

    it('should run alertInfoClick', () => {
        component.alertInfoClick('type', 'type', 'type');
        //expect(component.state.name).toBe('someTechnicalError');
    });

    it('should run getAlertsSweepsData case = sweep', () => {
        let data = [{
            alert: [
                {
                    lessMore: 'lessMore',
                    amount: 'amount',
                    amount1: 'amount1',
                }

            ],
            name: 'name',
            otherAccountId: 'otherAccountId',
        }];
        component.getAlertsSweepsData(data, 'sweep');
        expect(component.getAlertsSweepsData).toBeDefined;
    });

    it('should run getAlertsSweepsData case = sweep', () => {
        let data = [{
            alert: [
                {
                    lessMore: 'lessMore',
                    amount: 'amount',
                    amount1: 'amount1',
                }

            ],
            name: 'name',
            otherAccountId: null,
        }];
        component.getAlertsSweepsData(data, 'sweep');
        expect(component.getAlertsSweepsData).toBeDefined;
    });

    it('should run getAlertsSweepsData case = alert', () => {
        let data = [{
            alert: [
                {
                    lessMore: 'lessMore',
                    amount: 'amount',
                    amount1: 'amount1',
                }

            ],
            name: 'name',
            otherAccountId: 'otherAccountId',
        }];
        component.getAlertsSweepsData(data, 'alert');
        expect(component.getAlertsSweepsData).toBeDefined;
    });

    it('should run getAlertsSweepsData case = alert where i > 0', () => {
        let data = [
            {
                alert: [
                    {
                        lessMore: 'lessMore',
                        amount: 'amount',
                        amount1: 'amount1',
                    }

                ],
                name: 'name',
                otherAccountId: 'otherAccountId',
            },

            {
                alert: [
                    {
                        lessMore: 'lessMore',
                        amount: 'amount',
                        amount1: 'amount1',
                    }

                ],
                name: 'name',
                otherAccountId: 'otherAccountId',
            }

        ];
        component.getAlertsSweepsData(data, 'alert');
        expect(component.getAlertsSweepsData).toBeDefined;
    });

    it('should run getAlertsSweepsData case = projection', () => {
        let data = [{
            alert: [
                {
                    lessMore: 'lessMore',
                    amount: 'amount',
                    amount1: 'amount1',
                }

            ],
            name: 'name',
            otherAccountId: 'otherAccountId',
        }];
        component.getAlertsSweepsData(data, 'projection');
        expect(component.getAlertsSweepsData).toBeDefined;
    });

    it('should run getAlertsSweepsData case = projection', () => {
        let data = [
            {
                alert: [
                    {
                        lessMore: 'lessMore',
                        amount: 'amount',
                        amount1: 'amount1',
                    }

                ],
                name: 'name',
                otherAccountId: 'otherAccountId',
            },
            {
                alert: [
                    {
                        lessMore: 'lessMore',
                        amount: 'amount',
                        amount1: 'amount1',
                    }

                ],
                name: 'name',
                otherAccountId: 'otherAccountId',
            },
        ];
        component.getAlertsSweepsData(data, 'projection');
        expect(component.getAlertsSweepsData).toBeDefined;
    });

    it('should run getAlertsSweepsData case = blank', () => {
        let data = [{
            alert: [
                {
                    lessMore: 'lessMore',
                    amount: 'amount',
                    amount1: 'amount1',
                }

            ],
            name: 'name',
            otherAccountId: 'otherAccountId',
        }];
        component.getAlertsSweepsData(data, '');
        expect(component.getAlertsSweepsData).toBeDefined;
    });


    it('should run onAlertStoreChange case = blank', () => {
        //component.setState({})
        component.onAlertStoreChange();
        expect(component.onAlertStoreChange).toBeDefined;
    });

    it('should run onAlertStoreChange where showToggle : false', () => {
        component.setState({ showToggle: false });
        component.onAlertStoreChange();
        expect(component.onAlertStoreChange).toBeDefined;
    });

    it('should run onAlertStoreChange where showToggle : false', () => {
        component.setState({ showToggle: false });
        AlertsStore.isAlert.mockReturnValue(true);
        component.onAlertStoreChange();
        expect(component.onAlertStoreChange).toBeDefined;
    });
    
    it('should run onAlertStoreChange where AlertsStore.isUpdateAlert is true ', () => {
        component.setState({ showToggle: false });
        AlertsStore.isUpdateAlert.mockReturnValue(true);
        component.onAlertStoreChange();
        expect(component.onAlertStoreChange).toBeDefined;
    });



    /////////////////////////////////////////////////////////////////////////////

    xit('should run componentWillReceiveProps', () => {
        AlertsNSweepsStore.showErrorMessage.mockReturnValue(true);
        component.componentWillReceiveProps();
        expect(component.state.name).toBe('someTechnicalError');
    });

    it('should run getNewComponent', () => {
        AlertsNSweepsStore.getAlertsList.mockReturnValue(
            [
                {
                    "lower_threshold": {
                        "enabled": true,
                        "amount": {
                            "value": 20.0,
                            "currency": "GBP"
                        }
                    }
                },
                {
                    "lower_threshold": {
                        "enabled": true,
                        "amount": {
                            "value": 20.0,
                            "currency": "GBP"
                        }
                    }
                }
            ]
        );

        component.getNewComponent();
        expect(component.getNewComponent()).toBe(false);

    });

    it('should run addAlertSweepProjectionInfo', () => {
        AlertsNSweepsStore.getAlertsList.mockReturnValue({
            "alert": [
                {
                    "lower_threshold": {
                        "enabled": true,
                        "amount": {
                            "value": 20.0,
                            "currency": "GBP"
                        }
                    }
                },
                {
                    "lower_threshold": {
                        "enabled": true,
                        "amount": {
                            "value": 20.0,
                            "currency": "GBP"
                        }
                    }
                }
            ]
        });
        AlertsNSweepsStore.getSweepsList.mockReturnValue({
            "alert": [
                {
                    "lower_threshold": {
                        "enabled": true,
                        "amount": {
                            "value": 20.0,
                            "currency": "GBP"
                        }
                    }
                },
                {
                    "lower_threshold": {
                        "enabled": true,
                        "amount": {
                            "value": 20.0,
                            "currency": "GBP"
                        }
                    }
                }
            ]
        });
        AlertsNSweepsStore.getProjectionAlertsList.mockReturnValue({
            "alert": [
                {
                    "lower_threshold": {
                        "enabled": true,
                        "amount": {
                            "value": 20.0,
                            "currency": "GBP"
                        }
                    }
                },
                {
                    "lower_threshold": {
                        "enabled": true,
                        "amount": {
                            "value": 20.0,
                            "currency": "GBP"
                        }
                    }
                }
            ]
        });

        component.addAlertSweepProjectionInfo();
    });

    xit('should run createSweep', () => {

        AlertsNSweepsStore.showSweepPage.mockReturnValue(true);
        component.createSweep();
        expect(component.state.compName).toBe('sweep');
    });

    xit('should run createSweep covering else condition', () => {

        AlertsNSweepsStore.showSweepPage.mockReturnValue(false);
        component.createSweep();
        expect(component.state.name).toBe('sweepModal');
    });

    xit('should run createAlert', () => {

        AlertsNSweepsStore.showAlertPage.mockReturnValue(true);
        component.createAlert();
        expect(component.state.compName).toBe('alert');
    });

    xit('should run createAlert covering else condition', () => {

        AlertsNSweepsStore.showAlertPage.mockReturnValue(false);
        component.createAlert();
        expect(component.state.name).toBe('alertModal');
    });

    xit('should run toggleClick', () => {
        AlertsNSweepsStore.isJointAccount.mockReturnValue(true);
        let name = 'name';
        let type = 'sweep';
        component.toggleClick(type, name);
        expect(component.toggleClick).toBeDefined();
    });

    xit('should run toggleClick', () => {
        AlertsNSweepsStore.isJointAccount.mockReturnValue(false);
        let name = 'name';
        let type = 'sweep';
        component.toggleClick(type, name);
        expect(component.toggleClick).toBeDefined();
    });


    it('should run closeToggleMessage', () => {
        component.closeToggleMessage();
        expect(component.state.showToggleOfMessage).toBe(false);
    });

    it('should run abstractshowToggleOfMessage-isSweep', () => {
        SweepsStores.isSweep.mockReturnValue(true);
        component.setState({ showModal: true });
        component.showToggleOfMessage();
        component.showModal();
        SweepsStores.isSweep.mockReturnValue(false);
        component.setState({ showModal: false });
    });

    it('should run abstractshowToggleOfMessage', () => {
        SweepsStores.isUpdateSweep.mockReturnValue(true);
        component.setState({ showModal: true });
        component.showToggleOfMessage();
        component.showModal();
        SweepsStores.isUpdateSweep.mockReturnValue(false);
        component.setState({ showModal: false });
    });

    it('should run abstractshowToggleOfMessage-isalert', () => {
        AlertsStore.isAlert.mockReturnValue(true);
        component.setState({ showModal: true });
        component.showToggleOfMessage();
        component.showModal();
        AlertsStore.isAlert.mockReturnValue(false);
    });

    it('should run abstractshowToggleOfMessage-isalert', () => {
        AlertsStore.isUpdateAlert.mockReturnValue(true);
        component.setState({ showModal: true });
        component.showToggleOfMessage();
        component.showModal();
        AlertsStore.isUpdateAlert.mockReturnValue(false);
    });

    it('should run abstractshowToggleOfMessage-isSweep', () => {
        SweepsStores.getDelId.mockReturnValue(true);
        component.setState({ showModal: true });
        component.showToggleOfMessage();
        component.showModal();
        SweepsStores.getDelId.mockReturnValue(false);
        component.setState({ showModal: false });
    });

    it('should run abstractshowToggleOfMessage', () => {
        ProjectionsStore.isUpdateProjection.mockReturnValue(true);
        component.setState({ showModal: true });
        component.showToggleOfMessage();
        component.showModal();
        ProjectionsStore.isUpdateProjection.mockReturnValue(false);
        component.setState({ showModal: false });
    });

    xit('should run abstractshowToggleOfMessage', () => {
        ProjectionsStore.isUpdateProjection.mockReturnValue(true);
        component.setState({ name: alertModal });
        component.showToggleOfMessage();
        component.showModal();
        ProjectionsStore.isUpdateProjection.mockReturnValue(false);
        component.setState({ name: false });
    });

    it('should run abstractshowToggleOfMessage', () => {
        AlertsNSweepsStore.showHeader.mockReturnValue(true);
        AlertsNSweepsStore.getLoadStatus.mockReturnValue(true);
        SweepsStores.isUpdateSweep.mockReturnValue(true);
        component.setState({ showModal: true });
        component.showToggleOfMessage();
        component.showModal();
        component.componentWillUnmount();
        component.onStoreChange();
        // expect(component.state.showToggleOfMessage).toBe(false);
    });
    it('should run abstractshowToggleOfMessage', () => {
        props.backSweep = jest.fn();
        AlertsNSweepsStore.showHeader.mockReturnValue(true);
        AlertsNSweepsStore.getLoadStatus.mockReturnValue(false);
        SweepsStores.isUpdateSweep.mockReturnValue(false);
        component.setState({ showModal: true });
        component.showToggleOfMessage();
        component.showModal();
        component.componentWillUnmount();
        component.onStoreChange();
        component.someTechnicalError();
        component.showProgress();
        component.displayAlertSweep();
        component.backSweep();
        component.backAlert();
        component.closePopup();
        component.createSweep();
        component.createAlert();
        expect(component.state.showModal).toBeTruthy();
        // expect(component.state.showToggleOfMessage).toBe(false);
    });

    it('should run displayAlertSweep', () => {
        AlertsNSweepsStore.getCompName.mockReturnValue('default');
        AlertsNSweepsStore.getLoadStatus.mockReturnValue(true);
        component.setState({ showModal: true });
        component.displayAlertSweep();
    });

    it('should run displayAlertSweep', () => {
        AlertsNSweepsStore.getCompName.mockReturnValue('sweep');
        AlertsNSweepsStore.getLoadStatus.mockReturnValue(true);
        component.setState({ showModal: true });
        component.displayAlertSweep();
    });

    it('should run displayAlertSweep', () => {
        AlertsNSweepsStore.getCompName.mockReturnValue('alert');
        AlertsNSweepsStore.getLoadStatus.mockReturnValue(true);
        component.setState({ showModal: true });
        component.displayAlertSweep();
    });

    it('should run displayAlertSweep', () => {
        AlertsNSweepsStore.getCompName.mockReturnValue('editsweep');
        AlertsNSweepsStore.getLoadStatus.mockReturnValue(true);
        component.setState({ showModal: true });
        component.displayAlertSweep();
    });

    it('should run displayAlertSweep', () => {
        AlertsNSweepsStore.getCompName.mockReturnValue('editalert');
        AlertsNSweepsStore.getLoadStatus.mockReturnValue(true);
        component.setState({ showModal: true });
        component.displayAlertSweep();
    });

    it('should run displayAlertSweep', () => {
        AlertsNSweepsStore.getCompName.mockReturnValue('editprojection');
        AlertsNSweepsStore.getLoadStatus.mockReturnValue(true);
        component.setState({ showModal: true });
        component.displayAlertSweep();
    });

    it('should run displayAlertSweep', () => {
        AlertsNSweepsStore.getCompName.mockReturnValue('default');
        AlertsNSweepsStore.getLoadStatus.mockReturnValue(true);
        component.setState({ showModal: true });
        component.displayAlertSweep();
    });



    it('should run abstractshowToggleOfMessage', () => {
        AlertsNSweepsStore.showHeader.mockReturnValue(false);
        AlertsNSweepsStore.getLoadStatus.mockReturnValue(false);
        SweepsStores.isUpdateSweep.mockReturnValue(false);
        component.setState({ showModal: true });
        component.showToggleOfMessage();
        component.showModal();
        component.componentWillUnmount();
        component.onStoreChange();
        // expect(component.state.showToggleOfMessage).toBe(false);
    });
    xit('should return EditDD jsx', () => {
        // props.mandates.previous_payment.when="2016-03-03";
        const component = shallowRender(props);

        // const date = moment(new Date()).format(config.dateFormatTimeline);
        //component.setState({ isEnable: true });
        expect(component).toEqualJSX(
            <div>
                <div className="row content-wrapper">
                    <div>
                        <NewUserAlertSweepComponent
                            content={{ undefined }}
                            createAlert={function noRefCheck() { } }
                            createSweep={function noRefCheck() { } }
                            setCss={undefined}
                            />
                    </div>
                    <AlertSweepModal
                        closePopup={function noRefCheck() { } }
                        confirmCancel={false}
                        content={{ undefined }}
                        errorResponse={undefined}
                        name={undefined}
                        />
                </div>
            </div>

        );
    });


});
describe('AlertSweepComponent Test Cases check', () => {
    let props = {
        setCss: jest.fn(),
        onMicroTileClick: jest.fn(),
        onHelpClick: jest.fn(),
        isPopupOpen: true,
        alertsAmountValue: 'Hello',
        changeTheValue: jest.fn(),
        _alertsAmountBlur: jest.fn(),
        notificationFlag: true,
        changeTheNotificationFlag: {},
        content: {

            alertsSweepsHead: 'Alerts & sweeps',
            alertMessage: 'Set up alerts to receive text messages when you reach a certain amount on your chosen account.',
            sweepMessage: 'Set up sweeps to be notified when your threshold is reached and select the account you want your money to be swept from to meet your target balance.',
            alerts: 'Alerts',
            errorMessage: 'Something techie has gone wrong. Please try again.',
            cancelButton: 'Cancel',
            confirmButton: 'Confirm',
            backButton: 'Back',
            infoButton: 'Info',
            deleteButton: 'Delete',
            createSweep: 'Create Sweep',
            editSweep: 'Edit Sweep',
            createAlert: 'Create Alert',
            deleteContent: 'Are you sure you want to delete this sweep',
            AlertSweep: 'Alert and sweep.',
            SweepDelete: 'Are you sure you want to delete this sweep',
            footerLabelSweep: 'Just so you know, you might still get one more balance sweep from us',
            footerLabelAlert: 'Just so you know, you might still get one more balance alert from us',
            footerLabelJointAccountHolder: 'The sweep was set up by your joint account holder.You can’t edit it,but you can give them a nudge to do it',
            maxSweepPopupHeader: 'An alert about your sweeps',
            maxSweepPopupData: 'You can only have one low balance sweep per account.But you can edit your existing sweeps.',
            failedToLoadAlerts: 'We were unable to load your alerts at this time.',
            failedToLoadSweeps: 'We were unable to load your sweeps at this time.',
            failedTpLoadAlertsNSweeps: 'We were unable to load your alerts or sweeps at this time.',

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
        <AlertSweepComponent onClick={onClickStub} {...props}
            />);
    it('should run abstractshowToggleOfMessage', () => {
        SweepsStores.isUpdateSweep.mockReturnValue(true);
        component.setState({ showModal: true });
        component.showToggleOfMessage();
        component.showModal();
    });




});
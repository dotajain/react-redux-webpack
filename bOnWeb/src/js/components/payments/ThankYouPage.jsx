/**
 * @module Thank You Page
 */
const React = require('react');
const PaymentsActionCreator = require('../../actions/PaymentsActionCreator');
const PaymentsStore = require('../../stores/PaymentsStore');
const { PropTypes } = React;
const StringConstant = require('../../constants/StringConstants');
const RequiresAuthenticatedUser = require('../RequiresAuthenticatedUser');
const ThankYouComponent = React.createClass({
    propTypes: {
        content: PropTypes.object,
    },
    componentWillMount() {
        const fromSelectedAccount = PaymentsStore.getSelectedAccount();
        PaymentsActionCreator.getAccountDetails(fromSelectedAccount.id);
        if (fromSelectedAccount.type === StringConstant.savings) {
            PaymentsActionCreator.getPotDetails(fromSelectedAccount.id);
        }
        if (PaymentsStore.getPaymentType() === true) {
            const toSelectedAccount = PaymentsStore.getSelectedToAccount();
            PaymentsActionCreator.getAccountDetails(toSelectedAccount.id);
            if (toSelectedAccount.type === StringConstant.savings && fromSelectedAccount.id !== toSelectedAccount.id) {
                PaymentsActionCreator.getPotDetails(toSelectedAccount.id);
            }
        }
    },
    // handles onClick of done button
    handleDoneClick() {
        PaymentsActionCreator.confrimPayment();
        const pageName = (PaymentsStore.isOneOffPayment() ? 'WEB-OPEN-SAVING-POTS' : 'WEB-OPEN-PAYMENTS');
        PaymentsActionCreator.navigateToWebTask(pageName);
    },
    repeatSetup() {
        const spending = PaymentsStore.getOneOffPayment();
        spending.isMonthly = true;
        PaymentsActionCreator.spendingTransferMoney(spending, true);
        PaymentsActionCreator.navigateToWebTask('WEB-OPEN-PAYMENTS');
    },
    repeatLink() {
        if (PaymentsStore.isOneOffPayment() && !PaymentsStore.getOneOffPayment().isMonthly && !PaymentsStore.getResetOneOff()) {
            return <button type="button" onClick={this.repeatSetup} className="page-options"><i className="icon icon-move"></i><span> {this.props.content.setUpRegularTransfer}</span></button>;
        }
    },
    modifyAmount(amount) {
        const splitedAmount = amount.split('.');
        if (splitedAmount.length === 2) {
            if (splitedAmount[1].length === 0) {
                return `${splitedAmount[0]}${'.00'}`;
            } else if (splitedAmount[1].length === 1) {
                return `${amount}${'0'}`;
            } else return amount;
        } else {
            return `${splitedAmount[0]}${'.00'}`;
        }
    },
    render() {
        let name = StringConstant.EmptyString;
        let data = StringConstant.EmptyString;
        const endDetails = PaymentsStore.getEndingDetails();
        let thankyouFooter = StringConstant.EmptyString;
        if (PaymentsStore.getSelectedToAccount() !== StringConstant.EmptyString || PaymentsStore.getSelectedPayee() !== StringConstant.EmptyString) {
            if (PaymentsStore.getPaymentType() === true) {
                if (PaymentsStore.getSelectedToAccount().metadata.display_name !== null) {
                    name = PaymentsStore.getSelectedToAccount().metadata.display_name;
                } else {
                    name = PaymentsStore.getSelectedToAccount().product.name;
                }
                if (endDetails.isRepeat || endDetails.when !== StringConstant.Today) {
                    data = this.props.content.transferText;
                    thankyouFooter = this.props.content.thankYouFooterText;
                } else {
                    data = this.props.content.regularTransfer;
                }

                const potData = PaymentsStore.getSelectedToPotData();
                if (potData !== StringConstant.EmptyString && potData !== undefined && potData.name !== 'Not in Pot') {
                    name = potData.name;
                }
            } else {
                name = PaymentsStore.getSelectedPayee().data.display_name;
                if (PaymentsStore.getEndingDetails().isRepeat) {
                    data = this.props.content.regularPayment;
                } else data = this.props.content.paymentText;
                if (endDetails.isRepeat || endDetails.when !== StringConstant.Today) {
                    thankyouFooter = this.props.content.thankYouFooterText;
                }
                //      thankyouFooter = this.props.content.thankYouFooterText;
            }
        }
        if (PaymentsStore.isOneOffPayment()) {
            // thankyouFooter = this.props.content.oneOffReapetPaymentText;
            if (PaymentsStore.getOneOffPayment().isMonthly) {
                thankyouFooter = this.props.content.thankOneOffRepeatText;
            }
        }

        let amount = PaymentsStore.getEndingDetails().amount;
        amount = this.modifyAmount(String(amount));
        return (
            <div className="b container-fluid-full thankyou ">
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                        <h2>{this.props.content.thankYouText}</h2>
                        <span className="icon icon-done"></span>
                        <p className="lead">
                            {data}<br/>
                            <b>{name}</b><br/>{this.props.content.paymentThroughText}<br/>
                            <b>{amount}</b>
                        </p>
                        <p className = "footer-text">{thankyouFooter}</p>
                        {this.repeatLink() }

                    </div>
                </div>
                <div className="col-lg-12">
                    <button className="action-button" onClick={this.handleDoneClick}>{this.props.content.done}</button>
                </div>
            </div>

        );
    },
});
module.exports = RequiresAuthenticatedUser(ThankYouComponent);


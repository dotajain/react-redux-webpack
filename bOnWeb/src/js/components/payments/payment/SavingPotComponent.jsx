/**
 * @module SavingPotComponent
 */
const React = require('react');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const PaymentsStore = require('../../../stores/PaymentsStore');
const NumberUtils = require('../../../utils/NumberUtils');
const _ = require('lodash');
const { PropTypes } = React;
const StringConstant = require('../../../constants/StringConstants');

// let unAllocatedAmount = '';

const SavingPotComponent = React.createClass({
    propTypes: {
        content: PropTypes.object,
        onClick: PropTypes.func,
        name: PropTypes.string,
        innerData: PropTypes.object,
        onChange: PropTypes.func,
        index: PropTypes.number,
        savingId:PropTypes.string,
    },

    // handles on click of radio button
    onChange() {
        if (this.props.name === StringConstant.toList) {
            PaymentsActionCreator.selectedToPot(this.props.innerData);
        } else {
            PaymentsActionCreator.selectedPot(this.props.innerData);
        }
        PaymentsActionCreator.potClicked(true);

        this.props.onChange(this.props.innerData, true);
    },
    // return a radio button which acts like a div to select any div amoung a group
    getRadioButton() {
        let radioId = `${this.props.innerData.id} ${this.props.name}`;
        if (PaymentsStore.getNextTask() === StringConstant.CNFRM) {
            if (this.props.name === StringConstant.toList) {
                if (PaymentsStore.getSelectedToPot() === this.props.innerData.id) {
                    return (
                        <div className="option-select">
                            <input type="radio" id={radioId} name={ `${StringConstant.myGroupName_}${this.props.name}`} value={this.props.innerData.id} onChange={this.onChange} defaultChecked />
                            <label htmlFor={radioId}></label>
                        </div>
                    );
                }
            } else {
                if (PaymentsStore.getSelectedPot() !== '' && PaymentsStore.getSelectedPot() === this.props.innerData.id) {
                    return (
                        <div className="option-select">
                            <input type="radio" id={radioId} name={ `${StringConstant.myGroupName_}${this.props.name}`} placeholder={this.props.index} value={this.props.innerData.id} onChange={this.onChange} defaultChecked />
                            <label htmlFor={radioId}></label>
                        </div>
                    );
                }
            }
        } else {
            if (this.props.name === StringConstant.toList) {
                if (PaymentsStore.setPotVisbility(this.props.innerData, this.props.savingId)) {
                    return (
                        <div className="option-select">
                            <input type="radio" id={radioId} name={ `${StringConstant.myGroupName_}${this.props.name}`} value={this.props.innerData.balance.value} onChange={this.onChange} defaultChecked={ PaymentsStore.isToPotSame(this.props.innerData.id) } />
                            <label htmlFor={radioId}></label>
                        </div>
                    );
                }
            } else {
                if (!PaymentsStore.getOneOffPayment() || (PaymentsStore.getOneOffPayment() && PaymentsStore.getSelectedToPot() !== this.props.innerData.id)) {
                    let checked = (PaymentsStore.getSelectedPot() === this.props.innerData.id) ? true : false;
                    return (
                        <div className="option-select">
                            <input type="radio" id={radioId} name={ `${StringConstant.myGroupName_}${this.props.name}`} value={this.props.innerData.balance.value}
                                onChange={this.onChange} defaultChecked={checked}
                            />
                            <label htmlFor={radioId}></label>
                        </div>
                    );
                }
            }
        }
    },
    render() {
        let balance = NumberUtils.decimalFormat(this.props.innerData.balance.value, 3);

        balance = _.split(balance, '.');
        // if (this.props.innerData.balance.value < 0) {
        //     unAllocatedAmount = true;
        // }

        return (

            <li>
                { this.props.name !== StringConstant.toList
                    ? (this.props.innerData.balance.value > 0)
                    && this.getRadioButton()
                    : this.getRadioButton() }
                <h5>{this.props.innerData.name}</h5>
                <h3>{balance[0]}.<sub>{balance[1]}</sub></h3>
            </li>

        );
    },
});

module.exports = SavingPotComponent;

/**
 * @module SavingPotTotalComponent
 */
const React = require('react');
const PaymentsStore = require('../../../stores/PaymentsStore');
const NumberUtils = require('../../../utils/NumberUtils');
const _ = require('lodash');
const { PropTypes } = React;
const StringConstant = require('../../../constants/StringConstants');

const SavingPotTotalComponent = React.createClass({
    propTypes: {
        content: PropTypes.object,
        onClick: PropTypes.func,
        name: PropTypes.string,
        open: PropTypes.bool,
        datas: PropTypes.object,
        onChange: PropTypes.func,
        Amount: PropTypes.number,
        showTotal: PropTypes.bool,
        contents: PropTypes.object,
        data: PropTypes.object,
    },
    getInitialState() {
        return {
            curAmount: 0,
            availAmount: 0,
            enableRadio: true,
        };
    },
    // handles on click of radio button
    onRadioClick() {
        this.props.onChange(this.props.data);
    },
    // return a radio button which acts like a div to select any div amoung a group
    getRadioButton() {
        if (PaymentsStore.getNextTask() === StringConstant.CNFRM) {
            if (this.props.name !== StringConstant.toList || this.props.showTotal) {
                const potEmpty = this.props.name !== StringConstant.toList ? PaymentsStore.getSelectedPot() === '' : PaymentsStore.getSelectedToPot() === '';
                const sameAcc = this.props.name !== StringConstant.toList ? PaymentsStore.getSelectedSavingAccountId() === this.props.data.id : PaymentsStore.getSelectedToSavingAccountId() === this.props.data.id;
                if (potEmpty && sameAcc) {
                    return (
                        <div className="option-select">
                            <input type="radio" id={`tot-${this.props.data.id} ${this.props.name}`} name={ `${StringConstant.myGroupName_}${this.props.name}`} value={this.props.Amount} onChange={this.onRadioClick} defaultChecked={ this.isSavingChecked() } />
                            <label className = "total-pot" htmlFor={`tot-${this.props.data.id} ${this.props.name}`}></label>
                        </div>
                    );
                }
            }
        } else {
            if (this.props.name !== StringConstant.toList) {
                return (
                    this.state.enableRadio ? <div className="option-select">
                        <input type="radio" id={`tot-${this.props.data.id} ${this.props.name}`} name={ `${StringConstant.myGroupName_}${this.props.name}`} value={this.props.Amount} onChange={this.onRadioClick} defaultChecked={ this.isSavingChecked() } />
                        <label className = "total-pot" htmlFor={`tot-${this.props.data.id} ${this.props.name}`}></label>
                    </div> : null
                );
            } else if (this.props.name === StringConstant.toList || this.props.showTotal) {
                return (
                    <div className="option-select">
                        <input type="radio" id={`tot-${this.props.data.id} ${this.props.name}`} name={ `${StringConstant.myGroupName_}${this.props.name}`} value={this.props.Amount} onChange={this.onRadioClick} defaultChecked={ this.isSavingChecked() } />
                        <label className = "total-pot" htmlFor={`tot-${this.props.data.id} ${this.props.name}`}></label>
                    </div>
                );
            }
        }
    },
    // checked if same saving pot is selected while re-rendering
    isSavingChecked() {
        const id = this.props.name === StringConstant.toList ? PaymentsStore.getSelectedToAccount().id : PaymentsStore.getSelectedAccount().id;
        const clicked = this.props.name === StringConstant.toList ? PaymentsStore.isToSavingTotClicked() : PaymentsStore.isSavingTotClicked();
        return id === this.props.data.id && clicked;
    },
    render() {
        let curAmount = 0;
        let avlAmount = 0;
        const accDetails = PaymentsStore.getAccountDetail(this.props.data.id);
        if (accDetails !== undefined && accDetails.balances !== undefined) {
            accDetails.balances.map(balance => {
                switch (balance.type) {
                    case StringConstant.current:
                        curAmount = balance.amount.value;
                        break;
                    case StringConstant.available:
                        avlAmount = balance.amount.value;
                        if (parseInt(avlAmount) === 0) {
                            this.state.enableRadio = false;
                        }
                        break;
                }
                return false;
            });
            curAmount = NumberUtils.decimalFormat(curAmount, 3);
            curAmount = _.split(curAmount, '.');
            avlAmount = NumberUtils.decimalFormat(avlAmount, 3);
            avlAmount = _.split(avlAmount, '.');
        }
        return (
            (this.props.open) ?
                <div>

                    {!PaymentsStore.checkPotEmpty(this.props.data.id) ?
                        <div className = "total-pot-box">
                            <div className="inline">
                                { this.getRadioButton() }
                            </div>
                            <div className="inline">
                                <h2>{avlAmount[0]}.<sub>{avlAmount[1]}</sub></h2>
                                <h3>{this.props.contents.availBalance}</h3>
                            </div></div> :
                        <div className="inline">
                            <h2>{curAmount[0]}.<sub>{curAmount[1]} {this.props.contents.currentTitle}</sub></h2>
                            <h4 className ="group-from">{avlAmount[0]}.<sub>{avlAmount[1]} {this.props.contents.available}</sub> </h4>
                        </div>
                    }
                </div> :
                <div>
                    { curAmount === 0
                        ? <div className="loader-amount"></div> :
                        <div>
                            <div> <h2>{curAmount[0]}.<sub>{curAmount[1]} {this.props.contents.currentTitle}</sub></h2>
                                <h4 className ="group-from">{avlAmount[0]}.<sub>{avlAmount[1]} {this.props.contents.available}</sub> </h4>
                            </div>
                        </div>
                    }
                </div>

        );
    },
});


module.exports = SavingPotTotalComponent;

/**
 * @module CreateBudgetTableRowTemplate
*/

const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');

const OverlayPopup = require('../common/modals/OverlayPopup');
const NumberUtils = require('../../utils/NumberUtils');
const SpendingsUtils = require('../../utils/SpendingsUtils');

const CreateBudgetTableRowTemplate = React.createClass({
  propTypes: {
    rowData: PropTypes.object,
    metadata: PropTypes.object,
    customClick: PropTypes.func,
    content: PropTypes.object,
  },
  getInitialState() {
      return {
          target_amount: this.props.rowData.target_amount,
          isDisabledDecrease: false,
          isDisabledIncrease: false,
      };
  },
  componentWillMount() {
      if (this.props.rowData.target_amount === 0 || this.props.rowData.target_amount < 0) {
          this.setState({ target_amount: null, isDisabledDecrease: true });
      }
  },
  _onChange(e) {
    const isValid = SpendingsUtils.numberValidationForCreateEditBudget(e.target.value);
    if (isValid) {
      let value;
      const etarget = e.target.value.replace(/[^\d\.]*/g, '');
      if (etarget === '' || etarget === 0) {
        value = '£';
      } else {
        value = `£${etarget}`;
      }
      this.setState({ target_amount: value });
      if (etarget > 0) {
        this.setState({ isDisabledDecrease: false });
      }
      if (etarget <= 10000) {
        this.setState({ isDisabledIncrease: false });
      }
    }
  },
  _onBlur() {
    let targetAmount;
    let value;
    if (_.isNumber(this.state.target_amount)) {
      value = NumberUtils.appendCurrency('{}', Number(this.state.target_amount));
    } else {
      value = Number(this.state.target_amount.replace(/[^\d\.]*/g, ''));
      value = NumberUtils.appendCurrency('{}', Number(value));
    }
    this.setState({ target_amount: value });
    if (this.state.target_amount) {
      if (_.isNumber(this.state.target_amount)) {
        targetAmount = this.state.target_amount;
      } else {
        targetAmount = Number(this.state.target_amount.replace(/[^\d\.]*/g, ''));
      }
      const difference = targetAmount - this.props.rowData.target_amount;
      this.props.customClick(this.props.rowData.key, difference);
    }
    if (targetAmount === 0 || targetAmount < 0) {
      this.setState({ target_amount: null, isDisabledDecrease: true });
    }
    if (targetAmount <= 10000) {
        this.setState({ isDisabledIncrease: false });
    }
  },
  _increment() {
    let el;
    if (!this.state.target_amount) {
        el = 0;
    } else {
        let targetAmount;
        if (_.isNumber(this.state.target_amount)) {
          targetAmount = this.state.target_amount;
        } else {
          targetAmount = Number(this.state.target_amount.replace(/[^\d\.]*/g, ''));
        }
        el = targetAmount;
    }
    let value;
    const roundOffValue = el % 10;
    if (roundOffValue !== 0) {
      const diff = 10 - roundOffValue;
      value = NumberUtils.appendCurrency('{}', Number(el + diff));
    } else {
      if (el <= 9990) {
        value = NumberUtils.appendCurrency('{}', Number(el + 10));
      } else {
        value = NumberUtils.appendCurrency('{}', Number(el + 0));
      }
    }
    this.setState({ target_amount: value, isDisabledDecrease: false }, () => {
        let targetAmount;
        if (_.isNumber(this.state.target_amount)) {
          targetAmount = this.state.target_amount;
        } else {
          targetAmount = Number(this.state.target_amount.replace(/[^\d\.]*/g, ''));
        }
        if (targetAmount === 9999.99999) {
          this.setState({ isDisabledIncrease: true });
        }
        const difference = targetAmount - this.props.rowData.target_amount;
        this.props.customClick(this.props.rowData.key, difference);
    });
  },
  _decrement() {
    let el;
    if (!this.state.target_amount) {
        el = 0;
    } else {
      let targetAmount;
      if (_.isNumber(this.state.target_amount)) {
        targetAmount = this.state.target_amount;
      } else {
        targetAmount = Number(this.state.target_amount.replace(/[^\d\.]*/g, ''));
      }
      el = targetAmount;
    }
    let value;
    const roundOffValue = el % 10;
    if (roundOffValue !== 0) {
      value = NumberUtils.appendCurrency('{}', Number(el - roundOffValue));
    } else {
      value = NumberUtils.appendCurrency('{}', Number(el - 10));
    }
    this.setState({ target_amount: value, isDisabledIncrease: false }, () => {
        let targetAmount;
        if (this.state.target_amount) {
          if (_.isNumber(this.state.target_amount)) {
            targetAmount = this.state.target_amount;
          } else {
            targetAmount = Number(this.state.target_amount.replace(/[^\d\.]*/g, ''));
          }
        } else {
          targetAmount = 0;
        }
        const difference = targetAmount - this.props.rowData.target_amount;
        this.props.customClick(this.props.rowData.key, difference);
    });
    if (value.replace(/[^\d\.]*/g, '') <= 0) {
      this.setState({ target_amount: null, isDisabledDecrease: true });
    }
  },
  _onPaste(e) {
    e.preventDefault();
  },
  render() {
    const rowData = this.props.rowData;
    const metaData = this.props.metadata;
    const lastMonth = rowData.last_month;
    const content = this.props.content;
    let differencePot;
    let potColor = 'potcolor green';
    if (rowData.name === 'Pots') {
      differencePot = rowData.earnings.period.net_income.value - rowData.target_amount;
    }
    if (differencePot < 0) {
      potColor = 'potcolor red';
    }

    let popoverKey;
    if (rowData.key) {
      popoverKey = rowData.key;
    }

    let colData;
    if (metaData.columnName === 'name' && rowData.joint) {
        colData = (
          <div className="spendings__tag_name">
            <OverlayPopup overlayId={popoverKey} overlayMessage={content.spendingJointTooltipMessage} placement="right">
              <span className="icon icon-joint-account"></span>
            </OverlayPopup>
             <span>{rowData.name}</span>
          </div>);
    } else if (rowData.name === 'Pots') {
      colData = (<div className="pot_row">{rowData.name}<span className={potColor}></span></div>);
    } else {
        colData = <div className="spendings__tag_name">{rowData.name}</div>;
    }
    if (metaData.columnName === 'last_month') {
      if (rowData.name === 'Pots') {
        if (lastMonth === 0) {
          colData = <div className="table-data">-</div>;
        } else {
          colData = NumberUtils.appendCurrency('{}', Number(Math.abs(lastMonth)));
        }
      } else {
        if (lastMonth === 0) {
          colData = '-';
        } else {
            colData = NumberUtils.appendCurrency('{}', Number(Math.abs(lastMonth)));
        }
      }
    }
    if (metaData.columnName === 'target_amount') {
      if (rowData.name === 'Pots') {
        const amount = NumberUtils.appendCurrency('{}', rowData.target_amount);
        colData = (<div className="spendings__potValue">
                    <span> {amount}</span>
                    <OverlayPopup overlayId="pots_key" overlayMessage={content.spendingPotTooltipMessage} placement="bottom">
                      <span className="icon icon-information"></span>
                    </OverlayPopup>
                  </div>);
      } else {
        let targetAmount = this.state.target_amount;
        const checkNan = Number(targetAmount);
        if (!_.isNaN(checkNan)) {
          if (targetAmount !== null) {
            targetAmount = NumberUtils.appendCurrency('{}', Number(targetAmount));
          }
        }
        colData = (<div className="numberAdjust">
                        <input autoComplete="off" placeholder={content.spendingTableMessage5} type="text" value={targetAmount} className="form-control" id="potScheduleValue" onBlur={this._onBlur} onChange={this._onChange} onPaste={this._onPaste}/>
                        <div className="btn-numberAdjust">
                          <button onClick={this._decrement} type="button" disabled={this.state.isDisabledDecrease}>
                            <img src="../images/b/icons/remove.svg" height="15" alt="Remove" />
                          </button>
                          <button onClick={this._increment} type="button" disabled={this.state.isDisabledIncrease}>
                            <img src="../images/b/icons/add.svg" height="15" alt="Add" />
                          </button>
                        </div>
                      </div>);
      }
    }
    return (
      <span>
        {colData}
      </span>
    );
	},
});

module.exports = CreateBudgetTableRowTemplate;

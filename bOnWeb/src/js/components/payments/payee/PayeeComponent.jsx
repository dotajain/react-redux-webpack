/**
 * @module PayeeComponent
 */
const React = require('react');
const PaymentsStore = require('../../../stores/PaymentsStore');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const NumberUtils = require('../../../utils/NumberUtils');
const BrowserUtils = require('../../../utils/BrowserUtils');
const { PropTypes } = React;

const PayeeComponent = React.createClass({
  propTypes: {
    data: PropTypes.object,
    color: PropTypes.string,
    display: PropTypes.any,
    onClick: PropTypes.func,
  },
  // to set radio button css
  setRadioCSS() {
    switch (PaymentsStore.getNextTask()) {
      case 'To':
      case 'KP':
        let checked = PaymentsStore.IsPayeeSame(this.props.data.id);
        return (<input type="radio" id={this.props.data.id} name="groupTo" onClick={this.handleChange} value={this.props.data.id}
          defaultChecked={checked}
        />);
      case 'RP':
        checked = PaymentsStore.IsPayeeSame(this.props.data.id);
        return <input type="radio" id={this.props.data.id} name="groupTo" onClick={ this.handleChange } value={this.props.data.id} defaultChecked={checked} />;
      case 'CNFRM':
        return <input type="radio" id={this.props.data.id} defaultChecked name="groupTo" value={this.props.data.id} />;
      case 'From':
        return <input type="radio" disabled id= { this.props.data.id } defaultChecked={ false} name="groupTo" onClick={ this.handleChange } value={ this.props.data.id } />;


    }
  },
  // To send payeeData to PaymentsActionCreator
  handleChange(e) {
    // console.log('Payee'+e);
    const evnt = e;
    if (this.props.display && PaymentsStore.IsPayeeSame(this.props.data.id) && BrowserUtils.isMobileView()) {
      evnt.target.checked = false;
    }
    const payeeData = {
      data: this.props.data,
    };
    PaymentsActionCreator.putSelectedPayee(payeeData);
    this.props.onClick(this.props.data);
  },

  render() {
    return (
      <div className={'checkbox-account payee account-11'} >
        { this.setRadioCSS() }
        <label htmlFor={this.props.data.id } >
          <h3 className = "group-to">{this.props.data.display_name}</h3>
          <h5>{this.props.data.to_account.account_number} | {NumberUtils.formatSortCode(this.props.data.to_account.sort_code) }</h5>
          <h4>Reference</h4>
          <h2 className = "group-to">{this.props.data.reference}</h2>
        </label>
      </div>
    );
  },
});


module.exports = PayeeComponent;


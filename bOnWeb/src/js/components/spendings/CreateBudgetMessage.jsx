/**
 * @module CreateBudgetMessage
*/

const React = require('react');
const { PropTypes } = React;
const NumberUtils = require('../../utils/NumberUtils');

const CreateBudgetMessage = React.createClass({
  propTypes: {
    content: PropTypes.object,
    totalBudgetValue: PropTypes.number,
    potValue: PropTypes.number,
    earning: PropTypes.number,
  },
  render() {
    const content = this.props.content;
    const totalBudgetValue = this.props.totalBudgetValue;
    const potValue = this.props.potValue;
    const earning = this.props.earning;

    const budgetValue = Math.abs(totalBudgetValue - potValue);
    const sortValue = Math.abs(totalBudgetValue - earning);
    let message;
    if ((earning - totalBudgetValue) < 0) {
      message = (<div className="spendings-message spendings-message-rejig">
                  <h3>
                    <span className="icon icon-information"></span>
                    {content.spendingCreateMessageTitleText2}
                  </h3>
                  <p>
                    {content.spendingCreateMessageCopyText1} <b>{NumberUtils.appendCurrency('{}', budgetValue)}</b><br/>
                    {content.spendingCreateMessageCopyText2} <b>{NumberUtils.appendCurrency('{}', potValue)}</b>.
                  </p>
                  <p className = "lower-para">
                    {content.spendingCreateMessageCopyText5} <span className="sortValue"><b>{NumberUtils.appendCurrency('{}', sortValue)}</b></span>.
                  </p></div>);
    } else {
      message = (<div className="spendings-message">
                  <h3>
                    {content.spendingCreateMessageTitleText1}
                  </h3>
                  <p>
                    {content.spendingCreateMessageCopyText1}<b> {NumberUtils.appendCurrency('{}', budgetValue)}</b><br/>
                    {content.spendingCreateMessageCopyText2} <b>{NumberUtils.appendCurrency('{}', potValue)}</b>.
                  </p>
                  <p className = "lower-para">
                    {content.spendingCreateMessageCopyText3} <b>{NumberUtils.appendCurrency('{}', sortValue)}</b> {content.spendingCreateMessageCopyText4} </p></div>);
    }
    return (
      <div className="spendings-createbudget-message">
        {message}
      </div>
    );
	},
});

module.exports = CreateBudgetMessage;

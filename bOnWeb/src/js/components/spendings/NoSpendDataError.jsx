/**
 * @module NoSpendDataError
*/

const React = require('react');
const { PropTypes } = React;
const HeaderComponent = require('../common/HeaderComponent');

const NoSpendDataError = React.createClass({
  propTypes: {
    content: PropTypes.object,
    reload: PropTypes.func,
  },
  render() {
    const content = this.props.content;
    return (
      <div>
        <HeaderComponent selectedTab="spending" {...this.props}/>
        <div className="main-container">
          <div className="sendings__noData text-center">
            <h1>{content.spendingNoSpendTitle}</h1>
            <p>{content.spendingNoSpend}</p>
            <button className="page-options border opt-green" type="button" onClick={this.props.reload}>{content.spendingTryButtonText}</button>
          </div>
        </div>
      </div>
    );
	},
});

module.exports = NoSpendDataError;

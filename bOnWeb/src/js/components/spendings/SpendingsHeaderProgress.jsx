/**
 * @module SpendingsHeaderProgress
*/

const React = require('react');
const { PropTypes } = React;

const SpendingsHeaderProgressBar = require('./SpendingsHeaderProgressBar');
const NumberUtils = require('../../utils/NumberUtils');

const SpendingsHeaderProgress = React.createClass({
  propTypes: {
    content: PropTypes.object,
    leftValue: PropTypes.number,
    rightValue: PropTypes.number,
    labelLeft: PropTypes.string,
    labelRight: PropTypes.string,
    isNoBudget: PropTypes.bool,
    spendingProgressText: PropTypes.string,
  },
  render() {
    const content = this.props.content;
    const isNoBudget = this.props.isNoBudget;
    let centerContent;
    const rightValue = this.props.rightValue;
    const leftValue = this.props.leftValue;

    let leftItemValue;
    if (leftValue === 0) {
        leftItemValue = NumberUtils.appendCurrency('{}', leftValue);
    } else {
        leftItemValue = NumberUtils.appendCurrency('{}', leftValue);
    }
    let rightItemValue;
    if (rightValue === 0) {
        rightItemValue = NumberUtils.appendCurrency('{}', rightValue);
    } else {
        rightItemValue = NumberUtils.appendCurrency('{}', rightValue);
    }

    if (isNoBudget) {
        centerContent = (<SpendingsHeaderProgressBar spendingProgressText={this.props.spendingProgressText} content={content} leftValue={leftValue} rightValue={rightValue} />);
    } else {
        centerContent = (<div className="spendings-progress-message">
                            <h4>{content.spendingHeaderNoBudgetTitle}</h4>
                            <p>
                                {content.spendingHeaderNoBudgetMessage}
                            </p>
                        </div>);
    }
    return (
    <div className="spendings-progress">
        <div className="row">
            <div className="col-xs-3">
                <h6>{this.props.labelLeft}</h6>
                <h2>{leftItemValue}</h2>
            </div>
            <div className="col-xs-6 text-center">
                {centerContent}
            </div>
            <div className="col-xs-3">
                <h6>{this.props.labelRight}</h6>
                <h2>{rightItemValue}</h2>
            </div>
        </div>
    </div>
    );
	},
});

module.exports = SpendingsHeaderProgress;

/**
 * @module SpendLastMonthTemplate
*/

const React = require('react');
const { PropTypes } = React;

const SpendLastMonthTemplate = React.createClass({
  propTypes: {
    rowData: PropTypes.object,
  },
  render() {
    const lastMonth = this.props.rowData.last_month;
    let value;
    if (lastMonth < 0) {
      const val = Math.abs(lastMonth).toFixed(2);
      value = `-£${val}`;
    } else {
      const val = Math.abs(lastMonth).toFixed(2);
      value = `£${val}`;
    }
    return (
      <span>
        {value}
      </span>
    );
  },
});

module.exports = SpendLastMonthTemplate;

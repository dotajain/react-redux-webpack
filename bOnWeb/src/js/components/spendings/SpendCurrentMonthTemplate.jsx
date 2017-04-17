/**
 * @module SpendCurrentMonthTemplate
*/

const React = require('react');
const { PropTypes } = React;

const SpendCurrentMonthTemplate = React.createClass({
  propTypes: {
    rowData: PropTypes.object,
  },
  render() {
    const currentMonth = this.props.rowData.current_month;
    let value;
    if (currentMonth < 0) {
      const val = Math.abs(currentMonth).toFixed(2);
      value = `-£${val}`;
    } else {
      const val = Math.abs(currentMonth).toFixed(2);
      value = `£${val}`;
    }
    return (
      <span>
        {value}
      </span>
    );
	},
});

module.exports = SpendCurrentMonthTemplate;

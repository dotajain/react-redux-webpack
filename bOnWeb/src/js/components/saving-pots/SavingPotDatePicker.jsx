/**
 * @module SavingPotDatePicker
 */
const React = require('react');
const { PropTypes } = React;
const ReactDOM = require('react-dom');
const moment = require('moment');
const DateTimeField = require('react-bootstrap-datetimepicker');


const SavingPotDatePicker = React.createClass({
  propTypes: {
    minDate: PropTypes.object,
    dateTime: PropTypes.any.isRequired,
    format: PropTypes.string,
    viewMode: PropTypes.string,
    inputFormat: PropTypes.string,
    onChange: PropTypes.func,
    defaultText: PropTypes.string,
  },
  getInitialState () {
    return {
      dateTime: this.props.dateTime,
    };
  },
  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.sdatePicker).children[2].children[0].disabled = true;
    ReactDOM.findDOMNode(this.refs.sdatePicker).children[2].addEventListener('click', this._click);
  },
  componentWillReceiveProps(nextProps) {
    this.setState({ dateTime: nextProps.dateTime });
  },
  _click () {
    setTimeout(() => {
      ReactDOM.findDOMNode(this.refs.sdatePicker).children[0].addEventListener('click', this._close);
    }, 100);
  },
  _close () {
    this.setState({ dateTime: moment(this.props.dateTime) });
  },
  render() {
    return (
      <DateTimeField
        ref="sdatePicker"
        minDate={this.props.minDate}
        dateTime={this.state.dateTime}
        format={this.props.format}
        viewMode={this.props.viewMode}
        inputFormat={this.props.inputFormat}
        onChange={this.props.onChange}
        defaultText={this.props.defaultText}
      />
    );
  },
});

module.exports = SavingPotDatePicker;

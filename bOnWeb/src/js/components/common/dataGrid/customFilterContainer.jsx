const React = require('react');
const { PropTypes } = React;

const CustomFilterContainer = React.createClass({
  propTypes: {
    changeFilter: PropTypes.func,
    results: PropTypes.func,
    currentResults: PropTypes.func,
    placeholderText: PropTypes.func,
  },
  getDefaultProps() {
    return {
      'placeholderText': '',
    };
  },
  render() {
    const that = this;

    if (typeof that.props.customFilterComponent !== 'function') {
      console.log("Couldn't find valid template.");
      return (<div></div>);
    }

    return (<that.props.customFilterComponent
      changeFilter={this.props.changeFilter}
      results={this.props.results}
      currentResults={this.props.currentResults}
      placeholderText={this.props.placeholderText}
    />);
  },
});

module.exports = CustomFilterContainer;

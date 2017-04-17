
const React = require('react');
const { PropTypes } = React;

const CustomPaginationContainer = React.createClass({
  propTypes: {
    next: PropTypes.func,
    previous: PropTypes.func,
    setPage: PropTypes.func,
    maxPage: PropTypes.number,
    currentPage: PropTypes.number,
    nextText: PropTypes.string,
    previousText: PropTypes.string,
    customPagerComponentOptions: PropTypes.func,
  },
  getDefaultProps() {
    return {
      'maxPage': 0,
      'nextText': '',
      'previousText': '',
      'currentPage': 0,
      'customPagerComponent': {},
      'customPagerComponentOptions': {},
    };
  },
  render() {
    const that = this;

    if (typeof that.props.customPagerComponent !== 'function') {
      console.log("Couldn't find valid template.");
      return (<div></div>);
    }

    return (<that.props.customPagerComponent {...this.props.customPagerComponentOptions} maxPage={this.props.maxPage} nextText={this.props.nextText} previousText={this.props.previousText} currentPage={this.props.currentPage} setPage={this.props.setPage} previous={this.props.previous} next={this.props.next} />);
  },
});

module.exports = CustomPaginationContainer;

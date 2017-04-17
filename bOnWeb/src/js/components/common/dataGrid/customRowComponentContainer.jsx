
const React = require('react');
const { PropTypes } = React;

const CustomRowComponentContainer = React.createClass({
  propTypes: {
    className: PropTypes.string,
    data: PropTypes.object.isRequired,
    showPager: PropTypes.bool,
    pagingContent: PropTypes.object,
    style: PropTypes.string,
  },
  getDefaultProps() {
    return {
      'data': [],
      'metadataColumns': [],
      'className': '',
      'customComponent': {},
      'globalData': {},
    };
  },
  render() {
    const that = this;

    if (typeof that.props.customComponent !== 'function') {
      console.log("Couldn't find valid template.");
      return (<div className={this.props.className}></div>);
    }

    const nodes = this.props.data.map((row, index) => {
      return <that.props.customComponent data={row} metadataColumns={that.props.metadataColumns} key={index} globalData={that.props.globalData} />;
    });

    return (
      <div className={this.props.className} style={this.props.style}>
        {nodes}
      </div>
    );
  },
});

module.exports = CustomRowComponentContainer;

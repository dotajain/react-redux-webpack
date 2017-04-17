
const React = require('react');
const { PropTypes } = React;

const GridNoData = React.createClass({
    propTypes: {
        noDataMessage: PropTypes.string,
    },
    getDefaultProps() {
        return {
            'noDataMessage': 'No Data',
        };
    },
    render() {
        return (
            <div className="accountGridNoTransaction text-center">{this.props.noDataMessage}</div>
        );
    },
});

module.exports = GridNoData;

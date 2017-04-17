
const React = require('react');
const { PropTypes } = React;

const GridFilter = React.createClass({
    propTypes: {
        changeFilter: PropTypes.func,
        placeholderText: PropTypes.string,
    },
    getDefaultProps() {
        return {
            'placeholderText': '',
        };
    },
    handleChange(event) {
        this.props.changeFilter(event.target.value);
    },
    render() {
        return <div className="filter-container"><input type="text" name="filter" placeholder={this.props.placeholderText} className="form-control" onChange={this.handleChange} /></div>;
    },
});

module.exports = GridFilter;

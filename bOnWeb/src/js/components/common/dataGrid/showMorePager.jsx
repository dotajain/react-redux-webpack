const React = require('react');
const { PropTypes } = React;

const showMorePager = React.createClass({
    propTypes: {
        setPage: PropTypes.object,
        next: PropTypes.func,

    },
    getDefaultProps() {
        return {
            'maxPage': 0,
            'nextText': '',
            'previousText': '',
            'currentPage': 0,
        };
    },
    pageChange(event) {
        this.props.setPage(parseInt(event.target.getAttribute('data-value')));
    },
    render() {
        let next = '';

        next = <span className="show-more" onClick={this.props.next}>Show more</span>;
        return (
            <div className="row custom-pager">
                <div className="col-xs-12 right">{next}</div>
            </div>
        );
    },
});

module.exports = showMorePager;

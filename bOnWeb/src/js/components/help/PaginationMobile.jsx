/**
* @module Swipeable
*/

const React = require('react');
const { PropTypes } = React;
const PaginationDot = require('./PaginationDot');

const styles = {
    root: {
        position: 'absolute',
        bottom: 20,
        right: 50 + '%',
        display: 'flex',
        flexDirection: 'row',
        marginRight: -63 + 'px',
    },
};

const PaginationMobile = React.createClass({

    propTypes: {
        dots: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired,
        onChangeIndex: PropTypes.func.isRequired,
    },

    handleClick(event, index) {
        this.props.onChangeIndex(index);
    },

    render() {
        const {
          index,
          dots,
        } = this.props;

        const children = [];

        for (let i = 0; i < dots; i++) {
            children.push(
                <PaginationDot
                    key={i}
                    index={i}
                    active={i === index}
                    onClick={this.handleClick}
                />
            );
        }

        return (
            <div className="demo-pagination" style={styles.root}>
                {children}
            </div>
        );
    },
});

module.exports = PaginationMobile;

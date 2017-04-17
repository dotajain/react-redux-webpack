/**
* @module PaginationDot
*/
const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');

const styles = {
  root: {
    height: 18,
    width: 18,
    cursor: 'pointer',
  },
  dot: {
    backgroundColor: '#c1c1c4',
    height: 8,
    width: 8,
    borderRadius: 999,
    margin: 3,
  },
  active: {
    backgroundColor: '#8e8e93',
  },
};

const ProjectionPaginationDot = React.createClass({
  propTypes: {
    active: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  },

  handleClick(event) {
    this.props.onClick(event, this.props.index);
  },

  render() {
    const {
      active,
    } = this.props;

    let styleDot;
    let classNames;
    if (active) {
       classNames = 'paginationSwipe active';
      styleDot = _.assign({}, styles.dot, styles.active);
    } else {
      classNames = 'paginationSwipe';
      styleDot = styles.dot;
    }

    return (
      <div className={classNames} style={styles.root} onClick={this.handleClick}>
        <div style={styleDot} />
      </div>
    );
  },
});

module.exports = ProjectionPaginationDot;

/**
 * @module AboutBDashboardInfo Screen
 */
const React = require('react');
const { PropTypes } = React;

const AboutBDashboardInfo = React.createClass({
  propTypes: {
    iconName: PropTypes.string,
    heading: PropTypes.string,
    children: PropTypes.node,
  },

  render() {
    return (
      <div className="about-b-content">
        <div className="about-icon">
          { this.props.iconName !== 'icon-projections' ?
            <span className = {this.props.iconName}></span>
            :
            <img className="icon icon-projection" src="../images/b/icons/icon_projection.svg" width="25px" height="25px" />
          }
        </div>
        <div className="about-description">
          <h5>{this.props.heading}</h5>
          {this.props.children}
        </div>
      </div >
    );
  },
});
module.exports = AboutBDashboardInfo;

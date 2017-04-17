
/**
 * @module PageOverlayMenu
 */

// Packages
const React = require('react');
const { PropTypes } = React;
const AlertSweepsOverlay = React.createClass({
     propTypes: {
        createSweep: PropTypes.func,
        createAlert: PropTypes.func,
    },
	render() {
		return (
            <div className="menu-overlay">
                <input type="checkbox" id="menuOverlay2"></input>
                <div className="lower">
                    <label className="user-options" htmlFor="menuOverlay2" title="User Options">
                        <span className="icon icon-item-dots"></span>
                    </label>
                </div>
                <div className="overlay overlay-hugeinc">
                    <nav>
                        <label htmlFor="menuOverlay2"></label>
                        <ul>
                            <li><a href="#"><span onClick={this.props.createAlert}>Create Alerts</span></a></li>
                            <li><a href="#"><span onClick={this.props.createSweep}>Create Sweeps</span></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
	},
});

module.exports = AlertSweepsOverlay;

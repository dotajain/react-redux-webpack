/**
 * @module PageOverlayMenu
 */

// Packages
const React = require('react');
const PageOverlayMenuInner = React.createClass({
	render() {
		return (
            <div className='menu-overlay'>
                <input type="checkbox" id="menuOverlay-inner"></input>
                <div className="lower">
                    <label className='user-options' htmlFor="menuOverlay-inner" title="User Options">
                        <span className="icon icon-item-dots"></span>
                    </label>
                </div>
                <div className="overlay overlay-hugeinc">
                    <nav>
                        <label htmlFor="menuOverlay-inner"></label>
                        <ul>
                            <li><a href="#">Faq <span className='icon icon-help-questions'></span></a></li>
                            <li><a href="#">Logout <span className='icon icon-logout'></span></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
	},
});

module.exports = PageOverlayMenuInner;
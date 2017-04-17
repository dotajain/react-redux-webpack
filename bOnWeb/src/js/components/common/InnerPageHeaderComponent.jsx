/**
 * @module InnerPageHeaderComponent
 */

const React = require('react');
const LableWithIconComponent = require('./LableWithIconComponent');
const envConfig = require('../../../static/config');

const InnerPageHeaderComponent = React.createClass({

  
    render: function () {

        return (
            <header role="navigation">
                <div className="navigation inner">
                
                </div>
            </header>
        );
    }
})

module.exports = InnerPageHeaderComponent;
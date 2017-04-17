/**
 * @module HelpPanel
 */
const React = require('react');
const { PropTypes } = React;
const HelpPanel = React.createClass({
    propTypes: {
        onClick: PropTypes.func,
        panelName: PropTypes.string,
        panelLine: PropTypes.string,
        src: PropTypes.string,
        cssClass: PropTypes.string,
    },

    // On Click gets PanelName displayed on Panel.
    onClick() {
        this.props.onClick(this.props.panelName);
    },
    getDeafultProps: {

        width: 10,
        height: 10,
        cssClass: '',
    },
    render() {
        return (
            <panel onClick= {this.onClick}>
                <span className = {this.props.src}></span>
                <h5 className={this.props.cssClass}>{this.props.panelName}</h5>
                <p>{this.props.panelLine}</p>
            </panel>
        );
    },

});

module.exports = HelpPanel;

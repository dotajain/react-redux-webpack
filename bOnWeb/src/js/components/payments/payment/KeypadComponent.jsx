/**
 * @module KeypadComponent
 */

const React = require('react');
const ButtonComponent = require('./ButtonComponent');
const { PropTypes } = React;

const KeypadComponent = React.createClass({
    propTypes: {
        onClick: PropTypes.func,
        deleteClick: PropTypes.func,
        goToNext: PropTypes.func,
        doneDisable:PropTypes.bool,
    },

    render() {
        return (

            <div className="key-wrapper">
                <ButtonComponent bsSize="small" onClick={this.props.onClick} type="button" btnName="1"/>
                <ButtonComponent bsSize="small" onClick={this.props.onClick} type="button" btnName="2"/>
                <ButtonComponent bsSize="small" onClick={this.props.onClick} type="button" btnName="3"/>
                <ButtonComponent bsSize="small" onClick={this.props.onClick} type="button" btnName="4"/>
                <ButtonComponent bsSize="small" onClick={this.props.onClick} type="button" btnName="5"/>
                <ButtonComponent bsSize="small" onClick={this.props.onClick} type="button" btnName="6"/>
                <ButtonComponent bsSize="small" onClick={this.props.onClick} type="button" btnName="7"/>
                <ButtonComponent bsSize="small" onClick={this.props.onClick} type="button" btnName="8"/>
                <ButtonComponent bsSize="small" onClick={this.props.onClick} type="button" btnName="9"/>
                <ButtonComponent bsSize="small" onClick={this.props.onClick} type="button" btnName="."/>
                <ButtonComponent bsSize="small" onClick={this.props.onClick} type="button" btnName="0"/>
                <ButtonComponent bsSize="small" onClick={this.props.deleteClick} type="button" btnName="Delete" className="delete-button"/>
                <ButtonComponent bsSize="small" onClick={this.props.goToNext} type="button" btnName="Next" className="next"/>
            </div>


        );
    },
});

module.exports = KeypadComponent;

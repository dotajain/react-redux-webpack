/**
 * @module LableWithIconComponent
 */
const React = require('react');
const { PropTypes } = React;
const LableWithIconComponent = React.createClass({

    propTypes: {
        lableName: PropTypes.string.isRequired,
        alt: PropTypes.string,
        onClick: PropTypes.func,
        className: PropTypes.string,
    },
    componentDidMount() {
        if (this.props.className === 'active')
            this.refs.header.focus();
    },
    onClick(e) {
        e.preventDefault();
        this.props.onClick(this.props.lableName);
    },
    getDeafultProps: {
        width: 10,
        height: 10,
    },

    render() {
        return (
            <li role="presentation" >
                <a ref='header' href= "#" onClick={this.onClick} className={this.props.className}>
                    <span className={`icon icon-${this.props.alt}`}></span>
                    {this.props.lableName}
                </a>

            </li>
        );
    },
});

module.exports = LableWithIconComponent;

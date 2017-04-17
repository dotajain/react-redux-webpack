/**
 * @module Toggle
 */

// React
const React = require('react');
const { PropTypes } = React;
const classNames = require( 'classnames' ) 

const Toggle = React.createClass({
  propTypes: {
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    id: React.PropTypes.string,
    'aria-labelledby': React.PropTypes.string,
    'aria-label': React.PropTypes.string
  },

  getInitialState() {
    var checked = false;
    if ('checked' in this.props) {
      checked = this.props.checked
    } else if ('defaultChecked' in this.props) {
      checked = this.props.defaultChecked
    }
    return {
      checked: !!checked,
      hasFocus: false
    }
  },

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({checked: !!nextProps.checked})
    }
  },

  handleClick(event) {
    var checkbox = this.input
    if (event.target !== checkbox)
    {
      event.preventDefault()
      checkbox.focus()
      checkbox.click()
      return
    }

    if (!('checked' in this.props)) {
      this.setState({checked: checkbox.checked})
    }
  },

  handleFocus() {
    this.setState({hasFocus: true})
  },

  handleBlur() {
    this.setState({hasFocus: false})
  },

  render() {
    let classes = classNames('react-toggle', {
      'react-toggle--checked': this.state.checked,
      'react-toggle--focus': this.state.hasFocus,
      'react-toggle--disabled': this.props.disabled
    })

    return (
      <div className={classes} onClick={this.handleClick}>
        <div className="react-toggle-track">
          
        </div>
        <div className="react-toggle-thumb"></div>

        <input
          ref={ref => {this.input = ref;}}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          className="react-toggle-screenreader-only"
          type="checkbox"
          {...this.props} />
      </div>
    )
  }
})

module.exports = Toggle;
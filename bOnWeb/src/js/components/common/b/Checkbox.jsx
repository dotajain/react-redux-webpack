/**
 * @module RadioButton
 */

const React = require('react');

const ReactBootstrapToggle = require('react-bootstrap-toggle');

const RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} = require('react-native-simple-radio-button');

const radio_props = [
  {label: 'param1', value: 0 },
  {label: 'param2', value: 1 }
];

const RadioButton = React.createClass({
  getInitialState: function() {
    return {
      value: 0,
    }
  },
  render: function() {
    return (
        <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {this.setState({value:value})}}
        />
    );
  }
});

module.exports = RadioButton;

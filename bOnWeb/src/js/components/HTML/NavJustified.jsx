/* eslint-disable */
/**
 * @module Toggle
 */
const React = require('react');
const Nav = require('react-bootstrap/lib/Nav');
const NavItem = require('react-bootstrap/lib/NavItem');

const NavJustified = React.createClass({
  handleSelect(selectedKey) {
    alert('selected ' + selectedKey);
  },

  render() {
    return (
        <Nav bsStyle="justified" justified activeKey={1} onSelect={this.handleSelect}>
          <NavItem eventKey={1} href="/home">Nav 1</NavItem>
          <NavItem eventKey={2} title="Item">Nav 2</NavItem>
          <NavItem eventKey={3}>Nav 3</NavItem>
        </Nav>

    );
  }
});

module.exports = NavJustified;
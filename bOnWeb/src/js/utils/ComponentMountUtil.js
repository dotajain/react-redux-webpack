const React = require('react');

let isMounted = (component) => {
    try {
        ReactDOM.findDOMNode(component);
        return true;
    } catch (e) {
        return false;
    }
};


module.exports = isMounted;
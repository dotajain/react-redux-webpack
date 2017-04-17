
/**
 * From https://github.com/rackt/react-router/blob/master/docs/guides/testing.md
 *
 *   var stubRouterContext = require('./stubRouterContext');
 *   var IndividualComponent = require('./IndividualComponent');
 *   var Subject = stubRouterContext(IndividualComponent, {someProp: 'foo'});
 *   React.render(<Subject/>, testElement);
 */

const React = require('react');
const { PropTypes } = React;

// Polyfill Object Assign
if (!Object.assign) {
	Object.defineProperty(Object, 'assign', {
		enumerable: false,
		configurable: true,
		writable: true,
		value(target) {
			if (target === undefined || target === null) {
				throw new TypeError('Cannot convert first argument to object');
			}

			const to = Object(target);
			for (let i = 1; i < arguments.length; i++) {
				const nextSource = arguments[i];
				if (nextSource === undefined || nextSource === null) {
					continue;
				}

				const keysArray = Object.keys(Object(nextSource));
				for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
					const nextKey = keysArray[nextIndex];
					const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
					if (desc !== undefined && desc.enumerable) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
			return to;
		},
	});
}

const stubRouterContext = (Component, props, stubs) => {
	return React.createClass({
		childContextTypes: {
			makePath: PropTypes.func,
			makeHref: PropTypes.func,
			transitionTo: PropTypes.func,
			replaceWith: PropTypes.func,
			goBack: PropTypes.func,
			getCurrentPath: PropTypes.func,
			getCurrentRoutes: PropTypes.func,
			getCurrentPathname: PropTypes.func,
			getCurrentParams: PropTypes.func,
			getCurrentQuery: PropTypes.func,
			isActive: PropTypes.func,
		},

		getChildContext() {
			return Object.assign({
				makePath() {},
				makeHref() {},
				transitionTo() {},
				replaceWith() {},
				goBack() {},
				getCurrentPath() {},
				getCurrentRoutes() {},
				getCurrentPathname() {},
				getCurrentParams() {},
				getCurrentQuery() {},
				isActive() {},
			}, stubs);
		},

		render() {
			// Return <Home/>;
			return <Component {...props} />;
		},
	});
};

module.exports = stubRouterContext;

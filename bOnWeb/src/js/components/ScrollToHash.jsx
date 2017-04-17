const React = require('react');

const ScrollToHash = WrappedComponent => React.createClass({

	componentWillUpdate() {
		this.scrollToHash();
	},

	scrollToHash() {
		const hash = window.location.hash;

		if (hash.length > 0) {
			setTimeout(() => {
				const id = hash.substr(1);
				this.scrollToID(id);
			}, 400); // Give time for React to build the page.
		}
	},

	/**
	 * Jump the browser to the given element on the page.
	 * Ensure you call this *after* React has built the page.
	 *
	 * @param  {String} id ID of the element (no hash!)
	 */
	scrollToID(id) {
		const ele = document.getElementById(id);

		if (ele) {
			window.scrollTo(0, ele.getBoundingClientRect().top);
		}
	},

	render() {
		return (<WrappedComponent {...this.props} {...this.state} />);
	},
});

module.exports = ScrollToHash;

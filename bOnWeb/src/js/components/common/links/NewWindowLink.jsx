/**
 * @module NewWindowLink
 */

const React = require('react');
const { PropTypes } = React;

const NewWindowLink = props => {
	return (
		<a
			href={props.href}
			target={props.target}
			aria-label={props.text}
			onClick={props.onClick}
			title={props.title || props.text}
		>
				{props.text}
				<span className="screenreader">
					{props.content.newBrowserWindowTitle}
				</span>
		</a>
	);
};

NewWindowLink.propTypes = {
	content: PropTypes.object.isRequired,
	title: PropTypes.string,
	href: PropTypes.string.isRequired,
	target: PropTypes.string,
	onClick: PropTypes.func,
	text: PropTypes.string.isRequired,
};


NewWindowLink.defaultProps = {
	target: '_blank',
	onClick: () => {},
};

module.exports = NewWindowLink;

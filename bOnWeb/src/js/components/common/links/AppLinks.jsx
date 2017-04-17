/**
 * @module AppLinks
 */
const React = require('react');
const { PropTypes } = React;

const FeatureWrapper = require('../FeatureWrapper');
const NewWindowLink = require('./NewWindowLink');

const AmazonLink = FeatureWrapper(props => (
	<li key={3}>
		<NewWindowLink
			href={props.content.appLinks.amazon.link}
			text={props.content.appLinks.amazon.title}
			content={props.content}
		/>
	</li>
));

const AppLinks = props => (
	<ul>

		<li key={1}>
			<NewWindowLink
				href={props.content.appLinks.ios.link}
				text={props.content.appLinks.ios.title}
				{...props}
			/>
		</li>
		<li key={2}>
			<NewWindowLink
				href={props.content.appLinks.android.link}
				text={props.content.appLinks.android.title}
				{...props}
			/>
		</li>
		<AmazonLink
			feature="amazon-link"
			href={props.content.appLinks.amazon.link}
			text={props.content.appLinks.amazon.title}
			content={props.content}
		/>

	</ul>
);

AppLinks.propTypes = {
	content: PropTypes.object,
};

module.exports = FeatureWrapper(AppLinks);


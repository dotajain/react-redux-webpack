jest.unmock('../ReadOnlyQuestion');
jest.unmock('../../../../config');
jest.unmock('../../../../config/FormOptions');

const config = require('../../../../config');
const StaticParagraphQuestion = require('../StaticParagraphQuestion');
const ReadOnlyQuestion = require('../ReadOnlyQuestion');

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<ReadOnlyQuestion
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('ReadOnlyQuestion', () => {

	const executeTest = testCase => {
		it(testCase.desc, () => {
			const component = shallowRender({
				readOnly: 'yes',
				label: 'Title',
				children: (<h1 name='child' data={config.validTitles} defaultValue={testCase.defaultValue}></h1>)
			});

			expect(component).toEqualJSX(
				<div>
					<StaticParagraphQuestion
						className=""
						mainColumnSize={undefined}
						name="child"
						label={undefined}
						defaultValue={testCase.defaultValue}
						readonlyValue={testCase.expected}
						data={config.validTitles}
					>
					</StaticParagraphQuestion>
				</div>
			);
		});
	};

	const testCases = [{
		desc: 'when default salutation set to MR it should render Mr',
		defaultValue: 'MR',
		expected: 'Mr',
	}, {
		desc: 'when default salutation set to MRS it should render Mrs',
		defaultValue: 'MR',
		expected: 'Mr',
	}, {
		desc: 'when default salutation set to MS it should render Ms',
		defaultValue: 'MS',
		expected: 'Ms',
	}, {
		desc: 'when no default salutation set to MS it should not render a value',
	}];

	testCases.forEach(executeTest);
});

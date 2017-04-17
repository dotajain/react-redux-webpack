jest.unmock('../IsWebChallenge');
jest.unmock('../../../../utils/ChallengeUtils');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const IsWebChallenge = require('../IsWebChallenge');

const WrappedComponent = props => {
	return (<h1>WrappedComponent</h1>);
};

const HOC = IsWebChallenge(WrappedComponent);

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);


describe('IsWebChallenge', () => {

	const testCases = [{
		desc: 'when challenged with web challeng it should not log error',
		expected: 0,
		challenge: {
			'acn': {},
		},
	}];

	const executeTest = (testCase) => {
		it(testCase.desc, () => {
			spyOn(console, 'error');

			const props = {
				session: {
					challenge: {
						auth_schemes: [{
							challenges: {
								...testCase.challenge,
							}
						}]
					}
				}
			};

			TestUtils.renderIntoDocument(<HOC {...props} />, container)

			expect(console.error.calls.count()).toBe(testCase.expected);
		});
	};

	testCases.forEach(executeTest);
});

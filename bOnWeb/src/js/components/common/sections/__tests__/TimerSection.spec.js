
jest.unmock('moment');
jest.unmock('../../ComponentHeader');
jest.unmock('../TimerSection');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const TimerSection = require('../TimerSection');

const container = document.createElement('div');
const render = (comp) => ReactDOM.render(comp, container);

describe('TimerSection', function() {
	describe('Rendering Tests', function() {
		it('Renders with 3 minute time markers + final marker', function() {
			const timerSection = render(
				<TimerSection initialTimeRemaining={180000} />
			);
			const li = TestUtils.scryRenderedDOMComponentsWithTag(timerSection, 'li');
			expect(li.length).toBe(4);
		});
		it('Renders with 5 minute time markers + final marker', function() {
			const timerSection = render(
				<TimerSection initialTimeRemaining={300000} />
			);
			const li = TestUtils.scryRenderedDOMComponentsWithTag(timerSection, 'li');
			expect(li.length).toBe(6);
		});
		it('Renders with 3 second time markers + final marker', function() {
			const timerSection = render(
				<TimerSection initialTimeRemaining={3000} asTimeUnit='seconds' />
			);
			const li = TestUtils.scryRenderedDOMComponentsWithTag(timerSection, 'li');
			expect(li.length).toBe(4);
		});
	});

	describe('Countdown', function() {
		it('doens\'t reset when our props change', function(done) {
			const initialTime = 3000;
			let timerComponent = render(<TimerSection initialTimeRemaining={initialTime} asTimeUnit='seconds' />);
			done();
			jest.runAllTimers();

			timerComponent = render(<TimerSection initialTimeRemaining={initialTime} asTimeUnit='seconds' />);
			expect(timerComponent.state.timeRemaining).toBeLessThan(timerComponent.props.initialTimeRemaining);
		});
	});

	describe('Completion CallBack Test', function() {
		it('Calls the given callback on countdowncomplete', function(done) {
			const myMockCallback = jest.fn();
			const timerSection = render(
				<TimerSection initialTimeRemaining={1000} asTimeUnit='seconds' completeCallback={myMockCallback}/>
			);
			expect(myMockCallback).not.toBeCalled();
			done();
			jest.runAllTimers();
			expect(myMockCallback).toBeCalled();
		});
	});


});

'use strict';

jest.unmock('../../constants/NBAConstants');
jest.unmock('../NBAStore');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const NBAApiUtils = require('../../utils/NBAApiUtils');
const NBAConstants = require('../../constants/NBAConstants');
const NBAStore = require('../NBAStore');
const NBAActionCreator = require('../../actions/NBAActionCreator');


describe('NBA Store test cases', () => {
	let callback = AppDispatcher.register.mock.calls[0][0];
	let result;
	let getNBAData = () => ({
		action: {
			actionType: NBAConstants.GET_NBA_DATA,
			data:[]
		}
	});
	let handleNBADataSuccess = (data) => ({
		action: {
			actionType: NBAConstants.GET_NBA_DATA_SUCCESS,
			data
		}
	});
	let handleNBADataError = (data) => ({
		action: {
			actionType: NBAConstants.GET_NBA_DATA_ERROR,
			data
		}
	});
	let nbaClose = () => ({
		action: {
			actionType: NBAConstants.NBA_CLOSE,
		}
	})
	describe('Api call for NBA data', () => {
		callback(getNBAData());

		result = NBAStore.getAll();
		it('should make api call', () => {
			expect(NBAApiUtils.getNBAData.mock.calls.length).toBe(1);
		});


	});
	describe('get all test cases success', () => {
		let _nbaData = {
			"containers": [
				{
					"insights":
					[{
						"text_content": {
							"header": "Mortgage Payment Tips",
							"text": "Did you know you can change your mortgage payment date? Call us on 0845 602 5450 to find out more."
						}
					}
					]
				}
			]
		};
		beforeEach(() => {
			callback(handleNBADataSuccess(_nbaData));
			result = NBAStore.getAll();
		});
		it('should have a NBA Data value', () => {
			expect(result).toEqual(_nbaData);
		})
		it('should have a NBA Header value', () => {
			expect(NBAStore.getHeader()).toEqual(_nbaData.containers[0].insights[0].text_content.header);
		})
		it('should have a NBA Text value', () => {
			expect(NBAStore.getContent()).toEqual(_nbaData.containers[0].insights[0].text_content.text);
		});
	});
	describe('get all test cases error', () => {
		let error = {
			error: "Something went wrong"
		};
		beforeEach(() => {
			callback(handleNBADataError(error));
			result = NBAStore.getAll();
		});
		it('should have blank NBA', () => {
			expect(result.length).toBe(0);
		})

	})
	describe('nbaClose', () => {nbaClose
		beforeEach(() => {
			callback(nbaClose());
		});
		it('should have blank NBA', () => {
			expect(NBAStore.getHeader()).toBeUndefined();
		})

	})
		describe('removeChangeListener', () => {
			const props = {
				content: {

				},
			};
			it('calls for the removeChangeListener', () => {
				let node = document.createElement('div');

				const render = (comp, el) => ReactDOM.render(comp, el);
				//component = ReactDOM.render(<NBAStore />, node);
				NBAStore.removeChangeListener(jest.fn())

				expect(EventEmitter.listenerCount.length).toBe(2);
			});


		});

		describe('addChangeListener', () => {
			const props = {
				content: {

				},
			};
			it('calls for the addChangeListener', () => {

				NBAStore.addChangeListener(jest.fn())
				expect(EventEmitter.listenerCount.length).toBe(2);
			});


		});
});

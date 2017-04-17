'use strict';

jest.unmock('../RetrieveCurrentUser');

// React
var React = require('react');
const ReactDOM = require('react-dom');
var _ = require('lodash');
var TestUtils = require('react-addons-test-utils');

var RetrieveCurrentUser = require('../RetrieveCurrentUser');
var SessionActionCreator = require('../../actions/SessionActionCreator');
var Router = require('react-router');
var Route = Router.Route;
var TestLocation = require('react-router/lib/locations/TestLocation');

const WrappedComponent = props => {
	return (<h1>WrappedComponent</h1>);
};

const HOC = RetrieveCurrentUser(WrappedComponent);

const container = document.createElement('div');

describe('RetrieveCurrentUser', () => {

	let instance;
	const container = document.createElement('div');
	var component;
	var props = {
		data: {
			isExistingCustomer: 'No'
		},
		session: {
			authenticated: false,
			userName: null,
			retrievedUser: false,
		}
	}

	const renderComponent = newProps => {
		return TestUtils.renderIntoDocument(
			<HOC
				{...props}
				{...newProps}
			/>, container)
	};

	beforeEach(() => {
		SessionActionCreator.getCurrentUser.mockClear();
	});

	afterEach(() => {
		instance = undefined;
	});

	describe('getInitialState()', () => {
		it('sets fetching as false', () => {
			instance = renderComponent({});

			expect(instance.state).toEqual({
				fetching: false
			});
		});
	});

	describe('on mount', () => {

		describe('WHEN we need to fetch details', () => {
			beforeEach(() => {

				instance = renderComponent({
					data: {
						isExistingCustomer: 'Yes'
					},
					session: {
						authenticated: true,
						userName: null,
						retrievedUser: false,
					}
				});
			});

			it('will set fetching to true', () => {
				expect(instance.state).toEqual({
					fetching: true
				});
			});

			it('will trigger getCurrentUser call', () => {
				expect(SessionActionCreator.getCurrentUser.mock.calls.length).toBe(1);
			});
		});
	});

	describe('requiredToBeRetrieved', () => {
		beforeEach(() => {
			instance = renderComponent(props);
		});

		it('return true WHEN not an existing customer but has authenticated', () => {
			expect(instance.requiredToBeRetrieved({
				data: {
					isExistingCustomer: 'No'
				},
				session: {
					authenticated: true,
					retrievedUser: false,
				}
			}, instance.state)).toBe(true);
		});

		it('return false WHEN not authenticated', () => {
			expect(instance.requiredToBeRetrieved({
				data: {
					isExistingCustomer: 'Yes'
				},
				session: {
					authenticated: false,
					userName: 'test',
					retrievedUser: true,
				}
			}, instance.state)).toBe(false);
		});

		it('return false WHEN we have no user details', () => {
			expect(instance.requiredToBeRetrieved({
				data: {
					isExistingCustomer: 'Yes'
				},
				session: {
					authenticated: false,
					userName: null,
					retrievedUser: false,
				}
			}, instance.state)).toBe(false);
		});

		it('return true WHEN all criteria is met', () => {
			expect(instance.requiredToBeRetrieved({
				data: {
					isExistingCustomer: 'Yes'
				},
				session: {
					authenticated: true,
					userName: null,
					retrievedUser: true,
				}
			}, instance.state)).toBe(false);
		});
	});

	describe('WHEN props are updated', () => {
		describe('AND fetching and have a username', () => {
			beforeEach(() => {
				instance = renderComponent({
					data: {
						isExistingCustomer: 'Yes'
					},
					session: {
						authenticated: true,
						userName: "test",
						retrievedUser: true,
					}
				});
			});

			it('will reset fetching to false', () => {

				expect(instance.state).toEqual({
					fetching: false
				});
			});
		});
	});
});

'use strict';

jest.unmock('../AccountDetailsExpansion');


const React = require('react');
const ReactDOM = require('react-dom');
const AccountDetailsExpansion = require('../AccountDetailsExpansion');
const Helmet = require('react-helmet');
const TestUtils = require('react-addons-test-utils');

const FinancialStoriesStore = require('../../../stores/FinancialStoriesStore');
const AccountDetailsMoreInformation = require('../AccountDetailsMoreInformation');
const AccountDetailsMoreInformationDisClaimer = require('../AccountDetailsMoreInformationDisClaimer');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<AccountDetailsExpansion
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('Account Details Expansion', () => {
	describe('account type current', () => {
		let props = {
			content: {
				current: 'current',
			},
			onNextAccountDetails: () => { },
			hideMoreInformation: true,
		};
		let state = {
			accountDetails: {
				accountType: 'current',
			}
		}
		FinancialStoriesStore.getState.mockReturnValue(state);
		let component = shallowRender(props);
	})
	describe('account type credit card', () => {
		let props = {
			content: {
				creditCard: 'credit_card',
			},
			onNextAccountDetails: () => { },
			hideMoreInformation: true,
		};
		let state = {
			accountDetails: {
				accountType: 'credit_card',
			}
		}
		FinancialStoriesStore.getState.mockReturnValue(state);
		let component = shallowRender(props);
		
	})
	describe('account type savings', () => {
		let props = {
			content: {
				savings: 'savings',
			},
			onNextAccountDetails: () => { },
			hideMoreInformation: true,
		};
		let state = {
			accountDetails: {
				accountType: 'savings',
			}
		}
		FinancialStoriesStore.getState.mockReturnValue(state);
		let component = shallowRender(props);
		
	})
	describe('account type savings', () => {
		let props = {
			content: {
			},
			onNextAccountDetails: () => { },
			hideMoreInformation: true,
		};
		let state = {
			accountDetails: {
				accountType: 'savings',
			}
		}
		FinancialStoriesStore.getState.mockReturnValue(state);
		let component = shallowRender(props);
		
	})
	describe('functions testing', () => {
		it('should call receive props', () => {
			let props = {
				content: {},
				onNextAccountDetails: () => { },
				hideMoreInformation: true,
			};
			let node = document.createElement('div');
			let instance = ReactDOM.render(<AccountDetailsExpansion {...props} />, node);
			instance.componentWillReceiveProps();
			expect(instance.state.arrow).toEqual('icon icon-down');
		})

		it('should call receive props covering else condition', () => {
			let props = {
				content: {},
				onNextAccountDetails: () => { },
				hideMoreInformation: false,
			};
			let node = document.createElement('div');
			let instance = ReactDOM.render(<AccountDetailsExpansion {...props} />, node);
			instance.componentWillReceiveProps();
			expect(instance.state.arrow).toEqual('icon icon-down');
		})

		it('should call getAccountDisplayNumber', () => {
			let props = {
				content: {},
				onNextAccountDetails: () => { },
				hideMoreInformation: false,
			};

			let state = {
				accountDetails: false
			}
			FinancialStoriesStore.getState.mockReturnValue(state);
			let node = document.createElement('div');
			let instance = ReactDOM.render(<AccountDetailsExpansion {...props} />, node);
			instance.getAccountDisplayNumber();
			//	expect(instance.state.arrow).toEqual('icon icon-down');
		})

		it('should set state on event', () => {
			let props = {
				content: {},
				onNextAccountDetails: () => { },
				hideMoreInformation: true,
			};
			let node = document.createElement('div');
			let event = {
				target: {
					value: 'Hello',
				},
				preventDefault: jest.fn(),
			}
			let instance = ReactDOM.render(<AccountDetailsExpansion {...props} />, node);
			instance.setState({ open: false });
			instance.showAndHideInformation(event);
			expect(instance.state.arrow).toEqual('icon icon-down');

		})
		it('should set state on event', () => {
			let props = {
				content: {},
				onNextAccountDetails: () => { },
				hideMoreInformation: true,
			};
			let node = document.createElement('div');
			let event = {
				target: {
					value: 'Hello',
				},
				preventDefault: jest.fn(),
			}
			let instance = ReactDOM.render(<AccountDetailsExpansion {...props} />, node);
			instance.setState({ open: true });
			instance.showAndHideInformation(event);
			expect(instance.state.arrow).toEqual('icon icon-up');

		})
	})
})	
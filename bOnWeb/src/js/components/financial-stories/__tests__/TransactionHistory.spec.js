'use strict';

jest.unmock('../TransactionHistory');
import { Col, Tab, Nav, NavItem } from 'react-bootstrap/lib';


const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const CustomeDatePicker = require('../CustomeDatePicker');

const TransactionHistory = require('../TransactionHistory');
const TransactionHistoryGrid = require('./../transactonHistory/TransactionHistoryGrid');

const _ = require('lodash');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TransactionHistory
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('Transaction History page test cases', () => {
    let component;

    let props = {
        activeClassIndex: '',
        onTransactionDateChange: jest.fn(),
        index: '',
        data: {
            id: '',
            type: '',
        },
    };

    let startDate = '';
    let endDate = '';

    beforeEach(() => {
        component = TestUtils.renderIntoDocument(
            <TransactionHistory	{...props}
                />
        );
    });

    it('should cover account click fxn', () => {

        component.onTransactionDateChange(startDate, endDate);
        expect(component.props.onTransactionDateChange.mock.calls.length).toBe(1);
    });
});

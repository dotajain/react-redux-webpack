'use strict';
jest.unmock('../AccountComponent');
jest.mock('../../../stores/AccountsStore');
jest.unmock('../../../utils/NumberUtils');
const AccountComponent = require('../AccountComponent');
const AccountsStore = require('../../../stores/AccountsStore');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

describe('Account Component Test Cases', () => {
  describe('Account Sequential Color', () => {
    const props = {
      content: {
        accountBalanceUnavailable: 'Balance unavailable',
        accountTapToReload: 'Click to reload',
        accountBalanceCurrent: 'current',
        accountBalanceAvailable: 'available',
      },
      data: {

        "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
        "type": "loan",
        "product": {
          "code": "901",
          "name": "Personal Loan",
          "description": "Personal Loan"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "650000",
        "number": "22446699",
        "metadata": {
          "display_name": "Loan Account"
        }
      },
    };

    const colorTesting = (props, key) => {
      const component = TestUtils.renderIntoDocument(<AccountComponent data={props.data} index={key} content={props.content}/>);
      key = (key % 10) + 1;
      let className = 'account account-' + key + ' active';
      let clsColor = TestUtils.findRenderedDOMComponentWithClass(component, className);
      it('should display Account with sequential color ' + key, () => {
        expect(clsColor).toBeDefined();
      });
    }
    for (var key = 0; key < 30; key++) {
      colorTesting(props, key);
    }
  })
});


describe('to check get state', () => {
  let props1 = {
    content: {
        accountBalanceUnavailable: 'Balance unavailable',
        accountTapToReload: 'Click to reload',
        accountBalanceCurrent: 'current',
        accountBalanceAvailable: 'available',
      },
    data: {

      "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
      "type": "loan",
      "product": {
        "code": "901",
        "name": "Personal Loan",
        "description": "Personal Loan"
      },
      "actions_available": {
      },
      "bank_id": "CB",
      "sort_code": "650000",
      "number": "22446699",
      "metadata": {
        "display_name": ''
      }
    },
  };
  it('metadata type to be', () => {
    props1.data.metadata.display_name = null;

    let instance = TestUtils.renderIntoDocument(
      <AccountComponent {...props1} />
    );
    instance.setState({error: false, load: true});

    let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
    expect(header.textContent).toBe('Personal Loan')
  });

  it('metadata type not to be', () => {
    props1.data.metadata.display_name = 'Personal';
    let instance = TestUtils.renderIntoDocument(
      <AccountComponent {...props1} />
    );
    instance.setState({error: false, load: true});

    let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
    expect(header.textContent).toBe('Personal')

  });

  it('metadata type not to be', () => {
    props1.data.type = 'credit_card';
    let instance = TestUtils.renderIntoDocument(
      <AccountComponent {...props1} />
    );
    instance.setState({error: false, load: true});

    let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
    expect(header.textContent).toBe(' 2244 6699  6699')
  });

});

describe('componentDidMount', () => {
		let props = {
      content: {
        accountBalanceUnavailable: 'Balance unavailable',
        accountTapToReload: 'Click to reload',
        accountBalanceCurrent: 'current',
        accountBalanceAvailable: 'available',
      },
    data: {
      "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
      "type": "loan",
      "product": {
        "code": "901",
        "name": "Personal Loan",
        "description": "Personal Loan"
      },
      "actions_available": {
      },
      "bank_id": "CB",
      "sort_code": "650000",
      "number": "22446699",
      "metadata": {
        "display_name": ''
      }
    },
  };
 
  it('check current amount', () => {
    let instance = TestUtils.renderIntoDocument(
      <AccountComponent {...props} />
    );

    instance.setState({curAmount: 50000, load: true, error: false});    

    let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h2');
    expect(header.textContent).toBe('£50,000.00 current');

  });

  it('check current amount blank', () => {
    props.data.id="0855dae-d2de-4ebc-ab0a-2fd0e9556e16";
    let instance = TestUtils.renderIntoDocument(
      <AccountComponent {...props} />
    );
    instance.setState({error: true, load: true});
    instance.componentDidMount();

    let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h4');
    console.log(header);
    expect(header.textContent).toBe('Click to reload');

  });


});







/*jest.unmock('../TransactionHistoryDateRangePicker');
const React = require('react');
const moment = require('moment');
const TestUtils = require('react-addons-test-utils');
const TransactionHistoryDateRangePicker = require('../TransactionHistoryDateRangePicker');
const { buildContent } = require('../../../../__helpers__/TestHelpers');
const shallowRenderer = TestUtils.createRenderer();
const DateRangePicker = require('react-bootstrap-daterangepicker');
const BS = require('react-bootstrap');


let props = {
	onTransactionDateChange: jest.fn(),
    ranges: 'ranges',
};

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<TransactionHistoryDateRangePicker content={this.props.content} />);
	return shallowRenderer.getRenderOutput();
};

xdescribe('when a user clicked on AboutB Panel', () => {
	const contentthreeMonths = buildContent(['threeMonths']);
	let instance;
	const content = {
		threeMonths: 'PropTypes.string.isRequired',
	};


	beforeEach(() => {
		instance = TestUtils.renderIntoDocument(
			<TransactionHistoryDateRangePicker {...props}
				content={content}
				/>
		);
	});

	it('email pop will be open with with heading', () => {
		expect(contentthreeMonths.threeMonths.length).toBe(11);
	});

	it('email pop will be open with with heading', () => {
		let event;
		let picker = {
			startDate: moment().subtract(3, 'months'),
			endDate: moment(),
			startLabel: 'startLabel',
		};
		instance.onApply(event, picker);

	});

	it('email pop will be open with with heading', () => {
		let ranges = {
			start: 'start',
			end: 'end',
		};

	});
	it('email pop will be open with with heading', () => {
		props.ranges = '';

	});


});

*/
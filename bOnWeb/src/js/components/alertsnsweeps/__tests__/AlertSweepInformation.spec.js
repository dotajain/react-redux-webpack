jest.unmock('../AlertSweepInformation');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const AlertsNSweepsActionCreator = require('../../../actions/AlertsNSweepsActionCreator');
const SweepsActionCreator = require('../../../actions/SweepsActionCreator');
const AlertsActionCreator = require('../../../actions/AlertsActionCreator');
const ProjectionsActionCreator = require('../../../actions/ProjectionsActionCreator');
const AlertsNSweepsStore = require('../../../stores/AlertsNSweepsStore');
const AlertSweepInformation = require('../AlertSweepInformation');
const Toggle = require('../../common/Toggle');
const ReactDOM = require('react-dom');
const { PropTypes } = React;
const ALERT = 'alert';
const SWEEP = 'sweep';
const PROJECTION = 'projection';

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<AlertSweepInformation
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};
AlertsNSweepsStore.getAccountColour.mockReturnValue({accntClass:"asdasd"});

describe('AlertSweepInformation Test Cases check', () => {
	let instance;
	let props;
	beforeEach(() => {
		props = {
			toggleCheck:'true',
			content: {
				

            },
            data: {
            },
		}
		instance = shallowRender(props);
	});

	it('render a standard modal with child elements', () => {
		instance = shallowRender(props);
        expect(instance).toEqualJSX(
			 <li className="">
  <section
    className="alert-icon asdasd"
    onClick={function noRefCheck() {}}
  >
    <span className="icon icon-alerts" />
  </section>
  <section
    className="alert-title asdasd"
    onClick={function noRefCheck() {}}
  >
    <h3 />
    <p
      className="alertSentencePara"
      dangerouslySetInnerHTML={{__html: undefined}}
    />
  </section>
  <section>
    <div className="toggle">
      <Toggle
        ref="alertsFlag"
        aria-label="No label tag"
        checked="true"
        defaultChecked="true"
        onChange={function noRefCheck() {}}
      />
    </div>
  </section>
</li>
		)
	});

	describe('To check alertInfoClick Function', () => {
		let instance;
		let props = {
			type: 'type',
			headerName: 'headerName',
			alertInfoClick: jest.fn(),
			data: {
				id: 'id',
			},
		};

		let component = TestUtils.renderIntoDocument(<AlertSweepInformation  {...props}/>
		);
		it('calls for the alertInfoClick function', () => {
			component.alertInfoClick();
		});
	});

	describe('To check checked function with sweep', () => {


		let e = {
			target: {
				checked: 'checked',
			}
		}
		let name = 'name';

		let props = {
			data: {
				type: 'sweep',
			},
			thresholdAmount: 123,
			lessMore: 'lessMore',
			toggleClick: jest.fn(),
		};

		let component = TestUtils.renderIntoDocument(<AlertSweepInformation  {...props}/>
		);

		it('calls for the checked function', () => {
			component.checked(name, e);
		});

		it('calls for the checked function else part', () => {
			let props = {
				data: {
					type: 'alert',
				},
				thresholdAmount: 123,
				lessMore: 'lessMore',
				toggleClick: jest.fn(),
			};
			let component = TestUtils.renderIntoDocument(<AlertSweepInformation  {...props}/>
			);
			component.checked(name, e);
		});

		it('calls for the checked function else part', () => {
			let props = {
				data: {
					type: 'projection',
				},
				thresholdAmount: 123,
				lessMore: 'lessMore',
				toggleClick: jest.fn(),
			};
			let component = TestUtils.renderIntoDocument(<AlertSweepInformation  {...props}/>
			);
			component.checked(name, e);
		});

		it('calls for the checked function else part', () => {
			let props = {
				data: {
					type: 'default',
				},
				thresholdAmount: 123,
				lessMore: 'lessMore',
				toggleClick: jest.fn(),
			};
			let component = TestUtils.renderIntoDocument(<AlertSweepInformation  {...props}/>
			);
			component.checked(name, e);
		});

		it('calls for the toggleClick', () => {
			let props = {
				data: {
					type: 'default',
				},
				thresholdAmount: 123,
				lessMore: 'lessMore',
				toggleClick: jest.fn(),
			};
			let component = TestUtils.renderIntoDocument(<AlertSweepInformation  {...props}/>
			);
			let e = {
				target: {
					checked: false,
				}
			}
			component.checked(name, e);
		});
	});

});

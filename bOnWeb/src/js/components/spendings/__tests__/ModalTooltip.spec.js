jest.unmock('../ModalTooltip');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ModalTooltip = require('../ModalTooltip');
const Modal = require('react-bootstrap/lib/Modal');

let component;
let props;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<ModalTooltip
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('ModalTooltip Test Cases', () => {

	beforeEach(()=>{
		props = {
			message: "Hello",
		}
		component = shallowRender(props);
	});

	it('ModalTooltip : Unit Test Case 1 : toBedefined',()=>{
		expect(component).toBeDefined();
	});

	it('ModalTooltip : Unit Test Case 2 : toEqualJSX',()=>{
		expect(component).toEqualJSX(<Modal {...props} bsSize="small" aria-labelledby="contained-modal-title-sm" className="modalTooltip" keyboard={false} backdrop="static">
        <Modal.Body>
          {props.message}
        </Modal.Body>
      </Modal>);
	})
});
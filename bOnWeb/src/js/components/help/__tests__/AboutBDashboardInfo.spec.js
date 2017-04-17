jest.unmock('../AboutBDashboardInfo');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const AboutBDashboardInfo = require('../AboutBDashboardInfo');
const { buildContent } = require('../../../__helpers__/TestHelpers');
const shallowRenderer = TestUtils.createRenderer();

let props = {
	iconName: 'iconName',
	heading: 'heading',
	children: 'heading',
};

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<AboutBDashboardInfo content={this.props.heading} {...props}/>);
	return shallowRenderer.getRenderOutput();
};

describe('when a user clicked on AboutBDashboardInfo Panel', () => {
	const contentheading = buildContent(['heading']);
	let instance;
	let component;
	const content = {
		iconName: 'PropTypes.string.isRequired',
		heading: 'PropTypes.string.isRequired',
		children: 'PropTypes.node.isRequired',
	};

	beforeEach(() => {
		instance = TestUtils.renderIntoDocument(
			<heading
				content={content}
				/>
		);

	});

	it('email pop will be open with with heading', () => {
		expect(contentheading.heading.length).toBe(7);
	});


	describe('when a user clicked on AboutBDashboardInfo Panel', () => {
		beforeEach(() => {
			let props1 = {
				iconName: 'iconName',
				heading: 'heading',
				children: 'heading',
			};
			shallowRenderer.render(<AboutBDashboardInfo {...props1} />);
			component = shallowRenderer.getRenderOutput();
		});

		it('should do change on store', () => {
			expect(component).toEqualJSX(
				 <div className="about-b-content">
  <div className="about-icon">
     <span className="iconName" />
   </div>
   <div className="about-description">

     <h5>
       heading
     </h5>
     heading
   </div>
 </div>

			)
		});

		it('should do change on store', () => {

			let props1 = {
				iconName: 'icon-projections',
				heading: 'heading',
				children: 'heading',
			};
			shallowRenderer.render(<AboutBDashboardInfo {...props1} />);
			component = shallowRenderer.getRenderOutput();
			expect(component).toEqualJSX(
  <div className="about-b-content">
    <div className="about-icon">

     <img
       className="icon icon-projection"

       height="35px"

       src="../images/b/icons/icon_projection.svg"

        width="35px"

     />
   </div>

    <div className="about-description">


     <h5>
       heading
     </h5>
     heading
   </div>
 </div>

			)
		});
	});

});

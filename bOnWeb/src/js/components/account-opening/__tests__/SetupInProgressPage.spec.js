jest.unmock('../SetupInProgressPage');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const Helmet = require('react-helmet');
const SetupInProgressPage = require('../SetupInProgressPage');
const ResultSection = require('../../common/sections/ResultSection');
const PageHeader = require('../../common/PageHeader');

const BrandUtils = require('../../../utils/BrandUtils');
const ProductUtils = require('../../../utils/ProductUtils');
const ContentUtils = require('../../../utils/ContentUtils');

const shallowRenderer = TestUtils.createRenderer();

describe('SetupInProgressPage', () => {
	describe('render', () => {
		let result;
		const props = {
			content: {
				landingPageTitle : 'You\'re applying for a ',
				setupInProgressHeader : 'Setup',
				setupInProgressTitle : 'Sorry, there\'s been a slight technical hitch',
			},
			data: {},
		};

		beforeEach(() => {
			const component = (<SetupInProgressPage {...props}/>);

			BrandUtils.isAbleToDisplay.mockReturnValue(true);
			BrandUtils.getResultImage.mockReturnValue('src/image.jpg');
			ProductUtils.getName.mockReturnValue('test name');
			ContentUtils.getContentParagraphs.mockReturnValue('Test');

			shallowRenderer.render(component);
			result = shallowRenderer.getRenderOutput();
		});

		it('returns a valid component', () => {
			expect(result).toEqualJSX(
				<div className="account-opening result-page-wrapper deferred-page-wrapper container-fluid">
					<Helmet title="Setup" />
					<PageHeader visible={true}
								title="You're applying for a test name"
								content={props.content} />
					<div className="result-page deferred-page" role="main">
						<div className="row text-center">
							<div className="col-xs-12">
								<ResultSection
									imgSrc="src/image.jpg"
									imgAlt="Setup in Progress"
									title="Sorry, there's been a slight technical hitch" >
									Test
								</ResultSection>
							</div>
						</div>
					</div>
				</div>
			);
		});
	});
});


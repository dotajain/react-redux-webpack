jest.unmock('../CaseItem');
jest.unmock('../../../../utils/DateUtils');
jest.unmock('../../../../utils/TaskUtils');
jest.unmock('react-router');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const _ = require('lodash');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const ProductUtils = require('../../../../utils/ProductUtils');
const BrandUtils = require('../../../../utils/BrandUtils');

const CaseItem = require('../CaseItem');
const ComponentHeader = require('../../../common/ComponentHeader');
const Link = require('react-router').Link;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<CaseItem
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('CaseItem', () => {
	describe('when initially rendering valid product', () => {
		let result;

		beforeEach(() => {
			BrandUtils.getResultImage.mockReturnValue(true);
			ProductUtils.getProduct.mockReturnValue({
				productType: { urlPart: 'testing', }
			});

			result = shallowRender({
				caseIndex: 0,
				data: {
					username: "ugLzEzWP2vlhzZTS",
				},
				caseItem: {
					id: "CS-1003512",
					description: "B Current Account Opening",
					status: "Application Submission",
					uri: "case:\/\/csap\/existing\/CS-1003512",
					created_at: 1459435573000,
					updated_at: 1459435573000,
					context: {
						customers: [{
							customer_number: "1097265540",
							user_name: "ugLzEzWP2vlhzZTS",
							name: {
								last_name: "Lily",
								first_name: "Keith"
							}
						}],
						accounts: [{
							sort_code: null,
							account_number: null,
							product: {
								code: "136",
								name: "B CURRENT ACCOUNT"
							}
						}],
						parties: []
					}
				}
			});
		})

		it('should render correctly', () => {
			expect(result).toEqualJSX(
				<div className="col-xs-12">
					<article className="case-item">
						<ComponentHeader
							title="B Current Account Opening"
							titleLevel={2}
							wrapperClass="">
							<div className="row">
								<div className="col-xs-12">
									<div className="case-item-details">
										<b>Details</b>
										<br />
										Case ID: CS-1003512
										<br />
										Started on: 31-03-2016
										<br />
										<b>Applicants:</b>
										<br />
										<div className="applicant-details">
											Name: Keith Lily (ugLzEzWP2vlhzZTS)
											<br />
											Customer Number: 1097265540
										</div>
									</div>
								</div>
								<div className="col-xs-12 resume-button-container">
									<Link
										activeClassName="active"
										className="btn btn-primary btn-lg btn-open"
										data-anchor="resume-case-0"
										onClick={() => {}}
										to="account-opening/submission?caseId=CS-1003512&type=testing">
										Resume
									</Link>
								</div>
							</div>
						</ComponentHeader>
					</article>
				</div>
			);
		});
	});

	describe('WHEN an invalid product', () => {
		let result;

		beforeEach(() => {
			BrandUtils.getResultImage.mockReturnValue(true);
			ProductUtils.getProduct.mockReturnValue({});

			result = shallowRender({
				caseIndex: 0,
				data: {
					username: "ugLzEzWP2vlhzZTS",
				},
				caseItem: {
					id: "CS-1003512",
					description: "B Current Account Opening",
					status: "Application Submission",
					uri: "case:\/\/csap\/existing\/CS-1003512",
					created_at: 1459435573000,
					updated_at: 1459435573000,
					context: {
						customers: [{
							customer_number: "1097265540",
							user_name: "ugLzEzWP2vlhzZTS",
							name: {
								last_name: "Lily",
								first_name: "Keith"
							}
						}],
						accounts: [{
							sort_code: null,
							account_number: null,
							product: {
								code: "136",
								name: "B CURRENT ACCOUNT"
							}
						}],
						parties: []
					}
				}
			});
		})

		it('should NOT render a case item', () => {
			expect(result).toBe(null);
		});
	});
});

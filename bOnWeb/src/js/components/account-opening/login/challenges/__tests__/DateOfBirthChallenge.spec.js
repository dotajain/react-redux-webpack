jest.unmock('../../../../common/questionsets/MultiTextQuestion');
jest.unmock('../../../../common/questionsets/DatePickerQuestion');
jest.unmock('../DateOfBirthChallenge');
jest.unmock('../../../../../utils/EncryptionUtils');

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const SessionActionCreator = require('../../../../../actions/SessionActionCreator');

const DatePickerQuestion = require('../../../../common/questionsets/DatePickerQuestion');
const DateOfBirthChallenge = require('../DateOfBirthChallenge');
const ProductUtils = require('../../../../../utils/ProductUtils');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<DateOfBirthChallenge
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('when a user has date of birth challenge', () => {

	let component;
	let props;
	
	beforeEach(() => {
		ProductUtils.getMinAge.mockReturnValue(18);
		ProductUtils.getMaxAge.mockReturnValue(99);

		props = {
			data:{productCode: 'test'},
			group: 'GROUP_LOGIN',
			readOnly: 'No',
			name: 'dateOfBirth',
			onChange: () => {},
			dataAnchor: 'date-of-birth',
			required: true,
			content: {
			},
			session: {
				challenge: {
					auth_scheme: {
						challenges: {
							date_of_birth: {
							},
						}
					},
					auth_session_id: {
					},
					public_key: {
					}
				}
			},
			encryptAnswer: jest.fn(),
			requestAuthenticationUpdate: jest.fn(),
		};

		component = shallowRender(props);
	});

	it('should render DatePickerQuestion', () => {
		expect(component).toEqualJSX(
			<DatePickerQuestion
			validateMaxAge={99}
    		validateMinAge={18}
    		dataAnchor="date-of-birth"
		    {...props}
		    />
		);
	});

	describe('and answering the date of birth', () => {
		const encryptValues = '09-12-1983';

		beforeEach(() => {
			component.props.onChange('test', encryptValues);
		});

		it('should create authentication answers update', () => {
			expect(props.encryptAnswer.mock.calls[0][0]).toEqual(encryptValues);
			expect(props.requestAuthenticationUpdate.mock.calls.length).toBe(1);
		});
	});
});

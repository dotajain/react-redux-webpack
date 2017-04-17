

const _ = require('lodash');

jest.unmock('../SessionApiUtils');
jest.unmock('../GenericMapperUtils');
jest.unmock('lodash');
jest.unmock('../UserIdentityBuilder');

const SessionApiUtils = require('../SessionApiUtils');

const ApiUtils = require('../ApiUtils');

describe('SessionApiUtils', function() {
	beforeEach(() => {
		global.envConfig.targetScope = { unknown: -1 };
	});

	describe('buildChallengeResponse', function() {
		it('will build a challenge response', function() {

			const qna = {
				partialPassword: {
					questions: [0, 4, 6],
					answers: ['qwrqwreqwer', 'asdfasdfasdf', 'zxcvzxcvzxcv']
				},
				securityQuestion: {
					questions: ['The name of a memorable place to you?'],
					answers: ['Glasgow']
				},
				telephoneBanking: {
					answers: {
						access_code: 1234,
						sort_code: 123412,
						account_number: 123412412
					}
				},
				debitCard: {
					answers: {
						pan: 1234,
						sort_code: 123412,
						account_number: 123412412
					}
				},
				schemeId: 1234,
				sessionId: 'sjglksgksdlgsdjkl',
				username: 'mdell153'
			};

			const userNameTest = {
					params: {
						userIdentity: qna.username,
						challengeResponse: {
							auth_session_id: qna.sessionId,
							auth_schemes: [
								{
									id: qna.schemeId,
									challenges: {
										partial_password: {positions: qna.partialPassword.questions},
										security_questions: {questions: qna.securityQuestion.questions},
										acn: {},
										debit_card: {}
									}
								}
							]
						},
						authData: {
							'partial-password': qna.partialPassword.answers,
							'security-questions': qna.securityQuestion.answers,
							acn: qna.telephoneBanking.answers,
							debit_card: qna.debitCard.answers
						}
					},
					result: {
						auth_schemes: [{
								 challenge_responses: {
									 partial_password: {
										 0: qna.partialPassword.answers[0],
										 4: qna.partialPassword.answers[1],
										 6: qna.partialPassword.answers[2]
									 },
									 security_questions: {
										 answers: [qna.securityQuestion.answers[0]]
									 },
									 acn: qna.telephoneBanking.answers,
									 debit_card: qna.debitCard.answers
								 },
								 id: qna.schemeId,
								 user_identity: {
									 user_id: qna.username
								 }
							 }
						],
						 auth_session_id: qna.sessionId
					}
				};

				const userInfoTest = {
					params: _.assign({}, userNameTest.params, {
						userIdentity: {
								firstName: 'firstName',
								lastName: 'lastName',
								dateOfBirth: 'dateOfBith',
								gender: 'M',
								addressLine: 'addressLine',
								postcode: 'postcode',
						}}),
					result: {
						auth_schemes: [
							  _.assign({}, userNameTest.result.auth_schemes[0], {
								 user_identity: {
									 user_info: {
										first_name: 'firstName',
										last_name: 'lastName',
										dob: 'dateOfBith',
										gender: 'M',
										address_line: 'addressLine',
										post_code: 'postcode',
									 }
								 }
							 })
						],
						 auth_session_id: qna.sessionId
					}
				};

			const testData = [userNameTest, userInfoTest];

			_.each(testData, function(test) {
				const auth_schemes = SessionApiUtils.buildChallengeResponse(test.params.userIdentity, test.params.challengeResponse, test.params.authData).auth_schemes;
				expect(auth_schemes).toEqual(test.result.auth_schemes);
			});
		});
	});

	describe('createAuthChallenge', () => {
		beforeEach(() => {
			SessionApiUtils.createAuthChallenge('username', 20);
		});

		it('should build the correct request data', () => {
			expect(ApiUtils.makeAjaxCall.mock.calls[0][0].requestData).toEqual({ user_identity: { user_id: 'username' }, scope: '20' });
		});
	});

	describe('prepareScope', () => {
		const runTest = testCase => {
			it(testCase.name, () => {
				const result = expect(SessionApiUtils.prepareScope(testCase.scope)).toBe(testCase.expect);
			});
		};

		const testCases = [{
			name: '"0" string',
			scope: '0',
			expect: '0',
		}, {
			name: 'positive number',
			scope: 20,
			expect: '20',
		}, {
			name: '-1 string',
			scope: '-1',
			expect: '-1',
		}, {
			name: '-1 number',
			scope: -1,
			expect: '-1',
		}, {
			name: '0 number',
			scope: 0,
			expect: '0',
		}, {
			name: 'undefined',
			//scope: undefined we will actually leave it undefined ;)
			expect: '-1',
		}, {
			name: 'null',
			scope: null,
			expect: '-1',
		}, {
			name: 'text string',
			scope: 'this is bad',
			expect: '-1',
		}];

		testCases.forEach(runTest);
	});

});



jest.unmock('../CallValidate3DStore');
jest.unmock('object-assign');

let CallValidate3DStore;

describe('CallValidate3DStore', function() {

	beforeEach(function() {
		CallValidate3DStore = require('../CallValidate3DStore');
	});

	describe('setAnswer', function() {
		const answer1 = {};
		answer1['question_id'] = 1;
		answer1.answer = 'abc';

		const answer2a = {};
		answer2a['question_id'] = 2;
		answer2a.answer = 'def';

		const answer2b = {};
		answer2b['question_id'] = 2;
		answer2b.answer = 'ghi';

		it('adds new answers to the result set', function() {
			let result;

			result = CallValidate3DStore.setAnswer(answer1);
			expect(result.length).toBe(1);

			result = CallValidate3DStore.setAnswer(answer2a);
			expect(result.length).toBe(2);
		});

		it('does not add the same question answer twice', function() {
			let result;

			result = CallValidate3DStore.setAnswer(answer2a);
			expect(result.length).toBe(1);

			result = CallValidate3DStore.setAnswer(answer2b);
			expect(result.length).toBe(1);
			expect(result[0].answer).toBe('ghi');
		});

		it('does not add invalid values', function() {
			let result;

			result = CallValidate3DStore.setAnswer(undefined);
			result = CallValidate3DStore.setAnswer(0);
			result = CallValidate3DStore.setAnswer('');
			result = CallValidate3DStore.setAnswer({});
			result = CallValidate3DStore.setAnswer({foo: 'bar'});
			expect(result.length).toBe(0);
		});
	});
});

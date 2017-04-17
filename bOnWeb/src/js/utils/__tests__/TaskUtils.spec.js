

const _ = require('lodash');

jest.unmock('../TaskUtils');
jest.unmock('lodash');

const TaskUtils = require('../TaskUtils');

describe('TaskUtils', function() {

	describe('parseUri', function() {
		it('will parse a task or case uri', function() {

			const testData = [
				{uri: 'task://csap/verify/idcheckfail?caseId=123', result: {type: 'task', caseType: 'csap', task: 'verify', action: 'idcheckfail', caseId: '123'}},
				{uri: 'task://csap/verify/idcheckfail?caseId=CS-123', result: {type: 'task', caseType: 'csap', task: 'verify', action: 'idcheckfail', caseId: 'CS-123'}},
				{uri: 'task://csap/verify/idCheckFail?caseId=123', result: {type: 'task', caseType: 'csap', task: 'verify', action: 'idcheckfail', caseId: '123'}},
				{uri: 'case://csap/existing/123', result: {type: 'case', caseType: 'csap', caseSubType: 'existing', caseId: '123'}},
				{uri: 'case://Csap/Existing/123', result: {type: 'case', caseType: 'csap', caseSubType: 'existing', caseId: '123'}},
				{uri: 'case://csap/existing/CS-1004944', result: {type: 'case', caseType: 'csap', caseSubType: 'existing', caseId: 'CS-1004944'}},
				{uri: '', result: undefined},
				{uri: 'case', result: undefined},
				{uri: 'case://', result: {type: 'case'}},
				{uri: 'case://csap', result: {type: 'case'}},
				{uri: 'case://csap/existing', result: {type: 'case'}},
				{uri: 'task', result: undefined},
				{uri: 'task://', result: {type: 'task'}},
				{uri: 'task://csap', result: {type: 'task'}},
				{uri: 'task://csap/existing', result: {type: 'task'}},
				{uri: 'task://csap/capture?caseId=CS-123', result: {type: 'task', caseType: 'csap', task: 'capture', action: undefined, caseId: 'CS-123'}},
				{uri: 'task://csap/appsubmission?caseId=CS-1006083', result: {type: 'task', caseType: 'csap', task: 'appsubmission', action: undefined, caseId: 'CS-1006083'}},
				{uri: 'task://csap/decline?caseId=CS-123&reason=idCheckfail', result: {type: 'task', caseType: 'csap', task: 'decline', action: undefined, caseId: 'CS-123', reason: 'idcheckfail'}},
			];

			_.each(testData, function(test) {
				expect(TaskUtils.parseUri(test.uri)).toEqual(test.result);
			});
		});
	});

	describe('getTaskId', function() {
		it('will get a task id', function() {

			const testData = [
				 // TSK-01
				{uri: 'task://csap/capture?caseId=CS-123', result: 'capture'},
				 // TSK-02
				{uri: 'task://csap/decline?caseId=CS-123&reason=idCheckfail', result: 'idcheckfail'},
				 // TSK-03
				{uri: 'task://csap/hold?caseId=CS-123&reason=idcheckcannotbedone', result: 'idcheckcannotbedone'},
				 // TSK-04
				{uri: 'task://csap/verify/challenge?caseId=CS-123', result: 'challenge'},
				 // TSK-05
				{uri: 'task://csap/decline?caseId=CS-123&reason=creditcheckdeclined', result: 'creditcheckdeclined'},
				 // TSK-06
				{uri: 'task://csap/hold?caseId=CS-123&reason=creditcheckReferred', result: 'creditcheckreferred'},
				 // TSK-07
				{uri: 'task://csap/offer?caseId=CS-123', result: 'offer'},
				 // TSK-08
				{uri: 'task://csap/hold?caseId=CS-123&reason=fulfillmentinprogress', result: 'fulfillmentinprogress'},
				 // TSK-09
				{uri: 'task://csap/complete?caseId=CS-123', result: 'complete'},
				 // TSK-10
				{uri: 'task://csap/hold?caseId=CS-123&reason=applicationexpired', result: 'applicationexpired'},
				 // TSK-11
				{uri: 'task://csap/cancelled?caseId=CS-123', result: 'cancelled'},
			];

			_.each(testData, function(test) {
				expect(TaskUtils.getTaskId(test.uri)).toEqual(test.result);
			});
		});
	});
});

/**
 * NBAActionCreator
 * @class NBAActionCreator
 */

jest.mock('../../stores/NBAStore');
jest.unmock('../NBAActionCreator');

const NBAStore = require('../../stores/NBAStore');
const NBAActionCreator = require('../NBAActionCreator');
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const NBAConstants = require('../../constants/NBAConstants');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

describe('NBAActionCreator', () => {
    it('Action to get all NBAData from API', () => {
        NBAActionCreator.getNBAData();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});

describe('NBAActionCreator', () => {
    beforeEach(() => {
        
    });
    it('Action to get NBA FeedbackData from API', () => {
        NBAActionCreator.getNBAFeedbackData('Mortgage Payment Tips');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(2);
    });
});

describe('handleNBADataSuccess', () => {
    it('to check the function', () => {
        let response = {
            "containers":
            [{
                "id": "DYSU",
                "insights":
                [{
                    "id": "/DigitalNBA/Nbas/NC035",
                    "offer_id": "a string",
                    "text_content": {
                        "header": "Mortgage Payment Tips",
                        "text": "Did you know you can change your mortgage payment date? Call us on 0845 602 5450 to find out more."
                    },
                    "action": {
                        "url": "beeee://accounts/payments",
                        "label": "OK"
                    }
                }
                ]
            }
            ]
        }
        NBAActionCreator.handleNBADataSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(1);
    });
});
describe('handleNBAFeedBackDataSuccess', () => {
    let response = {
        "containers":
        [{
            "id": "DYSU",
            "insights":
            [{
                "id": "/DigitalNBA/Nbas/NC035",
                "offer_id": "a string",
                "text_content": {
                    "header": "Mortgage Payment Tips",
                    "text": "Did you know you can change your mortgage payment date? Call us on 0845 602 5450 to find out more."
                },
                "action": {
                    "url": "beeee://accounts/payments",
                    "label": "OK"
                }
            }
            ]
        }
        ]
    }
    it('to check the function', () => {
        NBAActionCreator.handleNBAFeedBackDataSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
});
describe('handle NBAData Error', () => {
    beforeEach(() => {
        
    });
    it('Action to get NBA handleNBADataError from API', () => {
        NBAActionCreator.handleNBADataError('error');
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(3);
    });
});
describe('handle NBAData Feedback Error', () => {
    beforeEach(() => {
        
    });
    it('Action to handle NBAData Error from API', () => {
        NBAActionCreator.handleNBAFeedBackDataError('feedbackerror');
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(4);
    });
});

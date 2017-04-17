
const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const TermsConditionApiUtils = require('../utils/TermsConditionApiUtils');
const TermsConditionConstants = require('../constants/TermsConditionConstants');
const CHANGE_EVENT = 'change';
let _TcData = '';
let _tandCversion = '';
let _tandCService = '';
let _showTC = false

const TermsConditionStore = assign({}, EventEmitter.prototype, {

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getAll() {
        return _TcData || '';
    },
    getShowTC() {
        return _showTC;
    },

});

TermsConditionStore.dispatchToken = AppDispatcher.register(payload => {
    const action = payload.action;


    switch (action.actionType) {

        case TermsConditionConstants.GET_TC_DATA:
            _showTC =  false;
            TermsConditionApiUtils.getTcData();
            TermsConditionStore.emitChange();
            break;

        case TermsConditionConstants.GET_TC_DATA_SUCCESS:
            _tandCversion = action.data.version;
            _tandCService = action.data.service;
            TermsConditionApiUtils.getTextUrl(action.data.content.ref);
            break;

        case TermsConditionConstants.GET_TC_TEXT_DATA_SUCCESS:
            _showTC = true;
            _TcData = action.data;
            TermsConditionStore.emitChange();
            break;
        case TermsConditionConstants.REQUEST_ACCEPT_TC:
            TermsConditionApiUtils.acceptedTermsAndConditions(_tandCService, _tandCversion);
            break;
        default:
    }
});

module.exports = TermsConditionStore;

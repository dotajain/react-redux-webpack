/**
 * @module NBAStore
 */
const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const NBAApiUtils = require('../utils/NBAApiUtils');
const NBAConstants = require('../constants/NBAConstants');
const CHANGE_EVENT = 'change';
let _NBAData = [];
let _NBAHeader = '';
let _NBAContent = '';
let _NBAFeedback = '';

const NBAStore = assign({}, EventEmitter.prototype, {
    emitChange() {
        this.emit(CHANGE_EVENT);
    },

	/**
	* @param {function} callback
	*/

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    /**
	 * Allow views to unbind listeners before dismounting.
	 *
	 * @param  {Function} callback    Function to unbind.
	 */

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    // to get the NBA data
    getAll() {
        return _NBAData;
    },

    // to get the header of NBA
    getHeader() {
        return _NBAHeader;
    },

    // to get the content of NBA
    getContent() {
        return _NBAContent;
    },
});

NBAStore.dispatchToken = AppDispatcher.register(payload => {
    const action = payload.action;

    switch (action.actionType) {
        case NBAConstants.GET_NBA_DATA:
            NBAApiUtils.getNBAData();
            break;

        case NBAConstants.GET_NBA_DATA_SUCCESS:
            _NBAData = action.data;
            _NBAData.containers.map(nbaData => {
                nbaData.insights.map(nbaheader => {
                    _NBAHeader = nbaheader.text_content.header;
                    _NBAContent = nbaheader.text_content.text;
                });
            });
            NBAStore.emitChange();
            break;
        case NBAConstants.GET_NBA_DATA_ERROR:
            _NBAData = [];
            NBAStore.emitChange();
            break;
        case NBAConstants.NBA_CLOSE:
            _NBAData = [];
            _NBAHeader = undefined;
            _NBAContent = undefined;
            NBAStore.emitChange();
            break;
    }
});

module.exports = NBAStore;

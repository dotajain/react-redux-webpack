import { actionTypes as types } from '../constants';

const initialState = {
  data: '',
  fetching: false,
  fetched: false,
  err: ''
}

const wtts = (state = initialState, action) => {
  switch (action.type) {
    case types.TEXT_TO_SPEECH_REQUEST:
      return {...state, fetching: true}
    case types.TEXT_TO_SPEECH_SUCCESS:
      return {
          ...state,
          fetching: false,
          fetched: true,
          data: action.data,
        }
    case types.SERVICE_ERROR:
      return {...state, fetching: false, err: action.data}
    default:
      return state
  }
}

export default wtts;
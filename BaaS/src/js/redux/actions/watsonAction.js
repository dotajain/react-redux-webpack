import { actionTypes as types } from '../constants';
import { getWTTS } from '../helpers';

export const wtts = (url) => (dispatch) => {
  dispatch({ type: types.TEXT_TO_SPEECH_REQUEST });
  getWTTS({
    url: url,
    success: types.TEXT_TO_SPEECH_SUCCESS,
    dispatch
  })
};

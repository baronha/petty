import {
  SIGN_UP_BY_VERTIFICATION_CODE_SUCCESS,
  LOADING,
  UPDATE_PROFILE_SUCCESS,
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  UPDATE_PROFILE_FAILED,
} from '../utils/type';

export const userApi = (state = [], actions) => {
  switch (actions.type) {
    case LOG_IN_SUCCESS:
      return {
        type: LOG_IN_SUCCESS,
        dataLogin: actions.payload,
      };
    case LOG_IN_FAILED:
      return {
        type: LOG_IN_FAILED,
        dataLogin: null,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        type: UPDATE_PROFILE_SUCCESS,
      };
    case UPDATE_PROFILE_FAILED:
      return {
        type: UPDATE_PROFILE_FAILED,
      };
    default:
      return {
        type: LOADING,
      };
  }
};

import * as type from '../actions/actionTypes';



export const handledarkMode = (e) => async (dispatch) => {
    localStorage.setItem("darkmode", e);
    dispatch({
      type: type.DARK_MODE,
      payload: e,
    });
  };
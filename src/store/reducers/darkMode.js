import * as type from '../actions/actionTypes';

const initialState = {
  isdarkMode: !!JSON.parse(localStorage.getItem("darkmode")),
};

const darkModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.DARK_MODE:
      return {
        ...state,
        isdarkMode: action.payload,
      };
    default:
      return state;
  }
};

export default darkModeReducer;
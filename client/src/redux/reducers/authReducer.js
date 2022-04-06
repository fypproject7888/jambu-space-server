/* eslint-disable import/no-anonymous-default-export */
import {
  USER_LOADING,
  USER_LOADED,
  LOGIN,
  LOGOUT,
} from "../actions/authActions";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN:
      localStorage.setItem("authUser", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case LOGOUT:
      localStorage.removeItem("authUser");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}

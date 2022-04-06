/* eslint-disable import/no-anonymous-default-export */
import { GET_ALL_NOTIFICATIONS } from "../actions/notificationActions";

const initialState = {
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    default:
      return state;
  }
}

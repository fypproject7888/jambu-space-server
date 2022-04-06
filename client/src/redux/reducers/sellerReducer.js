/* eslint-disable import/no-anonymous-default-export */
import {
  GET_ALL_SELLERS,
  REMOVE_SELLER,
  CLEAR_SELLERS,
} from "../actions/sellerActions";

const initialState = {
  sellers: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SELLERS:
      return {
        ...state,
        sellers: action.payload,
      };
    case REMOVE_SELLER:
      return {
        ...state,
        sellers: state.sellers.filter(item => item._id !== action.payload.id),
      };
    case CLEAR_SELLERS:
      return {
        ...state,
        sellers: [],
      };
    default:
      return state;
  }
}

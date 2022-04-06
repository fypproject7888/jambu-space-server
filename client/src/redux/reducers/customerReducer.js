/* eslint-disable import/no-anonymous-default-export */
import {
  GET_ALL_CUSTOMERS,
  REMOVE_CUSTOMER,
  CLEAR_CUSTOMERS,
} from "../actions/customerActions";

const initialState = {
  customers: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
      };
    case REMOVE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          item => item._id !== action.payload.id
        ),
      };
    case CLEAR_CUSTOMERS:
      return {
        ...state,
        customers: [],
      };
    default:
      return state;
  }
}

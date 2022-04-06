import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/constants";

export const GET_ALL_CUSTOMERS = "GET_ALL_CUSTOMERS";
export const REMOVE_CUSTOMER = "REMOVE_CUSTOMER";
export const CLEAR_CUSTOMERS = "CLEAR_CUSTOMERS";

// Clear Customers
export const clearCustomers = () => async dispatch =>
  dispatch({
    type: CLEAR_CUSTOMERS,
  });

// Get All Customers
export const getAllCustomers = () => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/api/customers`);
    dispatch({
      type: GET_ALL_CUSTOMERS,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) toast.error(err.response.data);
  }
};

// Delete Customer
export const deleteCustomer = id => async dispatch => {
  try {
    const res = await axios.delete(`${API_URL}/api/customers/${id}`);
    toast.success("Customer Deleted Successfully");
    dispatch({
      type: REMOVE_CUSTOMER,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) toast.error(err.response.data);
  }
};

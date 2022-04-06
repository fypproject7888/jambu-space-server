import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/constants";

export const GET_ALL_SELLERS = "GET_ALL_SELLERS";
export const REMOVE_SELLER = "REMOVE_SELLER";
export const CLEAR_SELLERS = "CLEAR_SELLERS";

// Clear Sellers
export const clearSellers = () => async dispatch =>
  dispatch({
    type: CLEAR_SELLERS,
  });

// Get All Sellers
export const getAllSellers = () => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/api/sellers`);
    dispatch({
      type: GET_ALL_SELLERS,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) toast.error(err.response.data);
  }
};

// Delete Seller
export const deleteSeller = id => async dispatch => {
  try {
    const res = await axios.delete(`${API_URL}/api/sellers/${id}`);
    toast.success("Seller Deleted Successfully");
    dispatch({
      type: REMOVE_SELLER,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) toast.error(err.response.data);
  }
};

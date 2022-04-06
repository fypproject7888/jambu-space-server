import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/constants";

export const GET_ALL_NOTIFICATIONS = "GET_ALL_NOTIFICATIONS";

// Get All Jobs
export const getAllNotifications = () => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/api/notifications`);
    dispatch({
      type: GET_ALL_NOTIFICATIONS,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) toast.error(err.response.data);
  }
};

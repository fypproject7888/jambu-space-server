import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/constants";

export const USER_LOADING = "USER_LOADING";
export const USER_LOADED = "USER_LOADED";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const loadUser = () => async dispatch => {
  dispatch({
    type: USER_LOADING,
  });

  const user = localStorage.getItem("authUser");
  if (user) {
    const parsedUser = JSON.parse(user);
    dispatch({
      type: USER_LOADED,
      payload: parsedUser,
    });
  }
};

// LOGIN USER
export const login = values => async dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const { email, password } = values;
  const body = JSON.stringify({ email, password });

  dispatch({
    type: USER_LOADING,
  });

  try {
    const res = await axios.post(`${API_URL}/api/auth`, body, config);
    dispatch({
      type: LOGIN,
      payload: res.data,
    });
    window.location.href = "/";
  } catch (err) {
    console.log(err.response);
    if (err.response) toast.error(err.response.data.message);
    else toast.error("An unexpected error occurred!");
  }
};

// LOGOUT USER
export const logout = () => async dispatch => {
  dispatch({
    type: USER_LOADING,
  });

  try {
    await axios.delete(`${API_URL}/api/auth`);
    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    if (err.response) toast.error(err.response.data);
    else toast.error("An unexpected error occurred!");
  }
};

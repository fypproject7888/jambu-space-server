import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/constants";

export const GET_ALL_JOBS = "GET_ALL_JOBS";
export const REMOVE_JOB = "REMOVE_JOB";
export const CLEAR_JOBS = "CLEAR_JOBS";

// Clear Jobs
export const clearJobs = () => async dispatch =>
  dispatch({
    type: CLEAR_JOBS,
  });

// Get All Jobs
export const getAllJobs = () => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/api/jobs`);
    dispatch({
      type: GET_ALL_JOBS,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) toast.error(err.response.data);
  }
};

// Delete Job
export const deleteJob = id => async dispatch => {
  try {
    const res = await axios.delete(`${API_URL}/api/jobs/${id}`);
    toast.success("Job Deleted Successfully");
    dispatch({
      type: REMOVE_JOB,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) toast.error(err.response.data);
  }
};

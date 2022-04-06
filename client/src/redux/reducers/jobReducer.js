/* eslint-disable import/no-anonymous-default-export */
import { GET_ALL_JOBS, REMOVE_JOB, CLEAR_JOBS } from "../actions/jobActions";

const initialState = {
  jobs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_JOBS:
      return {
        ...state,
        jobs: action.payload,
      };
    case REMOVE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(item => item._id !== action.payload.id),
      };
    case CLEAR_JOBS:
      return {
        ...state,
        jobs: [],
      };
    default:
      return state;
  }
}

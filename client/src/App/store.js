import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import {
  authReducer,
  sellerReducer,
  customerReducer,
  jobReducer,
  notificationReducer,
} from "../redux/reducers";

const reducer = combineReducers({
  auth: authReducer,
  seller: sellerReducer,
  customer: customerReducer,
  job: jobReducer,
  notification: notificationReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(reduxThunk))
);

export default store;

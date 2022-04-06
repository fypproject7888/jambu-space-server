import React, { useEffect, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./store";
import Dashboard from "../pages/Dashboard";
import Sellers from "../pages/Sellers";
import Customers from "../pages/Customers";
import Jobs from "../pages/Jobs";
import Payments from "../pages/Payments";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import Main from "../components/layout/Main";
import Loader from "../Common/Loader";
import PrivateRoute from "../Common/PrivateRoute";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/app.css";
import { loadUser } from "../redux/actions/authActions";

const wrappedRoutes = () => (
  <Switch>
    <Main>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/sellers" component={Sellers} />
      <Route exact path="/customers" component={Customers} />
      <Route exact path="/jobs" component={Jobs} />
      <Route exact path="/payments" component={Payments} />
      <Route exact path="/profile" component={Profile} />
      <Redirect from="*" to="/dashboard" />
    </Main>
  </Switch>
);

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    window.addEventListener("load", () => {
      setTimeout(() => {}, 500);
    });
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <ToastContainer position="bottom-right" />
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/sign-in" exact component={SignIn} />
            <PrivateRoute path="/" component={wrappedRoutes} />
          </Switch>
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;

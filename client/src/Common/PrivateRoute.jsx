import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();

  const loadedUser = localStorage.getItem("authUser");

  return (
    <Route
      {...rest}
      render={props => {
        if (!loadedUser) {
          return (
            <Redirect
              to={{
                pathname: "/sign-in",
                state: { from: location },
              }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;

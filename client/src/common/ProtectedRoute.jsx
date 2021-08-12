import React, {useContext} from "react";
import {Route, Redirect} from "react-router";
import {UserContext} from "../context/UserProvider";

export default function ProtectedRoute({
  path,
  component: Component,
  render,
  ...rest
}) {
  const {user} = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={props => {
        if (!user)
          return (
            <Redirect
              to={{pathname: "/login", state: {from: props.location}}}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

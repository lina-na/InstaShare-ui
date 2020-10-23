import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const Authorization = React.lazy(() => import("./auth"));

const User = ({ match }) => {
  return (
    <div>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/auth`} />
        <Route
          path={`${match.url}/auth`}
          render={(props) => <Authorization {...props} />}
        />
        <Redirect to="/error" />
      </Switch>
    </div>
  );
};

export default User;

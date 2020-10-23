import React, { useEffect, Suspense } from "react";
import { LOCAL_STORAGE_TOKEN } from "./constants/defaultValues";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import {useSelector} from 'react-redux';

const AuthRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/user/auth", state: { from: props.location } }}
        />
      )
    }
  />
);
const ViewMain = React.lazy(() => import("./views"));
const ViewApp = React.lazy(() => import("./views/app"));
const ViewUser = React.lazy(() => import("./views/user"));
const ViewError = React.lazy(() => import("./views/error"));

const App = () => {
  const { user, loading, error } = useSelector((state) => state.authUser);
  
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    if (token) axios.defaults.headers.common.Authorization = token
      ? `Bearer ${token}`
      : null;
  }, []);

  return (
    <div>
      <Suspense fallback="loading...">
        <Switch>
          <AuthRoute path="/app" authUser={user} component={ViewApp} />
          <Route path="/user" render={(props) => <ViewUser {...props} />} />
          <Route
            path="/error"
            exact
            render={(props) => <ViewError {...props} />}
          />
          <Route path="/" exact render={(props) => <ViewMain {...props} />} />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;

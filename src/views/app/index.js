import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/actions";
import axios from "axios";
import { responseStatuses } from "../../constants/defaultValues";
import { Switch, Redirect, Route } from "react-router-dom";

const Home = React.lazy(() => import("./home"));

const App = ({ match, history }) => {
  const dispatch = useDispatch();

  const logoutUserCallback = useCallback(() => {
    dispatch(logoutUser(history));
  }, [history, dispatch]);

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        if (response.status === responseStatuses.BAD_REQUEST) {
          return Promise.reject(response);
        }
        return Promise.resolve(response);
      },
      (error) => {
        if (error.response.status === responseStatuses.UNAUTHORIZED) {
          logoutUserCallback();
        }
        return Promise.reject(error);
      }
    );
  }, [logoutUserCallback]);

  return (
    <div>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/home`} />
        <Route
          path={`${match.url}/home`}
          render={(props) => <Home {...props} />}
        />
        <Redirect to="/error" />
      </Switch>
    </div>
  );
};

export default App;

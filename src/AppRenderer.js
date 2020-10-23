import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { configureStore } from "./redux/store";

const App = React.lazy(() => import("./App"));

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <Suspense fallback="loading...">
        <App />
      </Suspense>
    </Router>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();

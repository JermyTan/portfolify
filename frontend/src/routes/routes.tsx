import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { HOME_PATH, POST_PATH } from "./index";
import AppHeader from "../components/app-header";
import AppHomeBody from "../components/app-home-body";
import CreatePostButton from "../components/create-post-button";
import HomeButton from "../components/home-button";
import AppPostBody from "../components/app-post-body";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route
          path={HOME_PATH}
          exact
          render={() => (
            <>
              <AppHeader mainButton={<CreatePostButton />} />
              <AppHomeBody />
            </>
          )}
        />
        <Route
          path={POST_PATH}
          render={() => (
            <>
              <AppHeader mainButton={<HomeButton />} />
              <AppPostBody />
            </>
          )}
        />
        <Route children={() => <Redirect to={HOME_PATH} />} />
      </Switch>
    </Router>
  );
}

export default Routes;

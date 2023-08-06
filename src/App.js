import React, { useEffect } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import LandingPage from "pages/LandingPage";
import Home from "pages/Home";

import "assets/scss/style.scss";
import { API, setAuthToken } from "config/api";
import Switch from "react-bootstrap/esm/Switch";
import PrivateRoute from "components/PrivateRoute";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />

          {/* <PrivateRoute exact path="/home" component={Home} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;

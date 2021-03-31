import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/dashboard-react.scss";
import AppLayout from "layouts/App.js";
import AuthLayout from "layouts/Auth.js";
import {AuthProvider} from "./shared/context/AuthContext";

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AppLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Redirect from="/" to="/admin/team" />
      </Switch>
    </BrowserRouter>
  </AuthProvider>
  , document.getElementById("root")
);

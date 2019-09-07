import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import BodyWrapper from "./components/BodyWrapper";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Alerts from "./components/layout/Alerts";
import setAuthToken from "./utils/setAuthToken";

import AlbumState from "./context/album/AlbumState";
import EditState from "./context/edit/EditState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import Container from "@material-ui/core/Container";

import "./style/style.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <div>
      <Router>
        <Container>
          <Navbar />
          <AlbumState>
            <EditState>
              <AuthState>
                <AlertState>
                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path='/modify' component={Dashboard} />
                    <Route exact path='/' component={BodyWrapper} />
                    <Route exact path='/login' component={Login} />
                  </Switch>
                </AlertState>
                <Footer />
              </AuthState>
            </EditState>
          </AlbumState>
        </Container>
      </Router>
    </div>
  );
};

export default App;

import React, { useRef, useEffect } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

import { Container, Row, Col } from "reactstrap";

import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import {authRoutes} from "routes.js";
import useAuthContext from "../shared/hooks/useAuthContext";

const Auth = (props) => {
  const mainContent = useRef(null);
  const location = useLocation();

  const auth = useAuthContext();

  const notInitialRender = useRef(false)
  useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  useEffect(() => {
    if (notInitialRender.current) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainContent.current.scrollTop = 0;
    } else{
      notInitialRender.current = true;
    }
  }, [location]);

  const getAuthRoutes = (routes) => {
    return routes
      .map((route, key) => {
        return (
          <Route
            path={route.layout + route.path}
            component={route.component}
            key={key}
          />
        );
      });
  };

  return (
    auth.user
      ? <Redirect to={{ pathname: "/admin/user-profile", state: { from: location } }} />
      : (
        <>
          <div className="main-content" ref={mainContent}>
            <AuthNavbar />
            <div className="header bg-gradient-info py-7 py-lg-8">
              <Container>
                <div className="header-body text-center mb-7">
                  <Row className="justify-content-center">
                    <Col lg="5" md="6">
                      <h1 className="text-white">Welcome!</h1>
                      <p className="text-lead text-light">
                        Use these awesome forms to login or create new account in
                        your project for free.
                      </p>
                    </Col>
                  </Row>
                </div>
              </Container>
              <div className="separator separator-bottom separator-skew zindex-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-default"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </div>
            {/* Page content */}
            <Container className="mt--8 pb-5">
              <Row className="justify-content-center">
                <Switch>
                  {getAuthRoutes(authRoutes)}
                  <Redirect from="*" to="/auth/login" />
                </Switch>
              </Row>
            </Container>
          </div>
          <AuthFooter />
        </>
      )
  );
};

export default Auth;

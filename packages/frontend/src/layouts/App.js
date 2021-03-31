import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

import { Container } from "reactstrap";

import AppNavbar from "components/Navbars/AppNavbar.js";
import AppFooter from "components/Footers/AppFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import { adminRoutes } from "routes.js";

import useAuthContext from "../shared/hooks/useAuthContext";
import {ApolloServiceProvider} from "../shared/context/ApolloContext";
import {UserProvider} from "../shared/context/UserContext";
import {TasksProvider} from "../shared/context/TasksContext";

import "assets/scss/app.scss";

const App = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  const auth = useAuthContext();

  const notInitialRender = React.useRef(false)
  React.useEffect(() => {
    if (notInitialRender.current) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainContent.current.scrollTop = 0;
    } else {
      notInitialRender.current = true
    }
  }, [location]);

const getAdminRoutes = (routes) => {
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

const getPageName = (path) => {
  const route = adminRoutes.find(route => route.layout + route.path === path)
  return route? route.name :  '';
};

return (
  !auth.currentUser
    ? <Redirect to={{ pathname: "/auth/login", state: { from: location } }} />
    : (
      <>
        <Sidebar
          {...props}
          routes={adminRoutes}
          logo={{
            innerLink: "/admin/user-profile",
            imgSrc: require("../assets/img/brand/logo.png").default,
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref={mainContent}>
          <TasksProvider>
            <UserProvider>
              <AppNavbar
                {...props}
                brandText={getPageName(props.location.pathname)}
              />
              <ApolloServiceProvider>
                <Switch>
                  {getAdminRoutes(adminRoutes)}
                    <Redirect from="*" to="/admin/user-profile" />
                  </Switch>
              </ApolloServiceProvider>
            </UserProvider>
          </TasksProvider>
          <Container fluid>
            <AppFooter />
          </Container>
          </div>
        </>
    )
  );
};

export default App;

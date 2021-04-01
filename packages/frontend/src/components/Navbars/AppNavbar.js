// @ts-check
import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

import useAuthContext from "../../shared/hooks/useAuthContext";
import useUserContext from "../../shared/hooks/useUserContext";
import LoadingScreen from "../../views/Profile/LoadingScreen";

const AppNavbar = (props) => {
  const {userInfo, loading } = useUserContext()
  const auth = useAuthContext();

  return (
    loading || !userInfo
    ? <LoadingScreen />
    : <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          {
            userInfo && (
              <Nav className="align-items-center d-none d-md-flex" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle className="pr-0" nav>
                    <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/user-avatar.png")
                          .default
                      }
                    />
                  </span>
                      <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {userInfo.NAME}
                    </span>
                      </Media>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem className="noti-title" header tag="div">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </DropdownItem>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </DropdownItem>
                    <DropdownItem to="/admin/tasks" tag={Link}>
                      <i className="ni ni-bullet-list-67" />
                      <span>Tasks</span>
                    </DropdownItem>
                    <DropdownItem to="/admin/team" tag={Link}>
                      <i className="ni ni-user-run" />
                      <span>Team</span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={auth.signOut}>
                      <i className="ni ni-button-power" />
                      <span>Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            )
          }
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;

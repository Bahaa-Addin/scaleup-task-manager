import React from "react";

import { Container, Row, Col } from "reactstrap";

const UserHeader = ({ user: { NAME } }) => {
  const [ firstName ] = NAME.split(' ');

  return (
    <>
      <div
        className="header pb-4 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hello {firstName}</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see the progress you've made
                with your tasks and review your tasks stats.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;

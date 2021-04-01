import React, {useEffect, useState} from "react";
import { Col, Container, Row } from "reactstrap";
import AccountInfoForm from "../Profile/AccountInfoForm";
import {createUser} from "../../actions/user.actions";
import {useHistory} from "react-router-dom";

const CreateUser = ({updateState}) => {
  const history = useHistory();

  const [isLoading, setLoading] = useState(false)
  const initData = {
    NAME: '',
    POSITION: '',
    EMAIL: '',
  };

  const onSubmit = async ({ NAME, POSITION, EMAIL}) => {
    try {
      setLoading(true);
      await createUser({ NAME, POSITION, EMAIL })
        .then(updateState);
      setLoading(false);
      history.push('/admin/team');
    } catch(err) {
      setLoading(false);
    }
  }

  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1" xl="8">
          <AccountInfoForm
            header="My Account"
            initData={initData}
            onSubmit={onSubmit}
            loading={isLoading}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default CreateUser;

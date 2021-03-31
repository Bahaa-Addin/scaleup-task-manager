// @ts-check
import React, {useState} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import useForm from "../../shared/hooks/useForm";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col, FormFeedback, Spinner,
} from "reactstrap";
import useAuthContext from "../../shared/hooks/useAuthContext";

const Login = () => {
  const auth = useAuthContext();
  const history = useHistory();
  const location = useLocation();

  const [ loading, setLoading ] = useState(false);
  const {inputs, handleInputChange, handleSubmit} = useForm({
    email: '',
    password: '',
  },async ({ email, password }) => {
    try {
      setLoading(true);
      await auth.signIn(email, password)
      const { from } = location.state || { from: { pathname: "/admin/user-profile" } };
      history.replace(from);
    } catch(err) {
      setLoading(false);
    }
  });

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          {/*<CardHeader className="bg-transparent pb-5">*/}
          {/*  <div className="text-muted text-center mt-2 mb-3">*/}
          {/*    <small>Sign in with</small>*/}
          {/*  </div>*/}
          {/*  <div className="btn-wrapper text-center">*/}
          {/*    <Button*/}
          {/*      className="btn-neutral btn-icon"*/}
          {/*      color="default"*/}
          {/*      href="#pablo"*/}
          {/*      onClick={(e) => e.preventDefault()}*/}
          {/*    >*/}
          {/*      <span className="btn-inner--icon">*/}
          {/*        <img*/}
          {/*          alt="..."*/}
          {/*          src={*/}
          {/*            require("../../assets/img/icons/common/github.svg")*/}
          {/*              .default*/}
          {/*          }*/}
          {/*        />*/}
          {/*      </span>*/}
          {/*      <span className="btn-inner--text">Github</span>*/}
          {/*    </Button>*/}
          {/*    <Button*/}
          {/*      className="btn-neutral btn-icon"*/}
          {/*      color="default"*/}
          {/*      href="#pablo"*/}
          {/*      onClick={(e) => e.preventDefault()}*/}
          {/*    >*/}
          {/*      <span className="btn-inner--icon">*/}
          {/*        <img*/}
          {/*          alt="..."*/}
          {/*          src={*/}
          {/*            require("../../assets/img/icons/common/google.svg")*/}
          {/*              .default*/}
          {/*          }*/}
          {/*        />*/}
          {/*      </span>*/}
          {/*      <span className="btn-inner--text">Google</span>*/}
          {/*    </Button>*/}
          {/*  </div>*/}
          {/*</CardHeader>*/}
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange={handleInputChange}
                    value={inputs.email}
                    required
                  />
                  <FormFeedback>Email is required</FormFeedback>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={handleInputChange}
                    value={inputs.password}
                    required
                  />
                  <FormFeedback>Password is required</FormFeedback>
                </InputGroup>
              </FormGroup>
              {/*<div className="custom-control custom-control-alternative custom-checkbox">*/}
                {/*<input*/}
                {/*  className="custom-control-input"*/}
                {/*  id=" customCheckLogin"*/}
                {/*  type="checkbox"*/}
                {/*/>*/}
                {/*<label*/}
                {/*  className="custom-control-label"*/}
                {/*  htmlFor=" customCheckLogin"*/}
                {/*>*/}
                {/*  <span className="text-muted">Remember me</span>*/}
                {/*</label>*/}
              {/*</div>*/}
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  {loading && <Spinner style={{ width: '1rem', height: '1rem', margin: ' 2px 10px' }} type="grow" />}
                  Sign in
                </Button>
              </div>
              <Row>
                <Col xs="12" className="text-center">
                  <span className="text-muted small">
                    Not registered? &nbsp;
                    <a href="/auth/register">
                      Click here to signup
                    </a>
                  </span>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;

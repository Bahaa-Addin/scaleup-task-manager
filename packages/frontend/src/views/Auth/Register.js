// @ts-check
import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import useForm from "../../shared/hooks/useForm";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  FormFeedback,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import useAuthContext from "../../shared/hooks/useAuthContext";

const Register = () => {
  const auth = useAuthContext();
  const history = useHistory();

  const [ loading, setLoading ] = useState(false);
  const {inputs, handleInputChange, handleSubmit} = useForm({
    name: '',
    position: '',
    email: '',
    password: '',
  },async ({ name, position, email, password }) => {
    try {
      setLoading(true);
      await auth.signUp(name, position, email, password);
      history.push('/admin/user-profile')
    } catch(err) {
      setLoading(false);
    }
  });

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="name"
                    placeholder="Full name"
                    type="text"
                    onChange={handleInputChange}
                    value={inputs.name}
                    required
                  />
                  <FormFeedback>Name is required</FormFeedback>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-briefcase-24" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="position"
                    placeholder="Job title"
                    type="text"
                    onChange={handleInputChange}
                    value={inputs.position}
                    required
                  />
                  <FormFeedback>Job title is required</FormFeedback>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
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
              <div className="text-muted font-italic">
                {/*<small>*/}
                {/*  password strength:{" "}*/}
                {/*  <span className="text-success font-weight-700">strong</span>*/}
                {/*</small>*/}
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  {loading && <Spinner style={{ width: '1rem', height: '1rem', margin: ' 2px 10px' }} type="grow" />}
                  Create account
                </Button>
              </div>
              <Row className="my-2">
                <Col xs="12" className="text-center">
                  <span className="text-muted small">
                    I already have an account? &nbsp;
                    <a href="/auth/login">
                      Click here to login
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

export default Register;

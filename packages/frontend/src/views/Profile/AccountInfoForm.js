import React, {useState, useEffect} from "react";
import useForm from "../../shared/hooks/useForm";
import {updateUser} from "../../actions/user.actions";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Row, Spinner
} from "reactstrap";


const AccountInfoForm = ({ header, initData, onSubmit,  isCurrentUser, loading }) => {
  const { NAME, POSITION, EMAIL} = initData;

  const {inputs, setInputs, handleInputChange, handleSubmit} = useForm(
    { NAME, POSITION, EMAIL }
    , onSubmit
  );

  useEffect(() => {
    if (initData) {
      setInputs(initData)
    }
  }, [initData])

  return (
    <Card className="bg-secondary shadow">
      <CardHeader className="bg-white border-0">
        <Row className="align-items-center">
          <Col xs="8">
            <h3 className="mb-0">{header}</h3>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Form role="form" onSubmit={handleSubmit}>
          <h6 className="heading-small text-muted mb-4">
            User information
          </h6>
          <div className="pl-lg-4">
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-name"
                  >
                    Full name
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-name"
                    placeholder="Full name"
                    type="text"
                    name="NAME"
                    onChange={handleInputChange}
                    value={inputs.NAME}
                    required
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-email"
                  >
                    Email address
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-email"
                    placeholder="Email"
                    type="email"
                    name="EMAIL"
                    onChange={handleInputChange}
                    value={inputs.EMAIL}
                    disabled={isCurrentUser}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-position"
                  >
                    Position / Job title
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-position"
                    placeholder="Position"
                    type="text"
                    name="POSITION"
                    onChange={handleInputChange}
                    value={inputs.POSITION}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="pt-6">
              <Col xs={12}>
                <Button
                  color="info"
                  className="px-5"
                  type="submit"
                >
                  {loading && <Spinner style={{ width: '1rem', height: '1rem', margin: ' 2px 10px' }} type="grow" />}
                  Save
                </Button>
              </Col>
            </Row>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}

export default AccountInfoForm;
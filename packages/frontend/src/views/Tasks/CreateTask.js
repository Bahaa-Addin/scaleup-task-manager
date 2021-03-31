import React, {useState} from "react";
import useForm from "../../shared/hooks/useForm";
import {
  Form,
  FormGroup,
  Card,
  CardHeader,
  CardBody,
  Input,
  Row,
  Button,
  Spinner,
  Col,
} from "reactstrap";

import AsyncSelect from 'react-select/async';
import {searchUsersByName} from "../../actions/user.actions";
import {TASK_STATUS} from "../../shared/lookups";
import {createTask} from "../../actions/task.actions";

import { useHistory } from "react-router-dom";
import useAuthContext from "../../shared/hooks/useAuthContext";
import useTasksContext from "../../shared/hooks/useTasksContext";

const searchUsers = (searchTerm) => searchUsersByName(searchTerm)
  .then(users => users.map(user => ({
      value: user,
      label: user.NAME,
    }))
  )

const CreateTask = () => {
  const auth = useAuthContext();
  const history = useHistory();
  const { addTask } = useTasksContext()

  const [isLoading, setLoading] = useState(false)

  const handleAssigneesSelect = (value) => {
    handleInputChange({ target: { name: 'assignees', value}});
  }

  const {inputs, handleInputChange, handleSubmit} = useForm({
    title: '',
    assignees: [],
  },async ({ title: TITLE, assignees }) => {
    try {
      setLoading(true);
      await createTask({
        TITLE,
        CREATOR_ID: auth.currentUser.uid,
        ASSIGNEES_IDS: assignees.map(({ value: { ID } }) => ID),
        STATUS: TASK_STATUS.PENDING.value,
      }).then(addTask)
      setLoading(false);
      history.push('/admin/tasks');
    } catch(err) {
      console.error(err)
      setLoading(false);
    }
  });

  return (
    <Row>
      <Col className="order-xl-1" xl="10">
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">New Task</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form role="form" onSubmit={handleSubmit}>
              <h6 className="heading-small text-muted mb-4">
                Task details
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="5">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-title"
                      >
                        Title
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-title"
                        placeholder="Title"
                        type="text"
                        name="title"
                        onChange={handleInputChange}
                        value={inputs.title}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="7">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-email"
                      >
                        Assignees
                      </label>
                      <AsyncSelect
                        isMulti
                        cacheOptions
                        defaultOptions
                        onChange={handleAssigneesSelect}
                        placeholder="Search"
                        loadOptions={searchUsers}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="pt-6">
                  <Col xs={12}>
                    <Button
                      color="info"
                      className="px-5"
                      disabled={!inputs.assignees.length}
                      type="submit"
                    >
                      {isLoading && <Spinner style={{ width: '1rem', height: '1rem', margin: ' 2px 10px' }} type="grow" />}
                      Submit
                    </Button>
                  </Col>
                </Row>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default CreateTask;
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row, Button, Spinner, Col,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import TaskRowItem from "./TaskRowItem";
import LoadingItem from "../Tasks/LoadingItem";
import useTasksContext from "../../shared/hooks/useTasksContext";
import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import CreateTask from "./CreateTask";

const Tasks = () => {
  const { tasks, loading } = useTasksContext()
  const { path, url } = useRouteMatch();

  return (
    <>
      <Header tasks={tasks} loading={loading} />
      <Switch>
        <Route exact path={`${path}`}>
          {/* Page content */}
          <Container className="mt--7" fluid>
            {/* Table */}
            <Row>
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center justify-content-between">
                      <Col xs={2}>
                        <h3 className="mb-0">Tasks</h3>
                      </Col>
                      <Col xs={3}>
                        <Link to={`${url}/new`}>
                          <Button color="info" type="button" className="float-right">
                            <i className="fas fa-plus" style={{ width: '1rem', height: '1rem', margin: ' 2px 10px 2px 0' }} />
                            New Task
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Status</th>
                      <th scope="col">Created by</th>
                      <th scope="col">Assignees</th>
                      <th scope="col" />
                    </tr>
                    </thead>
                    <tbody>
                    { loading
                      ? <LoadingItem></LoadingItem>
                      : tasks.map(task => (
                        <TaskRowItem key={task.ID} loading={loading} task={task}></TaskRowItem>
                      ))
                    }
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Row>
          </Container>
        </Route>
        <Route path={`${path}/new`}>
          <Container className="mt--7" fluid>
            <CreateTask />
          </Container>
        </Route>
      </Switch>
    </>
  );
};

export default Tasks;

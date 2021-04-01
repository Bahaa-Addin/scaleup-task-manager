import React, { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col, Button,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import { getAllUsersWithAssignedTasks } from "../../actions/user.actions";

import TeamRowItem from "./TeamRowItem";
import LoadingItem from "./LoadingItem";
import useTasks from "../../shared/hooks/useTasksContext";
import {Link, Switch, Route, useRouteMatch} from "react-router-dom";
import CreateUser from "./CreateUser";

const Team = (props) => {
  const [ teamMembers, setTeamMembers ] = useState([]);
  const [ isTeamLoading, setLoading ] = useState(false);
  const { tasks, loading: isTasksLoading } = useTasks()
  const { path, url } = useRouteMatch();

  const addTeamMember = (newMember) => {
    setTeamMembers([...teamMembers, newMember])
  };

  useEffect(() => {
    setLoading(true);
    getAllUsersWithAssignedTasks()
      .then(allUsersWithAssignedTasks => {
        setTeamMembers(allUsersWithAssignedTasks);
        setLoading(false);
      })
  }, [])

  return (
    <>
      <Header tasks={tasks} loading={isTasksLoading}/>
      {/* Page content */}
      <Switch>
        <Route exact path={`${path}`}>
          <Container className="mt--7" fluid>
            <Row>
              <Col xl="12">
                <Card className="bg-default shadow">
                  <CardHeader className="bg-default shadow">
                    <Row className="align-items-center justify-content-between">
                      <Col xs={2}>
                        <h3 className="text-white mb-0">Team</h3>
                      </Col>
                      <Col xs={3}>
                        <Link to={`${url}/new`}>
                          <Button color="info" type="button" className="float-right">
                            <i className="fas fa-plus" style={{ width: '1rem', height: '1rem', margin: ' 2px 10px 2px 0' }} />
                            New Member
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </CardHeader>
                  <Table
                    className="align-items-center table-dark table-flush"
                    responsive
                  >
                    <thead className="thead-dark">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Position</th>
                      <th scope="col">Tasks</th>
                      <th scope="col">Completion</th>
                      <th scope="col" />
                    </tr>
                    </thead>
                    <tbody>
                    { isTeamLoading
                      ? <LoadingItem></LoadingItem>
                      : teamMembers.map(teamMember => (
                        <TeamRowItem key={teamMember.ID} loading={isTeamLoading} teamMember={teamMember}></TeamRowItem>
                      ))
                    }
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </Container>
        </Route>
        <Route path={`${path}/new`}>
          <Container className="mt--7" fluid>
            <CreateUser updateState={addTeamMember} />
          </Container>
        </Route>
      </Switch>
    </>
  );
};

export default Team;

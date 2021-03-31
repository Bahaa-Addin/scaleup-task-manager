// @ts-check
import React, { useState, useEffect } from "react";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import Avatar from 'react-avatar-edit'
import {isTaskCompleted, isTaskInProgress, isTaskPending} from "../../shared/helpers";
import {updateUser} from "../../actions/user.actions";
import AccountInfoForm from "./AccountInfoForm";

const AccountInfo = ({ user, setUser }) => {
  const [isLoading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState(user || {
    NAME: '',
    POSITION: '',
    EMAIL: '',
  });

  const onSubmit = async ({ NAME, POSITION, EMAIL}) => {
    try {
      setLoading(true);
      await updateUser({ ID: user.ID, NAME, POSITION, EMAIL });
      setUser({...user, NAME, POSITION, EMAIL});
      setLoading(false);
    } catch(err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      setUserInfo(user)
    }
  }, [user])

  const [profileImgModal, setProfileImgModal ] = useState(false);
  const [profileImgSrc, setProfileImgSrc] = useState(require("../../assets/img/user-avatar.png").default);
  const [profileImgPreview, setProfileImgPreview] = useState(profileImgSrc || null);
  const toggle = () => setProfileImgModal(!profileImgModal);

  const onProfileImgClose = () => setProfileImgPreview(null);
  const onProfileImgCrop = (preview) => setProfileImgPreview(preview);

  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
          <Card className="card-profile shadow">
            <Row className="justify-content-center">
              <Col className="order-lg-2" lg="3">
                <div className="card-profile-image">
                  <a onClick={(e) => e.preventDefault()}>
                    <img
                      alt="Preview"
                      className="rounded-circle"
                      src={profileImgPreview}
                    />
                    <Modal
                      isOpen={profileImgModal}
                      toggle={toggle}
                      centered={true}
                    >
                      <ModalHeader toggle={toggle}>Edit Image</ModalHeader>
                      <ModalBody>
                        <div className="d-flex flex-column justify-content-center">
                          <Row className="justify-content-center">
                            <Avatar
                              width={390}
                              height={295}
                              onCrop={onProfileImgCrop}
                              onClose={onProfileImgClose}
                              src={profileImgSrc}
                            />
                          </Row>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={toggle}>Save</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                  </a>
                </div>
              </Col>
            </Row>
            <CardBody className="pt-5 md-4">
              <Row>
                <div className="col">
                  <div className="d-flex justify-content-center mt-md-5 pt-5">
                    <Button
                      color="info"
                      href="#pablo"
                      onClick={toggle}
                      size="sm"
                    >
                      Edit Profile Image
                    </Button>
                  </div>
                </div>
              </Row>
            </CardBody>
            <CardBody className="pt-2 md-2">
              <div className="text-center">
                <h3 className="pb-2">
                  {user.NAME}
                </h3>
                <div>
                  <i className="ni education_hat mr-2" />
                  {user.POSITION}
                </div>
                {user.ASSIGNED_TASKS
                && (
                  <>
                    <Row>
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-5 py-0">
                          <div style={{marginRight: '1rem'}}>
                            <span className="heading">{user.ASSIGNED_TASKS.length}</span>
                            <span className="description">Assigned Tasks</span>
                          </div>
                        </div>
                      </div>
                    </Row>
                    <Row>
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center py-0">
                          <div>
                  <span className="heading">
                {user.ASSIGNED_TASKS.filter(isTaskPending).length}
                  </span>
                            <span className="description">Pending</span>
                          </div>
                          <div>
                  <span className="heading">
                {user.ASSIGNED_TASKS.filter(isTaskInProgress).length}
                  </span>
                            <span className="description">Doing</span>
                          </div>
                          <div>
                  <span className="heading">
                {user.ASSIGNED_TASKS.filter(isTaskCompleted).length}
                  </span>
                            <span className="description">Completed</span>
                          </div>
                        </div>
                      </div>
                    </Row>
                  </>
                )
                }
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col className="order-xl-1" xl="8">
          <AccountInfoForm
            header="My Account"
            initData={userInfo}
            onSubmit={onSubmit}
            loading={isLoading}
            isCurrentUser
          />
        </Col>
      </Row>
    </Container>
  )
}

export default AccountInfo;
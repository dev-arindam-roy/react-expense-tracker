import React, { useState, useEffect, useCallback } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FiLogIn } from "react-icons/fi";
import { toast } from "react-toastify";

const initAuthInfo = {
  auth_name: "",
  auth_username: process.env.REACT_APP_USERNAME || "",
  auth_password: process.env.REACT_APP_PASSWORD || "",
};

const Auth = ({ sendAuthInfo, isUserSignOut, resetSignOut }) => {
  const [authInfo, setAuthInfo] = useState(initAuthInfo);
  const [isShowAuthModal, setIsShowAuthModal] = useState(true);

  const signInButtonHandler = () => {
    document.getElementById("signInFormHiddenSubmitBtn").click();
  };

  const signinFormHandler = (e) => {
    e.preventDefault();
    if (
      authInfo.auth_username === process.env.REACT_APP_USERNAME &&
      authInfo.auth_password === process.env.REACT_APP_PASSWORD
    ) {
      localStorage.setItem(
        `${process.env.REACT_APP_LOCAL_STORAGE_KEY}-AUTH_NAME`,
        authInfo.auth_name
      );
      localStorage.setItem(
        `${process.env.REACT_APP_LOCAL_STORAGE_KEY}-IS_AUTH_SUCCESS`,
        true
      );
      setIsShowAuthModal(false);
      toast.success(`Hi, ${authInfo.auth_name}, Welcome to Account!`);
      sendAuthInfo(authInfo);
    } else {
      toast.error("Sorry! Username & Password is Wrong!");
      localStorage.removeItem(
        `${process.env.REACT_APP_LOCAL_STORAGE_KEY}-AUTH_NAME`
      );
      localStorage.removeItem(
        `${process.env.REACT_APP_LOCAL_STORAGE_KEY}-IS_AUTH_SUCCESS`
      );
    }
  };

  const checkAuth = () => {
    if (
      localStorage.getItem(
        `${process.env.REACT_APP_LOCAL_STORAGE_KEY}-IS_AUTH_SUCCESS`
      )
    ) {
      setAuthInfo({
        ...authInfo,
        auth_name: localStorage.getItem(
          `${process.env.REACT_APP_LOCAL_STORAGE_KEY}-AUTH_NAME`
        ),
      });
      setIsShowAuthModal(false);
      sendAuthInfo(authInfo);
    } else {
      setIsShowAuthModal(true);
      setAuthInfo(initAuthInfo);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [isShowAuthModal]);

  const signOut = () => {
    if (isUserSignOut) {
      localStorage.removeItem(
        `${process.env.REACT_APP_LOCAL_STORAGE_KEY}-IS_AUTH_SUCCESS`
      );
      localStorage.removeItem(
        `${process.env.REACT_APP_LOCAL_STORAGE_KEY}-AUTH_NAME`
      );
      setAuthInfo(initAuthInfo);
      setIsShowAuthModal(true);
      sendAuthInfo({});
      resetSignOut();
    }
  };

  useEffect(() => {
    signOut();
  }, [isUserSignOut]);

  return (
    <>
      <Modal
        backdrop="static"
        keyboard={false}
        show={isShowAuthModal}
        dialogClassName="blur-backdrop"
        centered
        scrollable
      >
        <Modal.Header>
          <Modal.Title>
            <FiLogIn className="icon-adjust-2" /> Sign-In
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={signinFormHandler}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="authName">
                  <Form.Control
                    type="text"
                    name="auth_name"
                    placeholder="Your Name"
                    value={authInfo.auth_name}
                    required
                    onChange={(e) =>
                      setAuthInfo({ ...authInfo, auth_name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="authUserName">
                  <Form.Control
                    type="text"
                    name="auth_username"
                    placeholder="Username"
                    value={authInfo.auth_username}
                    required
                    onChange={(e) =>
                      setAuthInfo({
                        ...authInfo,
                        auth_username: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="authPassword">
                  <Form.Control
                    type="password"
                    name="auth_password"
                    placeholder="Password"
                    value={authInfo.auth_password}
                    required
                    onChange={(e) =>
                      setAuthInfo({
                        ...authInfo,
                        auth_password: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              type="submit"
              id="signInFormHiddenSubmitBtn"
              variant="secondary"
              className="d-none"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={signInButtonHandler}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Auth;

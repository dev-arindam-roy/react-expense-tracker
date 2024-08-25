import React, { useState } from "react";
import Auth from "./auth/Auth";
import AddEditExpense from "./AddEditExpense";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { FiLogOut, FiDatabase, FiUser, FiPlus } from "react-icons/fi";

const ExpenseTracker = () => {
  const [authUser, setAuthUser] = useState({});
  const [isSignOut, setIsSignOut] = useState(false);

  const [isExpenseModalShow, setIsExpenseModalShow] = useState(false);
  
  /** Receive data from child component::Auth */
  const receivedAuthInfo = (authInfoObj) => {
    setAuthUser(authInfoObj);
  };
  /** Send data to child component::Auth */
  const signOutEventHandler = () => {
    setIsSignOut(true);
  };
  /** Received and set data from child component::Auth */
  const resetSignOut = () => {
    setIsSignOut(false);
  };
  /** Send data to child component::AddEditExpense */
  const openExpenseModalHandler = () => {
    setIsExpenseModalShow(true);
  }
  /** Received data from child component::AddEditExpense */
  const resetExpenseModal = () => {
    setIsExpenseModalShow(false);
  }
  return (
    <>
      <Container fluid="md">
        <Row className="mt-5">
          <Col xs={12} sm={12} md={6}>
            <h1>
              <strong>Expense Tracker</strong>
            </h1>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={6}
            className="d-flex justify-content-end align-items-center"
          >
            <Button variant="success" className="me-2" onClick={openExpenseModalHandler}>
              <FiPlus className="icon-adjust-3" /> Add Expense
            </Button>{" "}
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                <FiUser className="icon-adjust-3" />
                Hello <span>{authUser?.auth_name || "user"}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/billing-info">
                  <FiDatabase className="icon-adjust-3" /> History
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/logout" onClick={signOutEventHandler}>
                  <FiLogOut className="icon-adjust-3" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
      <Auth
        sendAuthInfo={receivedAuthInfo}
        isUserSignOut={isSignOut}
        resetSignOut={resetSignOut}
      />
      <AddEditExpense isExpenseModalShowEvent={isExpenseModalShow} resetExpenseModalState={resetExpenseModal} />
    </>
  );
};

export default ExpenseTracker;

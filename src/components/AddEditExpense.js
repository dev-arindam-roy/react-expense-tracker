import React, { useState, useEffect, useCallback } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FiPlusSquare, FiSave } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const initExpense = {
  expense_date: "",
  expense_list: [{ name: "", amount: "" }],
  total_expense: "",
};

const AddEditExpense = ({
  isExpenseModalShowEvent,
  resetExpenseModalState,
}) => {
  const [isShowExpenseModal, setIsShowExpenseModal] = useState(false);
  const [expenses, setExpenses] = useState(initExpense);
  const expenseModalCloseHandler = () => {
    setExpenses(initExpense);
    setIsShowExpenseModal(false);
    resetExpenseModalState();
  };
  const expenseSaveButtonHandler = () => {
    document.getElementById("expenseFormHiddenSubmitBtn").click();
  };
  const expenseFormHandler = (e) => {
    e.preventDefault();
    setExpenses(initExpense);
    setIsShowExpenseModal(false);
    resetExpenseModalState();
  };
  useEffect(() => {
    if (isExpenseModalShowEvent) {
      setIsShowExpenseModal(true);
    }
  }, [isExpenseModalShowEvent]);

  const onChangeExpenseItemHandler = (evt, index) => {
    let _expenseItems = [...expenses.expense_list];
    _expenseItems[index].name = evt.target.value;
    setExpenses({ ...expenses, expense_list: _expenseItems });
  };

  const onChangeExpenseAmountHandler = (evt, index) => {
    let _expenseItems = [...expenses.expense_list];
    _expenseItems[index].amount = evt.target.value;
    setExpenses({ ...expenses, expense_list: _expenseItems });
    calculateTotalExpenseAmount();
  };

  const removeExpenseRowHandler = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this item",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        let _expenseItems = [...expenses.expense_list];
        _expenseItems.splice(index, 1);
        setExpenses({ ...expenses, expense_list: _expenseItems });
        calculateTotalExpenseAmount();
      }
    });
  };

  const addMoreExpenseItemRowHandler = () => {
    setExpenses({
      ...expenses,
      expense_list: [...expenses.expense_list, { name: "", amount: "" }],
    });
  };

  const calculateTotalExpenseAmount = useCallback(() => {
    let _totalExpenses = 0;
    if (expenses.expense_list.length > 0) {
      expenses.expense_list.forEach((item) => {
        let _amount = parseFloat(item.amount) || 0;
        _totalExpenses += _amount;
      });
    }
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      total_expense: _totalExpenses.toFixed(2),
    }));
  }, [expenses.expense_list]);

  useEffect(() => {
    calculateTotalExpenseAmount();
  }, [expenses.expense_list, calculateTotalExpenseAmount]);

  return (
    <>
      <Modal
        backdrop="static"
        keyboard={false}
        show={isShowExpenseModal}
        onHide={expenseModalCloseHandler}
        size="lg"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FiPlusSquare className="icon-adjust-3" /> Add Expense
            <span className="text-danger mx-2">
              <small><i>({expenses.total_expense || "0.00"})</i></small>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={expenseFormHandler}>
            {expenses.expense_list.length > 0 &&
              expenses.expense_list.map((item, index) => {
                return (
                  <Row key={"expense-item-row-" + index}>
                    <Col md={7} sm={7} xs={7}>
                      <Form.Group
                        className="mb-3"
                        controlId={"expenseItem-" + index}
                      >
                        {index === 0 && (
                          <Form.Label>
                            <strong>Expense In/For:</strong>
                          </Form.Label>
                        )}
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name={"expense_item[" + index + "]"}
                          placeholder="Expense In..."
                          value={item.name}
                          required
                          onChange={(e) => onChangeExpenseItemHandler(e, index)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3} sm={3} xs={3}>
                      <Form.Group
                        className="mb-3"
                        controlId={"expenseAmount-" + index}
                      >
                        {index === 0 && (
                          <Form.Label>
                            <strong>Expense Amount:</strong>
                          </Form.Label>
                        )}
                        <Form.Control
                          type="number"
                          name={"expense_amount[" + index + "]"}
                          placeholder="Amount"
                          value={item.amount}
                          min={1}
                          required
                          onChange={(e) =>
                            onChangeExpenseAmountHandler(e, index)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={2} sm={2} md={2}>
                      {index > 0 && (
                        <MdDelete
                          className="row-delete-icon-adjust text-danger"
                          onClick={() => removeExpenseRowHandler(index)}
                        />
                      )}
                    </Col>
                  </Row>
                );
              })}
            <Button
              type="submit"
              id="expenseFormHiddenSubmitBtn"
              variant="secondary"
              className="d-none"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="primary" onClick={addMoreExpenseItemRowHandler}>
            <FiPlusSquare className="icon-adjust-3" /> Add More Expenses
          </Button>
          <Button variant="success" onClick={expenseSaveButtonHandler}>
            <FiSave className="icon-adjust-3" /> Add & Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddEditExpense;

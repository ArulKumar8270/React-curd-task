import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmplyee,
  deleteEmpoyee,
  updateEmployee,
} from "../slices/employeeSlice";
import { RootState } from "../store/store";
import { logout } from "../slices/authSlice";
import { Button, Modal } from "react-bootstrap";

export const AddEmpoyee = () => {
  const dispatch = useDispatch();
  const employee = useSelector(
    (state: RootState) => state.employee.employeeList
  );
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useSelector((state: RootState) => state.auth.user);

  console.log(employee, "employee1234");
  const [employeeForm, setEmployeeForm] = useState({
    username: null,
    password: null,
    role: "admin",
    additionalInfo: null,
    id: null,
    employeeName: null,
    skill: null,
  });
  const [errorMessage, setErrorMessage] = useState(null);

  console.log(employeeForm, "employeeForm234321", errorMessage);

  const onSubmit = (e) => {
    e.preventDefault();
    let errorMessage = {};

    if (!employeeForm.username) {
      errorMessage["username"] = "This field is required";
    }
    if (!employeeForm.employeeName) {
      errorMessage["username"] = "This field is required";
    }
    if (!employeeForm.password) {
      errorMessage["password"] = "This field is required";
    }
    if (!employeeForm.additionalInfo) {
      errorMessage["additionalInfo"] = "This field is required";
    }
    setErrorMessage(errorMessage);
    if (Object.keys(errorMessage).length === 0) {
      if (employeeForm?.id !== undefined && employeeForm.id !== null) {
        dispatch(updateEmployee(employeeForm));
        handleClose();
      } else {
        dispatch(addEmplyee(employeeForm));
        handleClose();
      }

      setEmployeeForm({
        username: null,
        password: null,
        role: "admin",
        additionalInfo: null,
        id: null,
        employeeName: null,
        skill: null,
      });
    }

    console.log(employeeForm, "submitData");
  };

  const onHandleFormField = (value, name) => {
    setEmployeeForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onEditUser = (id) => {
    handleShow();
    setEmployeeForm({
      username: employee[id]?.username,
      password: employee[id]?.password,
      role: employee[id]?.role,
      additionalInfo: employee[id]?.additionalInfo,
      id: id,
      employeeName: employee[id]?.employeeName,
      skill: employee[id]?.skill,
    });
  };

  return (
    <div className="container mt-5">
      <div className="container">
        <div className="container mt-5">
          <h2>Employee List</h2>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-primary"
              onClick={() => dispatch(logout())}
            >
              Log Out
            </button>
            <button className="btn btn-primary" onClick={handleShow}>
              Add Employee
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee Name</th>
                <th>Username</th>
                <th>Role</th>
                <th>Additional Info</th>
                <th>Skills</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employee?.map((employee, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{employee?.employeeName}</td>
                  <td>{employee?.username}</td>
                  <td>{employee?.role}</td>
                  <td>{employee?.additionalInfo}</td>
                  <td>{employee?.skill}</td>
                  <td>
                    <button
                      className="me-3 btn btn-primary"
                      onClick={() => onEditUser(index)}
                    >
                      Edit
                    </button>
                    {user?.role !== "employee" && (
                      <button
                        className="btn btn-secondary"
                        onClick={() => dispatch(deleteEmpoyee(index))}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>My Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={onSubmit}>
              {" "}
              <div className="form-group mb-3">
                <label htmlFor="username">Employee Name:</label>
                <input
                  value={employeeForm?.employeeName}
                  type="text"
                  className="form-control"
                  id="employeeName"
                  placeholder="Enter username"
                  onChange={(e) =>
                    onHandleFormField(e.target.value, "employeeName")
                  }
                />
                {errorMessage?.username && (
                  <span className="error">{errorMessage?.username}</span>
                )}
              </div>
              {user?.role !== "employee" ? (
                <>
                  <div className="form-group mb-3">
                    <label htmlFor="username">Username:</label>
                    <input
                      value={employeeForm?.username}
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter username"
                      onChange={(e) =>
                        onHandleFormField(e.target.value, "username")
                      }
                    />
                    {errorMessage?.username && (
                      <span className="error">{errorMessage?.username}</span>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Password:</label>
                    <input
                      value={employeeForm?.password}
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      onChange={(e) =>
                        onHandleFormField(e.target.value, "password")
                      }
                    />
                    {errorMessage?.password && (
                      <span className="error">{errorMessage?.password}</span>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="role">Role:</label>
                    <select
                      value={employeeForm?.role}
                      className="form-control"
                      id="role"
                      onChange={(e) =>
                        onHandleFormField(e.target.value, "role")
                      }
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="employee">Employee</option>
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="additionalInfo">
                      Additional Information:
                    </label>
                    <textarea
                      value={employeeForm?.additionalInfo}
                      className="form-control"
                      id="additionalInfo"
                      rows={3}
                      placeholder="Enter additional information"
                      onChange={(e) =>
                        onHandleFormField(e.target.value, "additionalInfo")
                      }
                    ></textarea>
                    {errorMessage?.additionalInfo && (
                      <span className="error">
                        {errorMessage?.additionalInfo}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <div className="form-group mb-3">
                  <label htmlFor="additionalInfo">
                    Add skills using comma seperater
                  </label>
                  <textarea
                    value={employeeForm?.skill}
                    className="form-control"
                    id="skill"
                    rows={3}
                    placeholder="Enter skills"
                    onChange={(e) => onHandleFormField(e.target.value, "skill")}
                  ></textarea>
                  {errorMessage?.skill && (
                    <span className="error">{errorMessage?.skill}</span>
                  )}
                </div>
              )}
              {user.role !== "admin" && (
                <div className="form-group mb-3">
                  <label htmlFor="role">Upload image:</label>
                  <input
                    // value={employeeForm?.file}
                    type="file"
                    accept=".jpeg, .jpg, .png"
                    className="form-control"
                    id="file"
                    onChange={(e) => onHandleFormField(e.target.value, "file")}
                  />
                </div>
              )}
              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" className="btn btn-primary w-auto">
                  {employeeForm?.id !== undefined && employeeForm.id !== null
                    ? "Update"
                    : "Submit"}
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

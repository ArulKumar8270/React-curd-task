import React, { useState } from "react";
import { users } from "../userData";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../slices/authSlice";

const Login = () => {
  const dispatch = useDispatch(); //create action method
  const [loginForm, setLoginForm] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    if (authenticateUser(loginForm?.userName, loginForm?.password)) {
      dispatch(
        loginSuccess(authenticateUser(loginForm?.userName, loginForm?.password)) //store data to slice
      );
    } else {
      alert("Please check username and password");
    }

    console.log(
      loginForm,
      "submitData",
      authenticateUser(loginForm?.userName, loginForm?.password)
    );
  };

  const authenticateUser = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    return user ? { ...user } : null;
  };

  const onHandleFormField = (value, name) => {
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="parent">
        <div className="col-3">
          <h3 className="heading">Login</h3>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputUsername" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername"
                placeholder="Name"
                onChange={(e) => onHandleFormField(e.target.value, "userName")}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) => onHandleFormField(e.target.value, "password")}
              />
            </div>
            <div className="button">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

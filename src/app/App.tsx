import React from "react";
import Login from "./Components/Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { AdminDashboard } from "./Components/AdminDashboard";

export const App = () => {
  const user = useSelector((state: RootState) => state.auth.user); //get state value from slice
  console.log(user, "user23412");
  return <div>{!user ? <Login /> : <AdminDashboard />}</div>;
};

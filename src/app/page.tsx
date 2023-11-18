"use client";
import Image from "next/image";
import Login from "./Components/Login";
import { Provider } from "react-redux";
import store from "./store/store";
import { App } from "./App";

export default function Home() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

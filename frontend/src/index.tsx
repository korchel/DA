import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { init } from "./init";

const app = () => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
  );
  const vdom = init();
  root.render(vdom);
};

app();

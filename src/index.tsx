import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

const root = (
  <BrowserRouter>
    <div>My Custom React Template</div>
  </BrowserRouter>
);

ReactDOM.render(root, document.getElementById("root"));

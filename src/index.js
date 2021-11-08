import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// const bech32Address =
//   "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllst77y4l";

// console.log({ bech32Address });

// const hexAddress = new Address(bech32Address).hex();

// console.log({ hexAddress });

// const testOutput =
//   "000000000000000000010000000000000000000000000000000000000001ffff";

// console.log(hexAddress === testOutput);

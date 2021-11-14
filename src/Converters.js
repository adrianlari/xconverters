import React from "react";
import * as checks from "./check";
import { Address, Balance } from "@elrondnetwork/erdjs/out";

const Converters = () => {
  const [input, setInput] = React.useState("");

  let [counter, setCounter] = React.useState(0);

  const [displayableResults, setDisplayableResults] = React.useState([]);

  const displayPossibleResults = () => {
    return (
      <div>
        {displayableResults.map((result) =>
          convertedItem(result.id, result.value)
        )}
      </div>
    );
  };

  const convert = (input) => {
    if (checks.bech32Address(input)) {
      let result;
      try {
        result = new Address(input).hex();
      } catch {}

      if (result) {
        setDisplayableResults((oldArray) => [
          ...oldArray,
          { id: "bech32ToHex", value: result },
        ]);
      }
    }

    if (checks.hexAddress(input)) {
      let result;
      try {
        result = new Address(input).bech32();
      } catch {}

      if (result) {
        setDisplayableResults((oldArray) => [
          ...oldArray,
          { id: "hexToBech32", value: result },
        ]);
      }
    }

    if (checks.decimal(input)) {
      let result = parseInt(input, 10).toString(16);

      if (result.length % 2 === 1) {
        result = "0" + result;
      }

      setDisplayableResults((oldArray) => [
        ...oldArray,
        { id: "decimalToHexa", value: result },
      ]);
    }

    if (checks.hexadecimal(input)) {
      const result = parseInt(input, 16);

      setDisplayableResults((oldArray) => [
        ...oldArray,
        { id: "hexaToDecimal", value: result },
      ]);
    }

    if (checks.decimal(input)) {
      const result = Buffer.from(input, "ascii").toString("base64");

      setDisplayableResults((oldArray) => [
        ...oldArray,
        { id: "decimalToBase64", value: result },
      ]);
    }

    if (checks.base64Value(input)) {
      const result = Buffer.from(input, "base64").toString("ascii");

      setDisplayableResults((oldArray) => [
        ...oldArray,
        { id: "base64ToDecimal", value: result },
      ]);
    }

    if (checks.amount(input)) {
      const result = Balance.egld(input).toString();

      setDisplayableResults((oldArray) => [
        ...oldArray,
        {
          id: "amountToDenominatedAmount",
          value: result,
        },
      ]);
    }

    if (checks.denominatedAmount(input)) {
      const result = Balance.fromString(input).toCurrencyString();

      setDisplayableResults((oldArray) => [
        ...oldArray,
        {
          id: "denominatedAmountToAmount",
          value: result,
        },
      ]);
    }

    if (checks.stringValue(input)) {
      const result = Buffer.from(input, "ascii").toString("hex");

      setDisplayableResults((oldArray) => [
        ...oldArray,
        {
          id: "stringToHexadecimal",
          value: result,
        },
      ]);
    }

    if (checks.hexaEncodedString(input)) {
      const result = Buffer.from(input, "hex").toString("utf8");

      setDisplayableResults((oldArray) => [
        ...oldArray,
        {
          id: "hexadecimalEncodedStringToString",
          value: result,
        },
      ]);
    }

    if (checks.stringValue(input)) {
      const result = Buffer.from(input, "ascii").toString("base64");

      setDisplayableResults((oldArray) => [
        ...oldArray,
        {
          id: "stringToBase64EncodedString",
          value: result,
        },
      ]);
    }

    if (checks.base64EncodedString(input)) {
      const result = Buffer.from(input, "base64").toString("ascii");

      setDisplayableResults((oldArray) => [
        ...oldArray,
        {
          id: "base64EncodedStringToString",
          value: result,
        },
      ]);
    }

    if (checks.hexaEncodedString(input)) {
      const result = Buffer.from(input, "hex").toString("base64");

      setDisplayableResults((oldArray) => [
        ...oldArray,
        {
          id: "hexadecimalEncodedStringToBase64EncodedString",
          value: result,
        },
      ]);
    }

    if (checks.base64EncodedString(input)) {
      const result = Buffer.from(input, "base64").toString("hex");

      setDisplayableResults((oldArray) => [
        ...oldArray,
        {
          id: "base64EncodedStringToHexadecimalEncodedString",
          value: result,
        },
      ]);
    }

    displayPossibleResults();
  };

  const converters = [
    {
      label: "Bech32 To Hex",
      value: "bech32ToHex",
    },
    {
      label: "Hex to Bech32",
      value: "hexToBech32",
    },
    {
      label: "Decimal to Hexadecimal",
      value: "decimalToHexa",
    },
    {
      label: "Hexadecimal to Decimal",
      value: "hexaToDecimal",
    },
    {
      label: "Decimal to Base64",
      value: "decimalToBase64",
    },
    {
      label: "Base64 to Decimal",
      value: "base64ToDecimal",
    },
    {
      label: "Amount to Denominated amount",
      value: "amountToDenominatedAmount",
    },
    {
      label: "Denominated amount to Amount",
      value: "denominatedAmountToAmount",
    },
    {
      label: "String to Hexadecimal Encoded String",
      value: "stringToHexadecimal",
    },
    {
      label: "Hexadecimal Encoded String to String",
      value: "hexadecimalEncodedStringToString",
    },
    {
      label: "String to Base64 Encoded String",
      value: "stringToBase64EncodedString",
    },
    {
      label: "Base64 Encoded String to String",
      value: "base64EncodedStringToString",
    },
    {
      label: "Hexadecimal Encoded String to Base64 Encoded String",
      value: "hexadecimalEncodedStringToBase64EncodedString",
    },
    {
      label: "Base64 Encoded String to Hexadecimal Encoded String",
      value: "base64EncodedStringToHexadecimalEncodedString",
    },
  ];

  const copyToCliboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const convertedItem = (msg, result) => {
    const label = converters.map((pair) => {
      if (pair.value === msg) return pair.label;
      return "";
    });

    return (
      <div className="row py-3 border-bottom detail-item " key={counter++}>
        <div className="col-lg-5 text-secondary text-lg-right pl-lg-spacer">
          {label}
        </div>
        <div className="col pr-lg-spacer">
          <div className="d-flex align-items-center text-break-all">
            {result}
            <a
              href="#"
              onClick={() => copyToCliboard(result)}
              className="side-action "
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="check"
                className="svg-inline--fa fa-clone fa-w-16 "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="main-search-container py-spacer">
        <div className="container py-3">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="mb-4">The Elrond Converters</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-9 mx-auto">
              <form className="main-search w-100 d-flex">
                <div className="input-group input-group-seamless">
                  <input
                    type="text"
                    value={input}
                    className="form-control border-0 rounded-pill py-3 pl-3 pl-lg-4 text-truncate"
                    placeholder="Insert a value to be converted."
                    onChange={(event) => {
                      setInput(event.target.value);
                      setDisplayableResults([]);
                      setCounter(0);
                      convert(event.target.value);
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
          <div>
            <div className="container page-content">
              <div className="row">
                <div className="col-9" style={{ marginLeft: "12.5%" }}>
                  <div className="transaction-info card">
                    <div
                      className="card-header status-text-success"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <div className="card-header-item d-flex align-items-center">
                        <span>Possible Conversions</span>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <div className="container-fluid">
                        <div className="tab-content">
                          <div
                            id="transaction-tabs-tabpane-details"
                            aria-labelledby="transaction-tabs-tab-details"
                            role="tabpanel"
                            aria-hidden="false"
                            className="fade tab-pane active show"
                          >
                            <div>{displayPossibleResults()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converters;

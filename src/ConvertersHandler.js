import React from "react";
import * as checks from "./check";
import { Address, Balance } from "@elrondnetwork/erdjs/out";
import { ConversionTypes } from "./conversionTypes";
import { converters } from "./convertersObjects";
import ResultRow from "./ResultRow";

const ConvertersHandler = () => {
  const [input, setInput] = React.useState([]);

  const [displayableResults, setDisplayableResults] = React.useState([]);

  const displayPossibleResults = () => {
    return (
      <div>
        {displayableResults.map((result) => {
          return convertedItem(result.id, result.value);
        })}
      </div>
    );
  };

  const convert = (inputArray) => {
    inputArray.map((word) => convertWord(word));
  };

  const addToDisplayableResults = (id, value) => {
    setDisplayableResults((oldArray) => [
      ...oldArray,
      { id: id, value: value },
    ]);
  };

  const convertWord = (input) => {
    if (!input) {
      return;
    }

    if (checks.bech32Address(input)) {
      let result;
      try {
        result = new Address(input).hex();
      } catch {}

      if (result) {
        addToDisplayableResults(ConversionTypes.bech32ToHex, result);
      }
    }

    if (checks.hexAddress(input)) {
      let result;
      try {
        result = new Address(input).bech32();
      } catch {}

      if (result) {
        addToDisplayableResults(ConversionTypes.hexToBech32, result);
      }
    }

    if (checks.decimal(input)) {
      let result = parseInt(input, 10).toString(16);

      if (result.length % 2 === 1) {
        result = "0" + result;
      }

      if (checks.hexadecimal(result)) {
        addToDisplayableResults(ConversionTypes.decimalToHexa, result);
      }
    }

    if (checks.hexadecimal(input)) {
      const result = parseInt(input, 16);

      if (checks.decimal(result)) {
        addToDisplayableResults(ConversionTypes.hexaToDecimal, result);
      }
    }

    if (checks.decimal(input)) {
      const result = Buffer.from(input, "ascii").toString("base64");

      addToDisplayableResults(ConversionTypes.decimalToBase64, result);
    }

    if (checks.base64Value(input)) {
      const result = Buffer.from(input, "base64").toString("ascii");

      if (checks.decimal(result)) {
        addToDisplayableResults(ConversionTypes.base64ToDecimal, result);
      }
    }

    if (checks.amount(input)) {
      const result = Balance.egld(input).toString();

      addToDisplayableResults(ConversionTypes.amountToDenominated, result);
    }

    if (checks.denominatedAmount(input)) {
      const result = Balance.fromString(input).toCurrencyString();

      addToDisplayableResults(ConversionTypes.denominatedToAmount, result);
    }

    if (checks.stringValue(input)) {
      const result = Buffer.from(input, "ascii").toString("hex");

      if (checks.hexadecimal(result)) {
        addToDisplayableResults(ConversionTypes.stringToHexadecimal, result);
      }
    }

    if (checks.hexaEncodedString(input)) {
      const result = Buffer.from(input, "hex").toString("utf8");

      addToDisplayableResults(ConversionTypes.hexadecimalToString, result);
    }

    if (checks.stringValue(input)) {
      const result = Buffer.from(input, "ascii").toString("base64");

      addToDisplayableResults(ConversionTypes.stringToBase64, result);
    }

    if (checks.base64EncodedString(input)) {
      const result = Buffer.from(input, "base64").toString("ascii");

      addToDisplayableResults(ConversionTypes.base64ToString, result);
    }

    if (checks.hexaEncodedString(input)) {
      const result = Buffer.from(input, "hex").toString("base64");

      addToDisplayableResults(ConversionTypes.hexadecimalToBase64, result);
    }

    if (checks.base64EncodedString(input)) {
      const result = Buffer.from(input, "base64").toString("hex");

      addToDisplayableResults(ConversionTypes.base64ToHexadecimal, result);
    }

    displayPossibleResults();
  };

  const convertedItem = (id, result) => {
    const label = converters.map((pair) => {
      if (pair.value === id) return pair.label;
      return "";
    });

    if (!result) return "";

    return <ResultRow label={label} result={result} />;
  };

  return (
    <div>
      <div className="main-search-container py-spacer">
        <div className="container py-3">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="mb-4"> Elrond Converters</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-9 mx-auto">
              <form className="main-search w-100 d-flex">
                <div className="input-group ">
                  <input
                    type="text"
                    value={input}
                    className="form-control border-0 rounded-pill py-3 pl-3 pl-lg-4 text-truncate"
                    placeholder="Insert a value to be converted."
                    onChange={(event) => {
                      setInput(event.target.value);
                      setDisplayableResults([]);
                      convert(event.target.value.split("@"));
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
          <div style={{ marginTop: "2%" }}>
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

export default ConvertersHandler;

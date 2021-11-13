import React from "react";
import * as checks from "./check";
import { Address, Balance } from "@elrondnetwork/erdjs/out";

const Converters = () => {
  const [input, setInput] = React.useState("");

  const [displayableResults, setDisplayableResults] = React.useState([]);

  const createResult = (msg, result) => {
    return (
      <div>
        If you wanted to {msg}, here is your result:
        <p style={{ marginLeft: "30px", fontWeight: "bold" }}>{result} </p>
      </div>
    );
  };

  const displayPossibleResults = () => {
    return (
      <div>
        {displayableResults.map((result) =>
          createResult(result.id, result.value)
        )}
      </div>
    );
  };

  const convert = (input) => {
    if (checks.bech32Address(input)) {
      const result = new Address(input).hex();

      displayableResults.push({ id: "bech32ToHex", value: result });
    }

    if (checks.hexAddress(input)) {
      const result = new Address(input).bech32();

      setDisplayableResults((oldArray) => [
        ...oldArray,
        { id: "hexToBech32", value: result },
      ]);
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

  return (
    <div
      id="addresses"
      style={{ backgroundColor: "lightgray", width: "700px" }}
    >
      <div>Address convertors</div>
      <div>
        <label>Choose Converter Type</label>

        <div>
          <input
            size="80"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setDisplayableResults([]);

              convert(event.target.value);
            }}
          ></input>
        </div>
        <div>{displayPossibleResults()}</div>
      </div>
    </div>
  );
};

export default Converters;

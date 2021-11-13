import React from "react";
import * as checks from "./check";
import { Address, Balance } from "@elrondnetwork/erdjs/out";

const Converters = () => {
  const [selectedConvertor, setSelectedConvertor] = React.useState(
    "bech32ToHex"
  );
  const [selectedLabel, setSelectedLabel] = React.useState("Bech32 to Hex");
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  // let displayableResults = [];
  const [displayableResults, setDisplayableResults] = React.useState([]);

  const [isResultVisible, setIsResultVisible] = React.useState(false);

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

  const convert = () => {
    console.log("converting...");
    //setDisplayableResults([]);
    console.log(input);
    if (checks.bech32Address(input)) {
      const result = new Address(input).hex();

      displayableResults.push({ id: "bech32ToHex", value: result });

      //console.log(displayableResults);
    }

    if (checks.hexAddress(input)) {
      const result = new Address(input).bech32();

      setDisplayableResults((oldArray) => [
        ...oldArray,
        { id: "hexToBech32", value: result },
      ]);

      //console.log(displayableResults);
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

      //console.log(displayableResults);
    }

    if (checks.hexadecimal(input)) {
      const result = parseInt(input, 16);

      setDisplayableResults((oldArray) => [
        ...oldArray,
        { id: "hexaToDecimal", value: result },
      ]);

      //console.log(displayableResults);
    }

    if (checks.decimal(input)) {
      const result = Buffer.from(input, "ascii").toString("base64");

      setDisplayableResults((oldArray) => [
        ...oldArray,
        { id: "decimalToBase64", value: result },
      ]);

      //console.log(displayableResults);
    }

    if (checks.base64Value(input)) {
      const result = Buffer.from(input, "base64").toString("ascii");

      setDisplayableResults((oldArray) => [
        ...oldArray,
        { id: "base64ToDecimal", value: result },
      ]);

      //console.log(displayableResults);
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
      //console.log(displayableResults);
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

      //console.log(displayableResults);
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

      //console.log(displayableResults);
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
      //console.log(displayableResults);
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

      //console.log(displayableResults);
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

      //console.log(displayableResults);
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

      //console.log(displayableResults);
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

      //console.log(displayableResults);
    }

    displayPossibleResults();
    setIsResultVisible(true);
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

        {/* <div>
          <h4>Convert {selectedLabel}</h4>
        </div> */}
        {/* <div>
          <Picker
            selectedValue={selectedConvertor}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedConvertor(itemValue);
              setSelectedLabel(converters[itemIndex].label);
              setInput("");
              setIsResultVisible(false);
            }}
          >
            {converters.map((converter) => {
              return (
                <Picker.Item label={converter.label} value={converter.value} />
              );
            })}
          </Picker>
        </div> */}
        <div>
          <input
            size="80"
            value={input}
            onChange={(event) => {
              setInput(event.target.value.toString());
              setDisplayableResults([]);
              convert();
            }}
          ></input>
          {/* <button
            onClick={convert}
            style={{
              marginTop: "7px",
              borderRadius: "7px",
              backgroundColor: "blue",
              color: "white",
            }}
          >
            Convert
          </button> */}
        </div>
        <div>
          {/* Result :<div style={{ paddingLeft: "30px" }}>{output}</div> */}
          {displayPossibleResults()}
        </div>
      </div>
    </div>
  );
};

export default Converters;

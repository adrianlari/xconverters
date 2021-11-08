import React from "react";
import { Picker } from "@react-native-picker/picker";
import * as checks from "./check";
import { Address, Balance } from "@elrondnetwork/erdjs/out";

const Converters = () => {
  const [selectedConvertor, setSelectedConvertor] = React.useState(
    "bech32ToHex"
  );
  const [selectedLabel, setSelectedLabel] = React.useState("Bech32 to Hex");
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  const [isResultVisible, setIsResultVisible] = React.useState(false);

  const convert = () => {
    switch (selectedConvertor) {
      case "bech32ToHex":
        if (checks.bech32Address(input)) {
          const result = new Address(input).hex();

          setOutput(result);
        }
        break;
      case "hexToBech32":
        if (checks.hexAddress(input)) {
          const result = new Address(input).bech32();

          setOutput(result);
        }
        break;
      case "decimalToHexa":
        if (checks.decimal(input)) {
          let result = parseInt(input, 10).toString(16);

          if (result.length % 2 === 1) {
            result = "0" + result;
          }

          setOutput(result);
        }

        break;
      case "hexaToDecimal":
        if (checks.hexadecimal(input)) {
          const result = parseInt(input, 16);

          setOutput(result);
        }

        break;
      case "decimalToBase64":
        if (checks.decimal(input)) {
          const result = Buffer.from(input, "ascii").toString("base64");

          setOutput(result);
        }

        break;
      case "base64ToDecimal":
        if (checks.base64Value(input)) {
          const result = Buffer.from(input, "base64").toString("ascii");

          setOutput(result);
        }

        break;
      case "amountToDenominatedAmount":
        if (checks.amount(input)) {
          const result = Balance.egld(input).toString();

          setOutput(result);
        }

        break;
      case "denominatedAmountToAmount":
        if (checks.denominatedAmount(input)) {
          const result = Balance.fromString(input).toCurrencyString();

          setOutput(result);
        }

        break;
      case "stringToHexadecimal":
        if (checks.stringValue(input)) {
          const result = Buffer.from(input, "ascii").toString("hex");

          setOutput(result);
        }

        break;
      case "hexadecimalEncodedStringToString":
        if (checks.hexaEncodedString(input)) {
          const result = Buffer.from(input, "hex").toString("utf8");

          setOutput(result);
        }

        break;
      case "stringToBase64EncodedString":
        if (checks.stringValue(input)) {
          const result = Buffer.from(input, "ascii").toString("base64");

          setOutput(result);
        }

        break;
      case "base64EncodedStringToString":
        if (checks.base64EncodedString(input)) {
          const result = Buffer.from(input, "base64").toString("ascii");

          setOutput(result);
        }

        break;
      case "hexadecimalEncodedStringToBase64EncodedString":
        if (checks.hexaEncodedString(input)) {
          const result = Buffer.from(input, "hex").toString("base64");

          setOutput(result);
        }

        break;
      case "base64EncodedStringToHexadecimalEncodedString":
        if (checks.base64EncodedString(input)) {
          const result = Buffer.from(input, "base64").toString("hex");

          setOutput(result);
        }

        break;

      default:
        console.log("Invalid Converting type");
    }

    if (checks.errorMessage !== "") {
      setOutput(checks.errorMessage);
    }

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

        <div>
          <h4>Convert {selectedLabel}</h4>
        </div>
        <div>
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
        </div>
        <div>
          <input
            size="80"
            value={input}
            onChange={(event) => {
              setInput(event.target.value.toString());
            }}
          ></input>
          <button
            onClick={convert}
            style={{
              marginTop: "7px",
              borderRadius: "7px",
              backgroundColor: "blue",
              color: "white",
            }}
          >
            Convert
          </button>
        </div>
        <div style={{ display: isResultVisible ? "block" : "none" }}>
          Result :<div style={{ paddingLeft: "30px" }}>{output}</div>
        </div>
      </div>
    </div>
  );
};

export default Converters;

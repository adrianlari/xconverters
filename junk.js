// switch (selectedConvertor) {
//   case "bech32ToHex":
//     if (checks.bech32Address(input)) {
//       const result = new Address(input).hex();

//       setOutput(result);
//     }
//     break;
//   case "hexToBech32":
//     if (checks.hexAddress(input)) {
//       const result = new Address(input).bech32();

//       setOutput(result);
//     }
//     break;
//   case "decimalToHexa":
//     if (checks.decimal(input)) {
//       let result = parseInt(input, 10).toString(16);

//       if (result.length % 2 === 1) {
//         result = "0" + result;
//       }

//       setOutput(result);
//     }

//     break;
//   case "hexaToDecimal":
//     if (checks.hexadecimal(input)) {
//       const result = parseInt(input, 16);

//       setOutput(result);
//     }

//     break;
//   case "decimalToBase64":
//     if (checks.decimal(input)) {
//       const result = Buffer.from(input, "ascii").toString("base64");

//       setOutput(result);
//     }

//     break;
//   case "base64ToDecimal":
//     if (checks.base64Value(input)) {
//       const result = Buffer.from(input, "base64").toString("ascii");

//       setOutput(result);
//     }

//     break;
//   case "amountToDenominatedAmount":
//     if (checks.amount(input)) {
//       const result = Balance.egld(input).toString();

//       setOutput(result);
//     }

//     break;
//   case "denominatedAmountToAmount":
//     if (checks.denominatedAmount(input)) {
//       const result = Balance.fromString(input).toCurrencyString();

//       setOutput(result);
//     }

//     break;
//   case "stringToHexadecimal":
//     if (checks.stringValue(input)) {
//       const result = Buffer.from(input, "ascii").toString("hex");

//       setOutput(result);
//     }

//     break;
//   case "hexadecimalEncodedStringToString":
//     if (checks.hexaEncodedString(input)) {
//       const result = Buffer.from(input, "hex").toString("utf8");

//       setOutput(result);
//     }

//     break;
//   case "stringToBase64EncodedString":
//     if (checks.stringValue(input)) {
//       const result = Buffer.from(input, "ascii").toString("base64");

//       setOutput(result);
//     }

//     break;
//   case "base64EncodedStringToString":
//     if (checks.base64EncodedString(input)) {
//       const result = Buffer.from(input, "base64").toString("ascii");

//       setOutput(result);
//     }

//     break;
//   case "hexadecimalEncodedStringToBase64EncodedString":
//     if (checks.hexaEncodedString(input)) {
//       const result = Buffer.from(input, "hex").toString("base64");

//       setOutput(result);
//     }

//     break;
//   case "base64EncodedStringToHexadecimalEncodedString":
//     if (checks.base64EncodedString(input)) {
//       const result = Buffer.from(input, "base64").toString("hex");

//       setOutput(result);
//     }

//     break;

//   default:
//     console.log("Invalid Converting type");
// }

// if (checks.errorMessage !== "") {
//   setOutput(checks.errorMessage);
// }

//setIsResultVisible(true);

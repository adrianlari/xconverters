import { ConversionTypes } from "./conversionTypes";
import * as checks from "./check";
import { Address, Balance } from "@elrondnetwork/erdjs/out";

export const hexToDecimal = (input) => {
  if (checks.hexadecimal(input)) {
    const result = parseInt(input, 16);

    if (checks.decimal(result)) {
      const conversion = {
        type: ConversionTypes.hexaToDecimal,
        input,
        result,
      };

      return conversion;
    }
  }
};

export const decimalToHex = (input) => {
  if (checks.decimal(input)) {
    let result = parseInt(input, 10).toString(16);

    if (result.length % 2 === 1) {
      result = "0" + result;
    }

    if (checks.hexadecimal(result)) {
      const conversion = {
        type: ConversionTypes.decimalToHexa,
        result,
        input,
      };

      return conversion;
    }
  }
};

export const hexToBech32 = (input) => {
  if (checks.hexAddress(input)) {
    let result;
    try {
      result = new Address(input).bech32();
    } catch {}

    if (result) {
      const conversion = {
        type: ConversionTypes.hexToBech32,
        result,
        input,
      };

      return conversion;
    }
  }
};

export const bech32ToHex = (input) => {
  if (checks.bech32Address(input)) {
    let result;
    try {
      result = new Address(input).hex();
    } catch {}

    if (result) {
      const conversion = {
        type: ConversionTypes.bech32ToHex,
        result,
        input,
      };

      return conversion;
    }
  }
};

export const base64ToHex = (input) => {
  if (checks.base64EncodedString(input)) {
    const result = Buffer.from(input, "base64").toString("hex");

    const conversion = {
      type: ConversionTypes.base64ToHexadecimal,
      result,
      input,
    };

    return conversion;
  }
};

export const hexToBase64 = (input) => {
  if (checks.hexaEncodedString(input)) {
    const result = Buffer.from(input, "hex").toString("base64");

    const conversion = {
      type: ConversionTypes.hexadecimalToBase64,
      result,
      input,
    };

    return conversion;
  }
};

export const base64ToString = (input) => {
  if (checks.base64EncodedString(input)) {
    const result = Buffer.from(input, "base64").toString("ascii");

    if (checks.stringValue(result)) {
      const conversion = {
        type: ConversionTypes.base64ToString,
        result,
        input,
      };

      return conversion;
    }
  }
};

export const stringToBase64 = (input) => {
  if (checks.stringValue(input)) {
    const result = Buffer.from(input, "ascii").toString("base64");

    const conversion = {
      type: ConversionTypes.stringToBase64,
      result,
      input,
    };

    return conversion;
  }
};

export const hexToString = (input) => {
  if (checks.hexaEncodedString(input)) {
    const result = Buffer.from(input, "hex").toString("utf8");

    if (checks.stringValue(result)) {
      const conversion = {
        type: ConversionTypes.hexadecimalToString,
        result,
        input,
      };

      return conversion;
    }
  }
};

export const stringToHex = (input) => {
  if (checks.stringValue(input)) {
    const result = Buffer.from(input, "ascii").toString("hex");

    if (checks.hexadecimal(result)) {
      const conversion = {
        type: ConversionTypes.stringToHexadecimal,
        result,
        input,
      };

      return conversion;
    }
  }
};

export const denominatedToAmount = (input) => {
  if (checks.denominatedAmount(input)) {
    const result = Balance.fromString(input).toCurrencyString();

    const conversion = {
      type: ConversionTypes.denominatedToAmount,
      result,
      input,
    };

    return conversion;
  }
};

export const amountToDemoninate = (input) => {
  if (checks.amount(input)) {
    const result = Balance.egld(input).toString();

    const conversion = {
      type: ConversionTypes.amountToDenominated,
      result,
      input,
    };

    return conversion;
  }
};

export const base64ToDecimal = (input) => {
  if (checks.base64Value(input)) {
    const result = Buffer.from(input, "base64").toString("ascii");

    if (checks.decimal(result)) {
      const conversion = {
        type: ConversionTypes.base64ToDecimal,
        result,
        input,
      };

      return conversion;
    }
  }
};

export const decimalToBase64 = (input) => {
  if (checks.decimal(input)) {
    const result = Buffer.from(input, "ascii").toString("base64");

    if (checks.base64Value(result)) {
      const conversion = {
        type: ConversionTypes.decimalToBase64,
        result,
        input,
      };

      return conversion;
    }
  }
};

export const base64ToHexDecimal = (input) => {
  if (checks.base64EncodedString(input)) {
    const result1 = Buffer.from(input, "base64").toString("hex");

    if (checks.hexadecimal(result1)) {
      const result2 = parseInt(result1, 16);

      if (checks.decimal(result2)) {
        const conversion = {
          type: ConversionTypes.base64ToHexDecimal,
          result: result2,
          input,
        };

        return conversion;
      }
    }
  }
};

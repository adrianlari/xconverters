import { ConversionTypes } from './conversionTypes';
import * as checks from './check';
import { Address } from '@elrondnetwork/erdjs/out/address';
import { TokenPayment } from '@elrondnetwork/erdjs/out/tokenPayment';
import { Base64 } from 'js-base64';
import BigNumber from 'bignumber.js';

export const hexToDecimal = (input: string) => {
	if (checks.hexadecimal(input)) {
		const result = BigNumber(input, 16).toString();

		if (checks.decimal(result.toString())) {
			const conversion = {
				type: ConversionTypes.hexaToDecimal,
				input,
				result,
			};

			return conversion;
		}
	}
};

export const decimalToHex = (input: string) => {
	if (checks.decimal(input)) {
		let result = BigNumber(input).toString(16);

		if (result.length % 2 === 1) {
			result = '0' + result;
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

export const hexToBech32 = (input: string) => {
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

export const bech32ToHex = (input: string) => {
	if (checks.bech32Address(input)) {
		let result;
		try {
			result = new Address(input as string).hex();
		} catch (err) {
			console.log(err);
		}

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

export const base64ToHex = (input: string) => {
	if (!checks.base64EncodedString(input)) return;

	const decConversion = decimalToHex(Base64.fromBase64(input));
	if (!decConversion) return;

	const result = decConversion.result;

	const conversion = {
		type: ConversionTypes.base64ToHexadecimal,
		result,
		input,
	};

	return conversion;
};

export const hexToBase64 = (input: string) => {
	if (checks.hexaEncodedString(input)) {
		const decConversion = hexToDecimal(input);
		if (!decConversion) return;

		const result = Base64.toBase64(decConversion.result.toString());

		const conversion = {
			type: ConversionTypes.hexadecimalToBase64,
			result,
			input,
		};

		return conversion;
	}
};

export const base64ToString = (input: string) => {
	if (checks.base64EncodedString(input)) {
		const result = Base64.fromBase64(input);

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

export const stringToBase64 = (input: string) => {
	if (checks.stringValue(input)) {
		const result = Base64.toBase64(input);

		const conversion = {
			type: ConversionTypes.stringToBase64,
			result,
			input,
		};

		return conversion;
	}
};

export const hexToString = (input: string) => {
	if (checks.hexaEncodedString(input)) {
		let result = '';
		for (let i = 0; i < input.length; i += 2) {
			let char = input[i] + '' + input[i + 1];
			let hex = parseInt(char, 16);
			result += String.fromCharCode(hex);
		}

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

export const stringToHex = (input: string) => {
	if (checks.stringValue(input)) {
		let result = '';
		for (let i = 0; i < input.length; i++) {
			let hex = input.charCodeAt(i).toString(16);
			result += hex;
		}

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

export const denominatedToAmount = (input: BigNumber) => {
	if (checks.denominatedAmount(input) && input >= BigNumber(0)) {
		const result = TokenPayment.egldFromBigInteger(input).toPrettyString();

		const conversion = {
			type: ConversionTypes.denominatedToAmount,
			result,
			input,
		};

		return conversion;
	}
};

export const amountToDenominate = (input: BigNumber) => {
	if (checks.amount(input) && input >= BigNumber(0)) {
		const result = TokenPayment.egldFromAmount(input).toPrettyString();
		const conversion = {
			type: ConversionTypes.amountToDenominated,
			result,
			input,
		};

		return conversion;
	}
};

export const base64ToDecimal = (input: string) => {
	if (checks.base64Value(input)) {
		const result = BigNumber(Base64.fromBase64(input)).valueOf();

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

export const decimalToBase64 = (input: string) => {
	if (checks.decimal(input)) {
		const result = Base64.toBase64(input);

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

export const base64ToHexDecimal = (input: string) => {
	if (checks.base64EncodedString(input)) {
		const result1 = Base64.fromBase64(input);

		if (checks.hexadecimal(result1)) {
			const result2 = BigNumber(result1, 16).toNumber().toString();

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

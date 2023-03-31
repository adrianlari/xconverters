import { ConversionTypes } from './types';
import * as checks from './check';
import { Address } from '@elrondnetwork/erdjs/out/address';
import { TokenPayment } from '@elrondnetwork/erdjs/out/tokenPayment';
import { Base64 } from 'js-base64';
import BigNumber from 'bignumber.js';

export const hexToDecimal = (input: string) => {
	if (!checks.hexadecimal(input)) return;

	const result = BigNumber(input, 16).toString(10);

	const conversion = {
		type: ConversionTypes.hexaToDecimal,
		input,
		result,
	};

	return conversion;
};

export const decimalToHex = (input: string) => {
	if (!checks.decimal(input)) return;

	let result = BigNumber(input).toString(16);

	if (!checks.hexadecimal(result)) return;

	const conversion = {
		type: ConversionTypes.decimalToHexa,
		result,
		input,
	};

	return conversion;
};

export const hexToBech32 = (input: string) => {
	if (!checks.hexAddress(input)) return;

	let result = new Address(input).bech32();

	const conversion = {
		type: ConversionTypes.hexToBech32,
		result,
		input,
	};

	return conversion;
};

export const bech32ToHex = (input: string) => {
	if (!checks.bech32Address(input)) return;

	const result = new Address(input as string).hex();

	const conversion = {
		type: ConversionTypes.bech32ToHex,
		result,
		input,
	};

	return conversion;
};

export const base64ToString = (input: string) => {
	if (!checks.base64EncodedString(input)) return;

	const result = Base64.fromBase64(input);

	const conversion = {
		type: ConversionTypes.base64ToString,
		result,
		input,
	};

	return conversion;
};

export const stringToBase64 = (input: string) => {
	const result = Base64.toBase64(input);

	const conversion = {
		type: ConversionTypes.stringToBase64,
		result,
		input,
	};

	return conversion;
};

export const hexToString = (input: string) => {
	if (!checks.hexaEncodedString(input)) return;

	let result = '';
	for (let i = 0; i < input.length; i += 2) {
		let char = input[i] + '' + input[i + 1];
		let hex = parseInt(char, 16);
		result += String.fromCharCode(hex);
	}

	const conversion = {
		type: ConversionTypes.hexadecimalToString,
		result,
		input,
	};

	return conversion;
};

export const stringToHex = (input: string) => {
	let result = '';
	for (let i = 0; i < input.length; i++) {
		let hex = input.charCodeAt(i).toString(16);
		result += hex;
	}

	const conversion = {
		type: ConversionTypes.stringToHexadecimal,
		result,
		input,
	};

	return conversion;
};

export const denominatedToAmount = (input: string) => {
	const inputBigNumber = BigNumber(input);

	if (!inputBigNumber || inputBigNumber < BigNumber(0) || (!inputBigNumber.s && !inputBigNumber.e && !inputBigNumber.c)) return;

	let result;
	try {
		result = TokenPayment.egldFromBigInteger(inputBigNumber).toPrettyString();
	} catch {
		return;
	}

	const conversion = {
		type: ConversionTypes.denominatedToAmount,
		result,
		input,
	};

	return conversion;
};

export const amountToDenominate = (input: string) => {
	const inputBigNumer = BigNumber(input);

	if (!checks.amount(inputBigNumer) || inputBigNumer < BigNumber(0)) return;

	const result = TokenPayment.egldFromAmount(inputBigNumer).toString();
	const conversion = {
		type: ConversionTypes.amountToDenominated,
		result,
		input,
	};

	return conversion;
};

export const base64ToDecimal = (input: string) => {
	if (!checks.base64Value(input)) return;

	const result = BigNumber(Base64.fromBase64(input)).valueOf();

	if (!checks.decimal(result)) return;

	const conversion = {
		type: ConversionTypes.base64ToDecimal,
		result,
		input,
	};

	return conversion;
};

export const decimalToBase64 = (input: string) => {
	if (!checks.decimal(input)) return;

	const result = Base64.toBase64(input);

	if (checks.base64Value(result)) {
		const conversion = {
			type: ConversionTypes.decimalToBase64,
			result,
			input,
		};

		return conversion;
	}
};

export const base64ToHexDecimal = (input: string) => {
	if (!checks.base64Value(input)) return;

	const result1 = base64ToHex(input);
	if (!result1) return;

	const resultDec = hexToDecimal(result1.result);
	if (!resultDec) return;

	if (!checks.decimal(resultDec.result)) return;

	const conversion = {
		type: ConversionTypes.base64ToHexDecimal,
		result: resultDec?.result,
		input,
	};

	return conversion;
};

export const base64ToHex = (input: string) => {
	if (!checks.base64EncodedString(input)) return;

	const hex = Buffer.from(input, 'base64').toString('hex');

	const conversion = {
		type: ConversionTypes.base64ToHexadecimal,
		result: hex,
		input,
	};

	return conversion;
};

export const hexToBase64 = (input: string) => {
	if (!checks.hexaEncodedString(input)) return;

	const result = Buffer.from(input, 'hex').toString('base64');

	const conversion = {
		type: ConversionTypes.hexadecimalToBase64,
		result,
		input,
	};

	return conversion;
};

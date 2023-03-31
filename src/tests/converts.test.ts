import BigNumber from 'bignumber.js';
import { test, expect } from 'vitest';
import { ConversionTypes } from '../types';
import { converters } from '../tryConverts';

test('hex to decimal', () => {
	expect(converters.hexToDecimal('10')).toStrictEqual({
		type: ConversionTypes.hexaToDecimal,
		input: '10',
		result: '16',
	});
	expect(converters.hexToDecimal('-10')).toBe(undefined);
	expect(converters.hexToDecimal('0x10')).toBe(undefined);
	expect(converters.hexToDecimal('1y')).toBe(undefined);
	expect(converters.hexToDecimal('123abc')).toStrictEqual({
		input: '123abc',
		result: '1194684',
		type: 3,
	});
	expect(converters.hexToDecimal('1f')).toStrictEqual({
		type: ConversionTypes.hexaToDecimal,
		input: '1f',
		result: '31',
	});
});

test('decimal to hex', () => {
	expect(converters.decimalToHex('16')).toStrictEqual({
		type: ConversionTypes.decimalToHexa,
		result: '10',
		input: '16',
	});
	expect(converters.decimalToHex('-10')).toBe(undefined);
	expect(converters.decimalToHex('0x10')).toStrictEqual({
		type: ConversionTypes.decimalToHexa,
		result: '10',
		input: '0x10',
	});
	expect(converters.decimalToHex('1y')).toBe(undefined);
	expect(converters.decimalToHex('123abc')).toBe(undefined);
	expect(converters.decimalToHex('31')).toStrictEqual({
		type: ConversionTypes.decimalToHexa,
		result: '1f',
		input: '31',
	});
});

test('hex to bech32', () => {
	expect(converters.hexToBech32('000000000000000000010000000000000000000000000000000000000001ffff')).toStrictEqual({
		type: ConversionTypes.hexToBech32,
		result: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllst77y4l',
		input: '000000000000000000010000000000000000000000000000000000000001ffff',
	});
	expect(converters.hexToBech32('0000000000000000000000000000000000000000000000000000001ffff')).toBe(undefined);
});

test('bech32 to hex', () => {
	expect(converters.bech32ToHex('erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllst77y4l')).toStrictEqual({
		type: ConversionTypes.bech32ToHex,
		result: '000000000000000000010000000000000000000000000000000000000001ffff',
		input: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllst77y4l',
	});

	expect(converters.bech32ToHex('erqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllst77y4l')).toBe(undefined);
});

test('base64 to string', () => {
	expect(converters.base64ToString('bGVyeQ==')).toStrictEqual({
		type: ConversionTypes.base64ToString,
		result: 'lery',
		input: 'bGVyeQ==',
	});
	expect(converters.base64ToString('VyeQ==')).toBe(undefined);
});

test('string to base64', () => {
	expect(converters.stringToBase64('lery')).toStrictEqual({
		type: ConversionTypes.stringToBase64,
		result: 'bGVyeQ==',
		input: 'lery',
	});
	expect(converters.stringToBase64('multiversx')).toStrictEqual({
		type: ConversionTypes.stringToBase64,
		result: 'bXVsdGl2ZXJzeA==',
		input: 'multiversx',
	});
	expect(converters.stringToBase64('MULTIVERSX')).toStrictEqual({
		type: ConversionTypes.stringToBase64,
		result: 'TVVMVElWRVJTWA==',
		input: 'MULTIVERSX',
	});
});

test('hexstring to string', () => {
	expect(converters.hexToString('6C657279')).toStrictEqual({
		type: ConversionTypes.hexadecimalToString,
		result: 'lery',
		input: '6C657279',
	});

	expect(converters.hexToString('6f6b')).toStrictEqual({
		type: ConversionTypes.hexadecimalToString,
		result: 'ok',
		input: '6f6b',
	});

	expect(converters.hexToString('leroy')).toBe(undefined);
});

test('string to hex', () => {
	expect(converters.stringToHex('lery')).toStrictEqual({
		type: ConversionTypes.stringToHexadecimal,
		result: '6c657279',
		input: 'lery',
	});

	expect(converters.stringToHex('ok')).toStrictEqual({
		type: ConversionTypes.stringToHexadecimal,
		result: '6f6b',
		input: 'ok',
	});

	expect(converters.stringToHex('--test')).toStrictEqual({
		type: ConversionTypes.stringToHexadecimal,
		result: '2d2d74657374',
		input: '--test',
	});
});

test('denominated to amount', () => {
	expect(converters.denominatedToAmount('test')).toBe(undefined);
	expect(converters.denominatedToAmount('1000000000000000000')).toStrictEqual({
		type: ConversionTypes.denominatedToAmount,
		result: '1.000000000000000000 EGLD',
		input: '1000000000000000000',
	});
	expect(converters.denominatedToAmount('123456789123456789')).toStrictEqual({
		type: ConversionTypes.denominatedToAmount,
		result: '0.123456789123456789 EGLD',
		input: '123456789123456789',
	});
	expect(converters.denominatedToAmount('1000000000123123123')).toStrictEqual({
		type: ConversionTypes.denominatedToAmount,
		result: '1.000000000123123123 EGLD',
		input: '1000000000123123123',
	});
});

test('amount to denominated', () => {
	expect(converters.amountToDenominate('1')).toStrictEqual({
		type: ConversionTypes.amountToDenominated,
		result: '1000000000000000000',
		input: '1',
	});
	expect(converters.amountToDenominate('0.123456789123456789')).toStrictEqual({
		type: ConversionTypes.amountToDenominated,
		result: '123456789123456789',
		input: '0.123456789123456789',
	});
	expect(converters.amountToDenominate('1.000000000123123123')).toStrictEqual({
		type: ConversionTypes.amountToDenominated,
		result: '1000000000123123123',
		input: '1.000000000123123123',
	});
});

test('base64 to decimal', () => {
	expect(converters.base64ToDecimal('bGVyeQ==')).toStrictEqual(undefined);
	expect(converters.base64ToDecimal('VyeQ==')).toBe(undefined);
	expect(converters.base64ToDecimal('MTIzNDU2Nzg5')).toStrictEqual({
		type: ConversionTypes.base64ToDecimal,
		result: '123456789',
		input: 'MTIzNDU2Nzg5',
	});
	expect(converters.base64ToDecimal('MTIz')).toStrictEqual({
		type: ConversionTypes.base64ToDecimal,
		result: '123',
		input: 'MTIz',
	});
});

test('decimal to base64', () => {
	expect(converters.decimalToBase64('123456789')).toStrictEqual({
		type: ConversionTypes.decimalToBase64,
		result: 'MTIzNDU2Nzg5',
		input: '123456789',
	});
	expect(converters.decimalToBase64('123')).toStrictEqual({
		type: ConversionTypes.decimalToBase64,
		result: 'MTIz',
		input: '123',
	});
	expect(converters.decimalToBase64('123abc')).toBe(undefined);
	expect(converters.decimalToBase64('31')).toStrictEqual({
		type: ConversionTypes.decimalToBase64,
		result: 'MzE=',
		input: '31',
	});
});

test('base64 to hex-decimal', () => {
	expect(converters.base64ToHexDecimal('bGVyeQ==')).toStrictEqual({
		type: ConversionTypes.base64ToHexDecimal,
		result: '1818587769',
		input: 'bGVyeQ==',
	});
});

test('base64 to hex', () => {
	expect(converters.base64ToHex('bGVyeQ==')).toStrictEqual({
		type: ConversionTypes.base64ToHexadecimal,
		result: '6c657279',
		input: 'bGVyeQ==',
	});
	expect(converters.base64ToHex('bGyeQ==')).toBe(undefined);
	expect(converters.base64ToHex('TVVMVElWRVJTWA==')).toStrictEqual({
		type: ConversionTypes.base64ToHexadecimal,
		result: '4d554c54495645525358',
		input: 'TVVMVElWRVJTWA==',
	});
});

test('hex to abse64', () => {
	expect(converters.hexToBase64('6c657279')).toStrictEqual({
		type: ConversionTypes.hexadecimalToBase64,
		result: 'bGVyeQ==',
		input: '6c657279',
	});
	expect(converters.hexToBase64('bGyeQ==')).toBe(undefined);
	expect(converters.hexToBase64('4d554c54495645525358')).toStrictEqual({
		type: ConversionTypes.hexadecimalToBase64,
		result: 'TVVMVElWRVJTWA==',
		input: '4d554c54495645525358',
	});
});

import { test, expect } from 'vitest';
import * as checks from '../check';

test('hex address is 64 chars', () => {
	expect(checks.hexAddressLength).toEqual(64);
});

test('bech32 address is 62 chars', () => {
	expect(checks.bech32AddressLength).toEqual(62);
});

test('hex address validates correctly', () => {
	expect(checks.hexAddress('0x')).toBe(false);
	expect(checks.hexAddress('10')).toBe(false);
	expect(checks.hexAddress('-10')).toBe(false);
	expect(checks.hexAddress('1')).toBe(false);
	expect(checks.hexAddress('1f')).toBe(false);
	expect(checks.hexAddress('0x10')).toBe(false);
	expect(checks.hexAddress('1y')).toBe(false);
	expect(checks.hexAddress('123abc')).toBe(false);
	expect(checks.hexAddress('ebe701fdad4004884629b2a3f259c42949314d52dab1c01d77f12a8c52fc701d')).toBe(true);
});

test('bech32 address validates correctly', () => {
	expect(checks.bech32Address('erd1')).toBe(false);
	expect(checks.bech32Address('erd1a0nsrlddgqzgs33fk23lykwy99ynzn2jm2cuq8th7y4gc5huwqwsgd6tmr')).toBe(true);
	expect(checks.bech32Address('erd1a0nsrlddgqzgs33fk23lykwy99ynz2jm2cuq8th7y4gc5huwqwsgd6tmr')).toBe(false);
	expect(checks.bech32Address('erd2a0nsrlddgqzgs33fk23lykwy99ynzn2jm2cuq8th7y4gc5huwqwsgd6tmr')).toBe(false);
});

test('hexadecimal validates correctly', () => {
	expect(checks.hexadecimal('0x')).toBe(false);
	expect(checks.hexadecimal('10')).toBe(true);
	expect(checks.hexadecimal('-10')).toBe(false);
	expect(checks.hexadecimal('1')).toBe(true);
	expect(checks.hexadecimal('1f')).toBe(true);
});

test('decimal validates correctly', () => {
	expect(checks.decimal('0x')).toBe(false);
	expect(checks.decimal('11231231230')).toBe(true);
	expect(checks.decimal('12312313211231231230.2123123123')).toBe(true);
	expect(checks.decimal('-12312313211231231230.2123123123')).toBe(true);
	expect(checks.decimal('--12312313211231231230.2123123123')).toBe(false);
	expect(checks.decimal('10')).toBe(true);
	expect(checks.decimal('-10')).toBe(true);
	expect(checks.decimal('1')).toBe(true);
	expect(checks.decimal('1f')).toBe(false);
});

test('base64 validates correctly', () => {
	expect(checks.base64EncodedString('0x')).toBe(false);
	expect(checks.base64EncodedString('10')).toBe(false);
	expect(checks.base64EncodedString('-10')).toBe(false);
	expect(checks.base64EncodedString('1')).toBe(false);
	expect(checks.base64EncodedString('1f==')).toBe(true);
	expect(checks.base64EncodedString('YWRyaWFu')).toBe(true);
	expect(checks.base64EncodedString('aGVsbG8gd29ybGQ=')).toBe(true);

	expect(checks.base64Value('0x')).toBe(false);
	expect(checks.base64Value('10')).toBe(false);
	expect(checks.base64Value('-10')).toBe(false);
	expect(checks.base64Value('1')).toBe(false);
	expect(checks.base64Value('1f==')).toBe(true);
	expect(checks.base64Value('YWRyaWFu')).toBe(true);
	expect(checks.base64Value('aGVsbG8gd29ybGQ=')).toBe(true);
});

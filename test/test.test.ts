import {describe, expect, test} from "@jest/globals";
import {calcHistoricalPrice, formatAndRoundNumber} from "../libs/helpers";

describe('calc historical price', () => {
    test('historical price with zero percentChange', () => {
        const curPrice = 100;
        const percentChange = 0;
        const expectedHistoricalPrice = 100; // 100 / (1 + 0/100) = 100
        const result = calcHistoricalPrice(curPrice, percentChange);
        expect(result).toBe(expectedHistoricalPrice);
    });

    test('historical price with positive percentChange', () => {
        const curPrice = 100;
        const percentChange = 25;
        const expectedHistoricalPrice = 80; // 100 / (1 + 25/100) = 80
        const result = calcHistoricalPrice(curPrice, percentChange);
        expect(result).toBe(expectedHistoricalPrice);
    });

    test('historical price with large positive percentChange', () => {
        const curPrice = 100;
        const percentChange = 50;
        const expectedHistoricalPrice = 66.66666666666667; // 100 / (1 + 50/100) = 66.66...
        const result = calcHistoricalPrice(curPrice, percentChange);
        expect(result).toBe(expectedHistoricalPrice);
    });

    test('historical price with negative percentChange', () => {
        const curPrice = 100;
        const percentChange = -10;
        const expectedHistoricalPrice = 111.11111111111111; // 100 / (1 - 10/100) = 111.11...
        const result = calcHistoricalPrice(curPrice, percentChange);
        expect(result).toBe(expectedHistoricalPrice);
    });

    test('historical price with large negative percentChange', () => {
        const curPrice = 100;
        const percentChange = -50;
        const expectedHistoricalPrice = 200; // 100 / (1 - 50/100) = 200
        const result = calcHistoricalPrice(curPrice, percentChange);
        expect(result).toBe(expectedHistoricalPrice);
    });
})


describe('format/round number', () => {
    test('zero', () => {
        const result = formatAndRoundNumber(0);
        expect(result).toBe('0');
    });

    test('small positive number', () => {
        const result = formatAndRoundNumber(123.45);
        expect(result).toBe('123.45');
    });

    test('small negative number', () => {
        const result = formatAndRoundNumber(-123.45);
        expect(result).toBe('-123.45');
    });

    test('number with trillion postfix', () => {
        const result = formatAndRoundNumber(1.234e12);
        expect(result).toBe('1.23T');
    });

    test('number with billion postfix', () => {
        const result = formatAndRoundNumber(1.234e9);
        expect(result).toBe('1.23B');
    });

    test('number with million postfix', () => {
        const result = formatAndRoundNumber(1.234e6);
        expect(result).toBe('1.23M');
    });

    test('number with decimal separator and zeros', () => {
        const result = formatAndRoundNumber(123.01);
        expect(result).toBe('123.01');
    });

    test('very small positive number', () => {
        const result = formatAndRoundNumber(0.00000000123);
        expect(result).toBe('0,00...012');
    });

    test('small negative number', () => {
        const result = formatAndRoundNumber(-0.00000000123);
        expect(result).toBe('-0,00...012');
    });
})

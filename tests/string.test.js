import {expect, test} from "vitest";
import {string} from "../src/index.js";

test('Test guard string must return function', () => {
    expect(typeof string() === "function").toBe(true)
})

test('Test guard string true for string "123"', () => {
    const guard = string();
    expect(guard("123")).toBe("123")
})

test('Test guard string for number 123 return error obj', () => {
    const guard = string();
    expect( guard(123).message ).toBe("123 must be a string")
})

test('Test guard string for undefined return error obj', () => {
    const guard = string();
    expect( guard(undefined).message ).toBe("undefined must be a string")
})

test('Test guard string for null return error obj', () => {
    const guard = string();
    expect( guard(null).message ).toBe("null must be a string")
})


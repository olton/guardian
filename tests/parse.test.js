import {expect, test} from "vitest";
import {parse, string} from "../src/index.js";

test('Test parse throw error if schema not defined', () => {
    const schema = string()
    expect(() => parse(null, "123")).toThrowError(/Schema object required for parse data/)
})

test('Test parse throw error if schema not defined', () => {
    const schema = string()
    expect(() => parse(undefined, "123")).toThrowError(/Schema object required for parse data/)
})

test('Test parse throw error if schema and number 123', () => {
    const schema = string()
    expect(() => parse(schema, 123)).toThrowError(/123 must be a string/)
})

test('Test parse return "123"', () => {
    const schema = string()
    expect(parse(schema, "123")).toBe("123")
})



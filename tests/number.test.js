import test from "node:test"
import assert from "node:assert"
import {bigint, integer, number, parse, safeInteger, safeParse, string} from "../dist/guardian.esm.js";

test('Bigint', () => {
    const schema = bigint()
    assert.deepStrictEqual(parse(schema, 9007199254740991n), 9007199254740991n)
})

test('Integer', () => {
    const schema = integer()
    assert.deepStrictEqual(parse(schema, 123), 123)
})

test('SafeInteger', () => {
    const schema = safeInteger()
    assert.deepStrictEqual(parse(schema, Number.MAX_SAFE_INTEGER), Number.MAX_SAFE_INTEGER)
})

test('Number', () => {
    const val1 = "123"
    const val2 = "aasd"
    const schema = number()
    assert.deepStrictEqual(parse(schema, 123), 123)
    assert.deepStrictEqual(safeParse(schema, 123).ok, true)
    assert.deepStrictEqual(safeParse(schema, "123").ok, false)
    assert.deepStrictEqual(safeParse(schema, +val2).ok, false)
})


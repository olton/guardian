import test from "node:test"
import assert from "node:assert"
import {parse, string} from "../dist/guardian.esm.js"

test('Test parse throw error if schema not defined', () => {
    assert.throws(()=>{
        parse(null, "123")
    }, /Schema object required for parse data/,);
})

test('Test parse throw error if schema not defined', () => {
    assert.throws(()=>{
        parse(undefined, "123")
    }, /Schema object required for parse data/,);
})

test('Test parse throw error if schema and number 123', () => {
    const schema = string()
    assert.throws(()=>{
        parse(schema, 123)
    }, /123 must be a string/,);
})

test('Test parse return "123"', () => {
    const schema = string()
    assert.deepStrictEqual(parse(schema, "123"), "123")
})



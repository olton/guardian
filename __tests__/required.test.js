import {describe, it, expect} from "@olton/easytest";
import {required, safeParse} from "../src/index.js";

describe('Test required()', () => {
    it('str is undefined, return ok = false', () => {
        const str = undefined
        const schema = required() 
        expect(safeParse(schema, str).ok).toBe(false)
    })
    it('str is null, return ok = false', () => {
        const str = null
        const schema = required() 
        expect(safeParse(schema, str).ok).toBe(false)
    })
    it('str is empty, return ok = false', () => {
        const str = ""
        const schema = required() 
        expect(safeParse(schema, str).ok).toBe(false)
    })
    it(`str isn't empty, return ok = true`, () => {
        const str = "123"
        const schema = required() 
        expect(safeParse(schema, str).ok).toBe(true)
    })
    it(`str is 0, return ok = true`, () => {
        const str = 0
        const schema = required() 
        expect(safeParse(schema, str).ok).toBe(true)
    })
})
import {describe, it, expect} from "@olton/easytest";
import {length, safeParse} from "../src/index.js";

describe('Test length()', () => {
    it('length(4) for 1234 has length 4, return ok = true', () => {
        const str = '1234'
        const schema = length(4) 
        expect(safeParse(schema, str).ok).toBe(true)
    })
    it('length(4) for 123 has length 3, return ok = false', () => {
        const str = '123'
        const schema = length(4) 
        expect(safeParse(schema, str).ok).toBe(false)
    })
})
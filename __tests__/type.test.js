import {describe, it, expect} from "@olton/easytest";
import {type, safeParse} from "../src/index.js";

describe('Test type()', () => {
    it('Number type, result true', () => {
        const schema = type("number")
        expect(safeParse(schema, 1).ok).toBe(true)
        expect(safeParse(schema, "1").ok).toBe(false)
    })
    it('Array type, result true', () => {
        const schema = type("array")
        expect(safeParse(schema, []).ok).toBe(true)
        expect(safeParse(schema, "1").ok).toBe(false)
    })
})
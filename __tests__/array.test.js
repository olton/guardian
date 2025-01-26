import {describe, it, expect} from "@olton/easytest";
import {array, number, date, safeParse} from "../src/index.js";

describe('Test array()', () => {
    it('Numbers array, result true', () => {
        const schema = array(number())
        expect(safeParse(schema, [1, 2, 3]).ok).toBe(true)
    })
    it('Numbers array, result false', () => {
        const schema = array(number())
        expect(safeParse(schema, ["1", "2", "3"]).ok).toBe(false)
    })
    it('Dates array, result true', () => {
        const schema = array(date())
        expect(safeParse(schema, ["04 Dec 1995", new Date()]).ok).toBe(true)
    })
})
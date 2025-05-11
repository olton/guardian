import { describe, it, expect } from "@olton/latte";
import { number, safeParse } from "../src/index.js";

describe('Number Guardian Tests', () => {
    it('should return true for valid number input (integer)', () => {
        const schema = number();
        expect(safeParse(schema, 123).ok).toBe(true);
    });

    it('should return true for valid number input (float)', () => {
        const schema = number();
        expect(safeParse(schema, 123.45).ok).toBe(true);
    });

    it('should return true for valid number input (zero)', () => {
        const schema = number();
        expect(safeParse(schema, 0).ok).toBe(true);
    });

    it('should return true for valid number input (negative)', () => {
        const schema = number();
        expect(safeParse(schema, -123).ok).toBe(true);
    });

    it('should return false for NaN input', () => {
        const schema = number();
        expect(safeParse(schema, NaN).ok).toBe(false);
    });

    it('should return false for non-number input (string)', () => {
        const schema = number();
        expect(safeParse(schema, "123").ok).toBe(false);
    });

    it('should return false for non-number input (object)', () => {
        const schema = number();
        expect(safeParse(schema, {}).ok).toBe(false);
    });

    it('should return false for non-number input (array)', () => {
        const schema = number();
        expect(safeParse(schema, []).ok).toBe(false);
    });

    it('should return false for non-number input (null)', () => {
        const schema = number();
        expect(safeParse(schema, null).ok).toBe(false);
    });

    it('should return false for non-number input (undefined)', () => {
        const schema = number();
        expect(safeParse(schema, undefined).ok).toBe(false);
    });

    it('should use custom error message when provided', () => {
        const customMsg = 'VAL is not a number!';
        const schema = number(customMsg);
        const result = safeParse(schema, "not a number");
        expect(result.ok).toBe(false);
        expect(result.error.message).toBe('not a number is not a number!');
    });
});
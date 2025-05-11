import { describe, it, expect } from "@olton/latte";
import { string, safeParse } from "../src/index.js";

describe('String Guardian Tests', () => {
    it('should return true for valid string input', () => {
        const schema = string();
        expect(safeParse(schema, "test string").ok).toBe(true);
    });

    it('should return false for non-string input (number)', () => {
        const schema = string();
        expect(safeParse(schema, 123).ok).toBe(false);
    });

    it('should return false for non-string input (object)', () => {
        const schema = string();
        expect(safeParse(schema, {}).ok).toBe(false);
    });

    it('should return false for non-string input (array)', () => {
        const schema = string();
        expect(safeParse(schema, []).ok).toBe(false);
    });

    it('should return false for non-string input (null)', () => {
        const schema = string();
        expect(safeParse(schema, null).ok).toBe(false);
    });

    it('should return false for non-string input (undefined)', () => {
        const schema = string();
        expect(safeParse(schema, undefined).ok).toBe(false);
    });

    it('should use custom error message when provided', () => {
        const customMsg = 'VAL is not a string!';
        const schema = string(customMsg);
        const result = safeParse(schema, 123);
        expect(result.ok).toBe(false);
        expect(result.error.message).toBe('123 is not a string!');
    });
});
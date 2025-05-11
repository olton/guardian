import { describe, it, expect } from "@olton/latte";
import { array, string, number, boolean, safeParse } from "../src/index.js";

// Create a named function to use as a guard
function stringGuard(input) {
    return typeof input === "string" ? input : new Error("Not a string");
}

describe('Array Guardian Tests', () => {
    // Tests that don't rely on the guard's name property
    it('should return true for array of strings with string guard', () => {
        const schema = array(string());
        expect(safeParse(schema, ["test", "another"]).ok).toBe(true);
    });

    it('should return true for array of numbers with number guard', () => {
        const schema = array(number());
        expect(safeParse(schema, [1, 2, 3, 4.5]).ok).toBe(true);
    });

    it('should return true for array of booleans with boolean guard', () => {
        const schema = array(boolean());
        expect(safeParse(schema, [true, false, true]).ok).toBe(true);
    });

    it('should return false for array with mixed types when specific guard is required', () => {
        const schema = array(number());
        expect(safeParse(schema, [1, "string", 3]).ok).toBe(false);
    });

    it('should use custom error message when provided', () => {
        const customMsg = 'This is not an array of numbers!';
        const schema = array(number(), customMsg);
        const result = safeParse(schema, "not an array");
        expect(result.ok).toBe(false);
        expect(result.error.message).toBe(customMsg);
    });

    it('should handle custom error message as first parameter', () => {
        const customMsg = 'Custom error message';
        const schema = array(customMsg);
        const result = safeParse(schema, 123);
        expect(result.ok).toBe(false);
        expect(result.error.message).toBe('Custom error message');
    });

    // Test for empty arrays
    it('should validate empty arrays', () => {
        const schema = array(string());
        expect(safeParse(schema, []).ok).toBe(true);
    });

    // Test for non-array inputs
    it('should reject non-array inputs', () => {
        const schema = array(string());
        expect(safeParse(schema, "not an array").ok).toBe(false);
        expect(safeParse(schema, 123).ok).toBe(false);
        expect(safeParse(schema, {}).ok).toBe(false);
        expect(safeParse(schema, null).ok).toBe(false);
        expect(safeParse(schema, undefined).ok).toBe(false);
    });
});

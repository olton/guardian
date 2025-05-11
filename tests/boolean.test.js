import { describe, it, expect } from "@olton/latte";
import { boolean, safeParse } from "../src/index.js";

describe('Boolean Guardian Tests', () => {
    it('should return true for valid boolean input (true)', () => {
        const schema = boolean();
        expect(safeParse(schema, true).ok).toBe(true);
    });

    it('should return true for valid boolean input (false)', () => {
        const schema = boolean();
        expect(safeParse(schema, false).ok).toBe(true);
    });

    it('should return false for non-boolean input (string "true")', () => {
        const schema = boolean();
        expect(safeParse(schema, "true").ok).toBe(false);
    });

    it('should return false for non-boolean input (string "false")', () => {
        const schema = boolean();
        expect(safeParse(schema, "false").ok).toBe(false);
    });

    it('should return false for non-boolean input (number 1)', () => {
        const schema = boolean();
        expect(safeParse(schema, 1).ok).toBe(false);
    });

    it('should return false for non-boolean input (number 0)', () => {
        const schema = boolean();
        expect(safeParse(schema, 0).ok).toBe(false);
    });

    it('should return false for non-boolean input (object)', () => {
        const schema = boolean();
        expect(safeParse(schema, {}).ok).toBe(false);
    });

    it('should return false for non-boolean input (array)', () => {
        const schema = boolean();
        expect(safeParse(schema, []).ok).toBe(false);
    });

    it('should return false for non-boolean input (null)', () => {
        const schema = boolean();
        expect(safeParse(schema, null).ok).toBe(false);
    });

    it('should return false for non-boolean input (undefined)', () => {
        const schema = boolean();
        expect(safeParse(schema, undefined).ok).toBe(false);
    });

    it('should use custom error message when provided', () => {
        const customMsg = 'VAL is not a boolean!';
        const schema = boolean(customMsg);
        const result = safeParse(schema, "not a boolean");
        expect(result.ok).toBe(false);
        expect(result.error.message).toBe('not a boolean is not a boolean!');
    });
});
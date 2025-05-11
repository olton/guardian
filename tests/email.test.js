import { describe, it, expect } from "@olton/latte";
import { email, safeParse } from "../src/index.js";

describe('Email Guardian Tests', () => {
    it('should return true for valid email address', () => {
        const schema = email();
        expect(safeParse(schema, "test@example.com").ok).toBe(true);
    });

    it('should return true for valid email with subdomain', () => {
        const schema = email();
        expect(safeParse(schema, "test@sub.example.com").ok).toBe(true);
    });

    it('should return true for valid email with numbers', () => {
        const schema = email();
        expect(safeParse(schema, "test123@example.com").ok).toBe(true);
    });

    it('should return true for valid email with special characters', () => {
        const schema = email();
        expect(safeParse(schema, "test.name+tag@example.com").ok).toBe(true);
    });

    it('should return false for email without @ symbol', () => {
        const schema = email();
        expect(safeParse(schema, "testexample.com").ok).toBe(false);
    });

    it('should return false for email without domain', () => {
        const schema = email();
        expect(safeParse(schema, "test@").ok).toBe(false);
    });

    it('should return false for email without username', () => {
        const schema = email();
        expect(safeParse(schema, "@example.com").ok).toBe(false);
    });

    it('should return false for email with spaces', () => {
        const schema = email();
        expect(safeParse(schema, "test @example.com").ok).toBe(false);
    });

    it('should return false for non-string input (number)', () => {
        const schema = email();
        expect(safeParse(schema, 123).ok).toBe(false);
    });

    it('should return false for non-string input (object)', () => {
        const schema = email();
        expect(safeParse(schema, {}).ok).toBe(false);
    });

    it('should return false for non-string input (array)', () => {
        const schema = email();
        expect(safeParse(schema, []).ok).toBe(false);
    });

    it('should return false for non-string input (null)', () => {
        const schema = email();
        expect(safeParse(schema, null).ok).toBe(false);
    });

    it('should return false for non-string input (undefined)', () => {
        const schema = email();
        expect(safeParse(schema, undefined).ok).toBe(false);
    });

    it('should use custom error message when provided', () => {
        const customMsg = 'VAL is not a valid email address!';
        const schema = email(customMsg);
        const result = safeParse(schema, "not-an-email");
        expect(result.ok).toBe(false);
        expect(result.error.message).toBe('not-an-email is not a valid email address!');
    });
});
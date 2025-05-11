import { describe, it, expect } from "@olton/latte";
import { pipe, string, number, min, max, email, pattern, safeParse } from "../src/index.js";
import { GuardianError } from "../src/error/index.js";

describe('Pipe Functionality Tests', () => {
    it('should validate string with minLength and maxLength', () => {
        // Create a pipe that validates a string with minimum length 3 and maximum length 10
        const schema = pipe(
            string(),
            (input) => input.length >= 3 ? input : new GuardianError("String too short", "minLength", input),
            (input) => input.length <= 10 ? input : new GuardianError("String too long", "maxLength", input)
        );

        expect(safeParse(schema, "test").ok).toBe(true);
        expect(safeParse(schema, "te").ok).toBe(false);
        expect(safeParse(schema, "this is too long").ok).toBe(false);
    });

    it('should validate number within range', () => {
        // Create a pipe that validates a number between 1 and 100
        const schema = pipe(
            number(),
            min(1),
            max(100)
        );

        expect(safeParse(schema, 50).ok).toBe(true);
        expect(safeParse(schema, 0).ok).toBe(false);
        expect(safeParse(schema, 101).ok).toBe(false);
        expect(safeParse(schema, "50").ok).toBe(false); // Not a number
    });

    it('should validate email with specific domain using pattern', () => {
        // Create a pipe that validates an email from a specific domain using pattern
        const schema = pipe(
            string(),
            pattern(/^[^\s@]+@example\.com$/, "Must be a valid email from example.com domain")
        );

        expect(safeParse(schema, "test@example.com").ok).toBe(true);
        expect(safeParse(schema, "test@otherdomain.com").ok).toBe(false);
        expect(safeParse(schema, "not-an-email").ok).toBe(false);
    });

    it('should validate email with specific format', () => {
        // Create a pipe that validates an email format using pattern
        const schema = pipe(
            string(),
            pattern(/^[^\s@]+@example\.com$/, "Must be a valid email from example.com domain")
        );

        expect(safeParse(schema, "test@example.com").ok).toBe(true);
        expect(safeParse(schema, "other@example.com").ok).toBe(true);
        expect(safeParse(schema, "test@otherdomain.com").ok).toBe(false);
        expect(safeParse(schema, "not-an-email").ok).toBe(false);
        expect(safeParse(schema, 123).ok).toBe(false);
    });
});

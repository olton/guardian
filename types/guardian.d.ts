/**
 * Guardian - A data validation library for JavaScript
 */

/**
 * Error class for Guardian validation failures
 */
export class GuardianError extends Error {
  /**
   * Creates a new GuardianError
   * @param message - Error message
   * @param guard - Name of the guard that failed
   * @param value - The value that failed validation
   */
  constructor(message?: string, guard?: string | null, value?: any);
  
  /**
   * The error message
   */
  message: string;
  
  /**
   * The name of the guard that failed
   */
  name: string;
  
  /**
   * The value that failed validation
   */
  value: any;
}

/**
 * Type definition for a Guardian validator function
 */
export type Guardian<T = any> = (input: any) => T | GuardianError;

/**
 * Type definition for a Guardian factory function
 */
export type GuardianFactory<T = any> = (...args: any[]) => Guardian<T>;

/**
 * Parses data according to a schema and throws an error if validation fails
 * @param schema - Validation schema (a guardian function or object with guardian functions)
 * @param data - Data to validate
 * @returns The validated data
 * @throws {GuardianError} If validation fails
 */
export function parse<T>(schema: Guardian<T> | Record<string, Guardian>, data: any): T;

/**
 * Parses data according to a schema and returns a result object instead of throwing
 * @param schema - Validation schema (a guardian function or object with guardian functions)
 * @param data - Data to validate
 * @returns An object with validation result
 */
export function safeParse<T>(schema: Guardian<T> | Record<string, Guardian>, data: any): 
  | { ok: true; output: T }
  | { ok: false; error: GuardianError };

/**
 * Combines multiple guardian functions into a single function that applies them in sequence
 * @param functions - Guardian functions to combine
 * @returns A new guardian function
 */
export function pipe<T>(...functions: Guardian[]): Guardian<T>;

/**
 * Combines multiple guardian functions into a single function that applies them in reverse sequence
 * @param functions - Guardian functions to combine
 * @returns A new guardian function
 */
export function compose<T>(...functions: Guardian[]): Guardian<T>;

/**
 * Information about the library
 */
export const info: {
  name: string;
  version: string;
};

/**
 * Validates that the input is a string
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function string(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a string that starts with the specified prefix
 * @param prefix - The prefix to check for
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function startsWith(prefix: string, errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a string that ends with the specified suffix
 * @param suffix - The suffix to check for
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function endsWith(suffix: string, errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is of unknown type
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function unknown(errorMessage?: string): Guardian<unknown>;

/**
 * Validates that the input is a symbol
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function symbol(errorMessage?: string): Guardian<symbol>;

/**
 * Validates that the input is a bigint
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function bigint(errorMessage?: string): Guardian<bigint>;

/**
 * Validates that the input is a Date object
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function date(errorMessage?: string): Guardian<Date>;

/**
 * Validates that the input is a function
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function func(errorMessage?: string): Guardian<Function>;

/**
 * Validates that the input is an integer
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function integer(errorMessage?: string): Guardian<number>;

/**
 * Validates that the input is a safe integer
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function safeInteger(errorMessage?: string): Guardian<number>;

/**
 * Validates that the input is greater than or equal to the specified minimum value
 * @param min - The minimum value
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function min(min: number, errorMessage?: string): Guardian<number>;

/**
 * Validates that the input is less than or equal to the specified maximum value
 * @param max - The maximum value
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function max(max: number, errorMessage?: string): Guardian<number>;

/**
 * Validates that the input is a valid email address
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function email(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is not undefined or null
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function required(errorMessage?: string): Guardian<any>;

/**
 * Validates that the input is a number
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function number(errorMessage?: string): Guardian<number>;

/**
 * Validates that the input is an object
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function object(errorMessage?: string): Guardian<object>;

/**
 * Validates that the input is between the specified minimum and maximum values
 * @param min - The minimum value
 * @param max - The maximum value
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function between(min: number, max: number, errorMessage?: string): Guardian<number>;

/**
 * Validates that the input is a finite number
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function finite(errorMessage?: string): Guardian<number>;

/**
 * Validates that the input is a valid base64 string
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function base64(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is not a number
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function notNumber(errorMessage?: string): Guardian<any>;

/**
 * Validates that the input is a boolean
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function boolean(errorMessage?: string): Guardian<boolean>;

/**
 * Validates that the input is an array
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function array(errorMessage?: string): Guardian<any[]>;

/**
 * Validates that the input is a valid IMEI number
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function imei(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input (string or array) has the exact specified length
 * @param length - The required length
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function length(length: number, errorMessage?: string): Guardian<string | any[]>;

/**
 * Validates that the input (string or array) has at least the specified minimum length
 * @param length - The minimum length
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function minLength(length: number, errorMessage?: string): Guardian<string | any[]>;

/**
 * Validates that the input (string or array) has at most the specified maximum length
 * @param length - The maximum length
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function maxLength(length: number, errorMessage?: string): Guardian<string | any[]>;

/**
 * Validates that the input is a valid IP address (v4 or v6)
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function ip(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a valid IPv4 address
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function ipv4(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a valid IPv6 address
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function ipv6(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a valid domain name
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function domain(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a valid URL
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function url(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a valid color (hex, rgb, or hsl)
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function color(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a valid hex color
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function hexColor(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a valid RGB color
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function rgbColor(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a valid HSL color
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function hslColor(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a valid credit card number
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function creditCard(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a valid Visa card number
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function visa(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a valid Discover card number
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function discover(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a valid Mastercard card number
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function mastercard(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a valid American Express card number
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function americanExpress(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a valid JCB card number
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function jcb(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a valid Union Pay card number
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function unionPay(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a valid Diners Club card number
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function diners(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a valid byte size string (e.g., "1KB", "2MB")
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function bytes(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is not null
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function notNull(errorMessage?: string): Guardian<any>;

/**
 * Validates that the input matches the specified pattern
 * @param pattern - Regular expression pattern
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function pattern(pattern: RegExp, errorMessage?: string): Guardian<string>;

/**
 * Validates that the input consists only of digits
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function digits(errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is a floating-point number
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function float(errorMessage?: string): Guardian<number>;

/**
 * Validates that the input contains the specified substring
 * @param substring - The substring to check for
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function contains(substring: string, errorMessage?: string): Guardian<string>;

/**
 * Validates that the input is of the specified type
 * @param type - The expected type
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function type(type: string, errorMessage?: string): Guardian<any>;

/**
 * Validates that the input is equal to the specified value
 * @param value - The value to compare with
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function equal(value: any, errorMessage?: string): Guardian<any>;

/**
 * Validates that the input is similar to the specified value
 * @param value - The value to compare with
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function similar(value: any, errorMessage?: string): Guardian<any>;

/**
 * Validates that the input is greater than the specified value
 * @param value - The value to compare with
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function great(value: number, errorMessage?: string): Guardian<number>;

/**
 * Validates that the input is less than the specified value
 * @param value - The value to compare with
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function less(value: number, errorMessage?: string): Guardian<number>;

/**
 * Validates that the input is greater than or equal to the specified value
 * @param value - The value to compare with
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function greatOrEqual(value: number, errorMessage?: string): Guardian<number>;

/**
 * Validates that the input is less than or equal to the specified value
 * @param value - The value to compare with
 * @param errorMessage - Custom error message (optional)
 * @returns A guardian function
 */
export function lessOrEqual(value: number, errorMessage?: string): Guardian<number>;
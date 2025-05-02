
/*!
 * Guardian v0.7.2
 * Data guard and validation library
 * Copyright 2025 Serhii Pimenov
 * Licensed under MIT
 *
 * Build time: 02.05.2025 18:47:05
 */

var G = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.js
  var index_exports = {};
  __export(index_exports, {
    americanExpress: () => americanExpress,
    array: () => array_default,
    base64: () => base64_default,
    between: () => between_default,
    bigint: () => bigint_default,
    boolean: () => boolean_default,
    bytes: () => bytes_default,
    color: () => color_default,
    compose: () => compose_default,
    contains: () => contains_default,
    creditCard: () => creditCard,
    date: () => date_default,
    digits: () => digits_default,
    diners: () => diners,
    discover: () => discover,
    domain: () => domain_default,
    email: () => email_default,
    endsWith: () => ends_with_default,
    equal: () => equal_default,
    finite: () => finite_default,
    float: () => float_default,
    func: () => function_default,
    great: () => great_default,
    greatOrEqual: () => greatOrEqual_default,
    hexColor: () => hexColor,
    hslColor: () => hslColor,
    imei: () => imei_default,
    info: () => info_default,
    integer: () => integer_default,
    ip: () => ip,
    ipv4: () => ipv4,
    ipv6: () => ipv6,
    jcb: () => jcb,
    length: () => length,
    less: () => less_default,
    lessOrEqual: () => lessOrEqual_default,
    mastercard: () => mastercard,
    max: () => max_value_default,
    maxLength: () => maxLength,
    min: () => min_value_default,
    minLength: () => minLength,
    notNull: () => not_null_default,
    notNumber: () => not_number_default,
    number: () => number_default,
    object: () => object_default,
    parse: () => parse,
    pattern: () => pattern_default,
    pipe: () => pipe_default,
    required: () => required_default,
    rgbColor: () => rgbColor,
    safeInteger: () => safe_integer_default,
    safeParse: () => safeParse,
    similar: () => similar_default,
    startsWith: () => starts_with_default,
    string: () => string_default,
    symbol: () => symbol_default,
    type: () => type_default,
    unionPay: () => unionPay,
    unknown: () => unknown_default,
    url: () => url_default,
    visa: () => visa
  });

  // src/error/index.js
  var GuardianError = class extends Error {
    constructor(message = "", guard = null, value) {
      super(message);
      this.message = message;
      this.name = guard;
      this.value = value;
    }
  };

  // src/parser/index.js
  var parse = (schema, data) => {
    let result;
    if (!schema) {
      throw new Error(`Schema object required for parse data!`);
    }
    if (typeof schema === "function") {
      result = schema.apply(null, [data]);
      if (result instanceof GuardianError) {
        throw result;
      }
    } else {
      for (let key in schema) {
        const value = data[key];
        const guard = schema[key];
        if (!guard) throw new GuardianError(`Guard not defined for field ${key} in input data!`, "general", data);
        if (!data.hasOwnProperty(key)) throw new GuardianError(`Field ${key} doesn't exists in input data!`, "general", data);
        if (typeof guard === "function") {
          console.log(guard.name);
          result = guard.apply(null, [value]);
          if (result instanceof GuardianError) {
            throw result;
          }
        } else {
          parse(guard, value);
        }
      }
    }
    return data;
  };
  var safeParse = (schema, data) => {
    let result;
    if (!schema) {
      throw new Error(`Schema object required for parse data!`);
    }
    if (typeof schema === "function") {
      result = schema.apply(null, [data]);
      if (result instanceof GuardianError) {
        return {
          ok: false,
          error: result
        };
      }
    } else {
      for (let key in schema) {
        const value = data[key];
        const guard = schema[key];
        if (!guard) {
          continue;
        }
        if (typeof guard === "function") {
          result = guard.apply(null, [data]);
          if (result instanceof GuardianError) {
            return {
              ok: false,
              error: result
            };
          }
        } else {
          parse(guard, value);
        }
      }
    }
    return {
      ok: true,
      output: data
    };
  };

  // src/pipe/index.js
  var pipe = (...functions) => {
    return (first) => functions.reduce((acc, fn) => fn(acc), first);
  };
  var pipe_default = pipe;

  // src/compose/index.js
  var compose = (...functions) => {
    return (first) => functions.reduceRight((acc, fn) => fn(acc), first);
  };
  var compose_default = compose;

  // src/guardians/string.js
  var GUARD_STRING_MESSAGE = "VAL must be a string";
  var string_default = (errorMessage = GUARD_STRING_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input === "string";
      if (!check) {
        return new GuardianError(msg, "string", input);
      }
      return input;
    };
  };

  // src/helpers/is-value.js
  var is_value_default = (val) => typeof val !== "undefined" && val !== null;

  // src/guardians/starts-with.js
  var GUARD_STARTS_WITH_MESSAGE = "VAL must starts with START_VAL";
  var starts_with_default = (startValue, errorMessage = GUARD_STARTS_WITH_MESSAGE) => {
    if (!is_value_default(startValue)) throw new Error(`START_VALUE not defined!`);
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input).replace(/START_VAL/g, startValue);
      const check = typeof input === "string" && input.startsWith(startValue);
      if (!check) {
        return new GuardianError(msg, "startsWith", input);
      }
      return input;
    };
  };

  // src/guardians/ends-with.js
  var GUARD_ENDS_WITH_MESSAGE = "VAL must end with END_VAL";
  var ends_with_default = (endValue, errorMessage = GUARD_ENDS_WITH_MESSAGE) => {
    if (!is_value_default(endValue)) throw new Error(`END_VALUE not defined!`);
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input).replace(/END_VAL/g, endValue);
      const check = typeof input === "string" && input.endsWith(endValue);
      if (!check) {
        return new GuardianError(msg, "endsWith", input);
      }
      return input;
    };
  };

  // src/guardians/unknown.js
  var unknown_default = () => {
    return function(input) {
      return input;
    };
  };

  // src/guardians/symbol.js
  var GUARD_SYMBOL_MESSAGE = "A symbol is required";
  var symbol_default = (msg = GUARD_SYMBOL_MESSAGE) => {
    return function(input) {
      const check = typeof input === "symbol";
      if (!check) {
        return new GuardianError(msg, "symbol", input);
      }
      return input;
    };
  };

  // src/guardians/bigint.js
  var GUARD_BIGINT_MESSAGE = "VAL must be a bigint";
  var bigint_default = (errorMessage = GUARD_BIGINT_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input === "bigint";
      if (!check) {
        return new GuardianError(msg, "bigint", input);
      }
      return input;
    };
  };

  // src/guardians/date.js
  var GUARD_DATE_MESSAGE = "VAL must be valid date object or date string";
  var date_default = (errorMessage = GUARD_DATE_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input === "object" && input.getTime || typeof input === "string" && !isNaN(Date.parse(input));
      if (!check) {
        return new GuardianError(msg, "date", input);
      }
      return input;
    };
  };

  // src/guardians/function.js
  var GUARD_FUNCTION_MESSAGE = "The value must be a function";
  var function_default = (errorMessage = GUARD_FUNCTION_MESSAGE) => {
    return function(input) {
      const check = typeof input === "function";
      if (!check) {
        return new GuardianError(errorMessage, "function", input);
      }
      return input;
    };
  };

  // src/guardians/integer.js
  var GUARD_INTEGER_MESSAGE = "VAL must be an integer";
  var integer_default = (errorMessage = GUARD_INTEGER_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = Number.isInteger(input);
      if (!check) {
        return new GuardianError(msg, "integer", input);
      }
      return input;
    };
  };

  // src/guardians/safe-integer.js
  var GUARD_SAFE_INTEGER_MESSAGE = "VAL must be an safe integer";
  var safe_integer_default = (errorMessage = GUARD_SAFE_INTEGER_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = Number.isSafeInteger(input);
      if (!check) {
        return new GuardianError(msg, "safeInteger", input);
      }
      return input;
    };
  };

  // src/guardians/min-value.js
  var GUARD_MIN_VALUE_MESSAGE = "VAL must be a great then MIN_VALUE";
  var min_value_default = (minValue, errorMessage = GUARD_MIN_VALUE_MESSAGE) => {
    if (!is_value_default(minValue)) throw new Error(`MIN_VALUE not defined!`);
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input).replace(/MIN_VALUE/g, minValue);
      const given = +input;
      const check = !isNaN(given) && given >= +minValue;
      if (!check) {
        return new GuardianError(msg, "minValue", input);
      }
      return input;
    };
  };

  // src/guardians/max-value.js
  var GUARD_MAX_VALUE_MESSAGE = "VAL must be a less then MAX_VALUE";
  var max_value_default = (maxValue, errorMessage = GUARD_MAX_VALUE_MESSAGE) => {
    if (!is_value_default(maxValue)) throw new Error(`MAX_VALUE not defined!`);
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input).replace(/MAX_VALUE/g, maxValue);
      const given = +input;
      const check = !isNaN(given) && given <= +maxValue;
      if (!check) {
        return new GuardianError(msg, "maxValue", input);
      }
      return input;
    };
  };

  // src/guardians/email.js
  var GUARD_EMAIL_MESSAGE = "VAL must be a string in valid email format";
  var email_default = (errorMessage = GUARD_EMAIL_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const check = typeof input === "string" && emailRegex.test(input);
      if (!check) {
        return new GuardianError(msg, "email", input);
      }
      return input;
    };
  };

  // src/guardians/required.js
  var GUARD_REQUIRED_MESSAGE = "Any value required";
  var required_default = (errorMessage = GUARD_REQUIRED_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input !== "undefined" && input !== null && input !== "";
      if (!check) {
        return new GuardianError(msg, "required", input);
      }
      return input;
    };
  };

  // src/guardians/number.js
  var GUARD_NUMBER_MESSAGE = "VAL must be a number";
  var number_default = (errorMessage = GUARD_NUMBER_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input === "number" && !isNaN(+input);
      if (!check) {
        return new GuardianError(msg, "number", input);
      }
      return input;
    };
  };

  // src/guardians/object.js
  var GUARD_OBJECT_MESSAGE = "VAL must be an object";
  var object_default = (input, errorMessage = GUARD_OBJECT_MESSAGE) => {
    const check = typeof input === "object";
    if (!check) {
      throw new GuardianError(errorMessage.replace(/VAL/g, input), "object", input);
    }
    return __spreadValues({}, input);
  };

  // src/guardians/between.js
  var GUARD_BETWEEN_MESSAGE = "VAL must be between MIN_VAL and MAX_VAL";
  var between_default = (minValue, maxValue, errorMessage = GUARD_BETWEEN_MESSAGE) => {
    if (!is_value_default(minValue)) throw new Error(`MIN_VALUE not defined!`);
    if (!is_value_default(maxValue)) throw new Error(`MAX_VALUE not defined!`);
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input).replace(/MIN_VAL/g, minValue).replace(/MAX_VAL/g, maxValue);
      const given = +input;
      const check = !isNaN(given) && (input >= +minValue && input <= +maxValue);
      if (!check) {
        return new GuardianError(msg, "between", input);
      }
      return input;
    };
  };

  // src/guardians/finite.js
  var GUARD_FINITE_MESSAGE = "VAL must be a finite number";
  var finite_default = (errorMessage = GUARD_FINITE_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = Number.isFinite(input);
      if (!check) {
        return new GuardianError(msg, "finite", input);
      }
      return input;
    };
  };

  // src/guardians/base64.js
  var GUARD_BASE64_MESSAGE = "VAL must be a string in valid base 64 format";
  var base64_default = (errorMessage = GUARD_BASE64_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
      const check = typeof input === "string" && base64Regex.test(input);
      if (!check) {
        return new GuardianError(msg, "base64", input);
      }
      return input;
    };
  };

  // src/guardians/not-number.js
  var GUARD_NOT_NUMBER_MESSAGE = "VAL can`t be a number";
  var not_number_default = (errorMessage = GUARD_NOT_NUMBER_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = isNaN(input);
      if (!check) {
        return new GuardianError(msg, "notNumber", input);
      }
      return input;
    };
  };

  // src/guardians/boolean.js
  var GUARD_BOOLEAN_MESSAGE = "VAL must be a boolean";
  var boolean_default = (errorMessage = GUARD_BOOLEAN_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input === "boolean";
      if (!check) {
        return new GuardianError(msg, "boolean", input);
      }
      return input;
    };
  };

  // src/guardians/array.js
  var GUARD_ARRAY_MESSAGE = "VAL must be an array of TYPE";
  var array_default = (guard, errorMessage = GUARD_ARRAY_MESSAGE) => {
    if (!guard && !errorMessage) {
      guard = string_default();
      errorMessage = GUARD_ARRAY_MESSAGE;
    }
    if (typeof guard === "string") {
      errorMessage = guard;
      guard = string_default();
    }
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input).replace(/TYPE/g, guard.name);
      if (!Array.isArray(input)) {
        return new GuardianError(msg, "array", input);
      }
      for (let v of input) {
        const result = guard(v);
        if (result instanceof GuardianError) {
          return new GuardianError(msg, "array", input);
        }
      }
      return input;
    };
  };

  // src/guardians/imei.js
  var GUARD_EMEI_MESSAGE = "VAL must be a valid EMEI";
  var isValidIMEI = (n2) => {
    const sumDig = (n3) => {
      let a = 0;
      while (n3 > 0) {
        a = a + n3 % 10;
        n3 = parseInt("" + n3 / 10, 10);
      }
      return a;
    };
    let len = ("" + n2).length;
    if (len !== 15) return false;
    let sum = 0;
    for (let i = len; i >= 1; i--) {
      let d = n2 % 10;
      if (i % 2 === 0) d = 2 * d;
      sum += sumDig(d);
      n2 = parseInt("" + n2 / 10, 10);
    }
    return sum % 10 === 0;
  };
  var imei_default = (errorMessage = GUARD_EMEI_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = isValidIMEI(input);
      if (!check) {
        return new GuardianError(msg, "emei", input);
      }
      return input;
    };
  };

  // src/guardians/length.js
  var GUARD_LENGTH_MESSAGE = "VAL must be a string or array with length N";
  var length = (length2, errorMessage = GUARD_LENGTH_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input).replace(/N/g, length2);
      const check = (typeof input === "string" || Array.isArray(input)) && input.length === +length2;
      if (!check) {
        return new GuardianError(msg, "length", input);
      }
      return input;
    };
  };
  var minLength = (length2, errorMessage = GUARD_LENGTH_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input).replace(/N/g, length2);
      const check = (typeof input === "string" || Array.isArray(input)) && input.length >= +length2;
      if (!check) {
        return new GuardianError(msg, "minLength", input);
      }
      return input;
    };
  };
  var maxLength = (length2, errorMessage = GUARD_LENGTH_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input).replace(/N/g, length2);
      const check = (typeof input === "string" || Array.isArray(input)) && input.length <= +length2;
      if (!check) {
        return new GuardianError(msg, "maxLength", input);
      }
      return input;
    };
  };

  // src/guardians/ip.js
  var GUARD_IP_MESSAGE = "VAL must be a valid ip address ipv4 or ipv6";
  var GUARD_IPv4_MESSAGE = "VAL must be a valid ipv4 address";
  var GUARD_IPv6_MESSAGE = "VAL must be a valid ipv6 address";
  var regexpIpv4 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  var regexpIpv6 = /^[a-fA-F0-9]{1, 4}:[a-fA-F0-9]{1, 4}:[a-fA-F0-9]{1, 4}:[a-fA-F0-9]{1, 4}:[a-fA-F0-9]{1, 4}:[a-fA-F0-9]{1, 4}:[a-fA-F0-9]{1, 4}:[a-fA-F0-9]{1, 4}$/;
  var ip = (errorMessage = GUARD_IP_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input === "string" && (regexpIpv4.test(input) || regexpIpv6.test(input));
      if (!check) {
        return new GuardianError(msg, "ip", input);
      }
      return input;
    };
  };
  var ipv4 = (errorMessage = GUARD_IPv4_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input === "string" && regexpIpv4.test(input);
      if (!check) {
        return new GuardianError(msg, "ipv4", input);
      }
      return input;
    };
  };
  var ipv6 = (errorMessage = GUARD_IPv6_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input === "string" && regexpIpv6.test(input);
      if (!check) {
        return new GuardianError(msg, "ipv6", input);
      }
      return input;
    };
  };

  // src/guardians/domain.js
  var GUARD_DOMAIN_MESSAGE = "VAL must be a valid domain name, xn--* for internationalized names";
  var regexpDomain = /^((xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
  var domain_default = (errorMessage = GUARD_DOMAIN_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input === "string" && regexpDomain.test(input);
      if (!check) {
        return new GuardianError(msg, "domain", input);
      }
      return input;
    };
  };

  // src/guardians/url.js
  var GUARD_URL_MESSAGE = "VAL must be a valid url";
  var regexpUrl = /^(?:(?:(?:https?|ftp|wss?):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  var url_default = (errorMessage = GUARD_URL_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input === "string" && regexpUrl.test(input);
      if (!check) {
        return new GuardianError(msg, "url", input);
      }
      return input;
    };
  };

  // src/guardians/color.js
  var GUARD_COLOR_MESSAGE = "VAL must be a valid color in HEX, RGB(A), or HSL(A) format";
  var GUARD_HEX_COLOR_MESSAGE = "VAL must be a valid HEX color";
  var GUARD_RGB_COLOR_MESSAGE = "VAL must be a valid RGB(a) color";
  var GUARD_HSL_COLOR_MESSAGE = "VAL must be a valid HSL(A) color";
  var regexp = /^#(?:[\da-f]{3}){1,2}$|^#(?:[\da-f]{4}){1,2}$|^(rgb|hsl)a?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*)\)$|^(rgb|hsl)a?\((\s*-?\d+%?\s*,){3}\s*(0|(0?\.\d+)|1)\)$/gmi;
  var regexpHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
  var regexpRgb = /^rgba?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*)\)$|^rgba?\((\s*-?\d+%?\s*,){3}\s*(0|(0?\.\d+)|1)\)$/gmi;
  var regexpHsl = /^hsla?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*)\)$|^hsla?\((\s*-?\d+%?\s*,){3}\s*(0|(0?\.\d+)|1)\)$/gmi;
  var color_default = (errorMessage = GUARD_COLOR_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input === "string" && regexp.test(input);
      if (!check) {
        return new GuardianError(msg, "color", input);
      }
      return input;
    };
  };
  var hexColor = (errorMessage = GUARD_HEX_COLOR_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input === "string" && regexpHex.test(input);
      if (!check) {
        return new GuardianError(msg, "hexColor", input);
      }
      return input;
    };
  };
  var rgbColor = (errorMessage = GUARD_RGB_COLOR_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input === "string" && regexpRgb.test(input);
      if (!check) {
        return new GuardianError(msg, "rgbColor", input);
      }
      return input;
    };
  };
  var hslColor = (errorMessage = GUARD_HSL_COLOR_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input === "string" && regexpHsl.test(input);
      if (!check) {
        return new GuardianError(msg, "hslColor", input);
      }
      return input;
    };
  };

  // src/guardians/credit-card.js
  var visaRegEx = /^4\d{12}(?:\d{3,6})?$/u;
  var mastercardRegEx = /^5[1-5]\d{2}|(?:222\d|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)\d{12}$/u;
  var amexpRegEx = /^3[47]\d{13}$/u;
  var discovRegEx = /^6(?:011|5\d{2})\d{12,15}$/u;
  var dinersRegEx = /^3(?:0[0-5]|[68]\d)\d{11,13}$/u;
  var jcbRegExp = /^(?:2131|1800|35\d{3})\d{11}$/u;
  var unionRegExp = /^(?:6[27]\d{14,17}|81\d{14,17})$/u;
  var GUARD_CREDIT_CARD_MESSAGE = "VAL must be a valid CC number (visa, mastercard, american express, discover, diners club, jcb, or union pay)";
  var GUARD_CREDIT_CARD_VISA_MESSAGE = "VAL must be a valid Visa card number";
  var GUARD_CREDIT_CARD_MASTER_MESSAGE = "VAL must be a valid Mastercard card number";
  var GUARD_CREDIT_CARD_AMEX_MESSAGE = "VAL must be a valid American Express card number";
  var GUARD_CREDIT_CARD_DISC_MESSAGE = "VAL must be a valid DISCOVER card number";
  var GUARD_CREDIT_CARD_DINER_MESSAGE = "VAL must be a valid DINERS CLUB card number";
  var GUARD_CREDIT_CARD_JCB_MESSAGE = "VAL must be a valid JCB card number";
  var GUARD_CREDIT_CARD_UNION_MESSAGE = "VAL must be a valid Union Pay card number";
  var creditCard = (errorMessage = GUARD_CREDIT_CARD_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input === "string" && (visaRegEx.test(input) || mastercardRegEx.test(input) || amexpRegEx.test(input) || discovRegEx.test(input) || dinersRegEx.test(input) || jcbRegExp.test(input) || unionRegExp.test(input));
      if (!check) {
        return new GuardianError(msg, "creditCard", input);
      }
      return input;
    };
  };
  var card = (name, pattern, errorMessage = GUARD_CREDIT_CARD_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input === "string" && pattern.test(input);
      if (!check) {
        return new GuardianError(msg, name, input);
      }
      return input;
    };
  };
  var visa = (errorMessage = GUARD_CREDIT_CARD_VISA_MESSAGE) => {
    return card("visa", visaRegEx, errorMessage);
  };
  var mastercard = (errorMessage = GUARD_CREDIT_CARD_MASTER_MESSAGE) => {
    return card("mastercard", mastercardRegEx, errorMessage);
  };
  var americanExpress = (errorMessage = GUARD_CREDIT_CARD_AMEX_MESSAGE) => {
    return card("american express", amexpRegEx, errorMessage);
  };
  var discover = (errorMessage = GUARD_CREDIT_CARD_DISC_MESSAGE) => {
    return card("discover", discovRegEx, errorMessage);
  };
  var diners = (errorMessage = GUARD_CREDIT_CARD_DINER_MESSAGE) => {
    return card("diners club", dinersRegEx, errorMessage);
  };
  var jcb = (errorMessage = GUARD_CREDIT_CARD_JCB_MESSAGE) => {
    return card("jcb card", jcbRegExp, errorMessage);
  };
  var unionPay = (errorMessage = GUARD_CREDIT_CARD_UNION_MESSAGE) => {
    return card("union pay", unionRegExp, errorMessage);
  };

  // src/guardians/bytes.js
  var GUARD_BYTES_MESSAGE = "The length of string must be VAL bytes";
  var bytes_default = (length2, errorMessage = GUARD_BYTES_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = typeof input === "string" && new TextEncoder().encode(input).length === length2;
      if (!check) {
        return new GuardianError(msg, "bytes", input);
      }
      return input;
    };
  };

  // src/guardians/not-null.js
  var GUARD_NOT_NULL_MESSAGE = "VAL can`t be null or undefined.";
  var not_null_default = (errorMessage = GUARD_NOT_NULL_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = is_value_default(input);
      if (!check) {
        return new GuardianError(msg, "notNull", input);
      }
      return input;
    };
  };

  // src/guardians/pattern.js
  var GUARD_PATTERN_MESSAGE = "The value must match the pattern";
  var pattern_default = (pattern, errorMessage = GUARD_PATTERN_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const regexp2 = typeof pattern === "string" ? new RegExp(pattern, "g") : pattern;
      const check = regexp2.test("" + input);
      if (!check) {
        return new GuardianError(msg, "pattern", input);
      }
      return input;
    };
  };

  // src/guardians/digits.js
  var GUARD_DIGITS_MESSAGE = "VAL must contains only digits";
  var digits_default = (errorMessage = GUARD_DIGITS_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = /^\d+$/g.test("" + input);
      if (!check) {
        return new GuardianError(msg, "digits", input);
      }
      return input;
    };
  };

  // src/guardians/float.js
  var GUARD_FLOAT_MESSAGE = "VAL must be a float";
  var float_default = (errorMessage = GUARD_FLOAT_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input);
      const check = !isNaN(input) && +n % 1 !== 0 || /^\d*\.\d+$/.test(input);
      if (!check) {
        return new GuardianError(msg, "float", input);
      }
      return input;
    };
  };

  // src/guardians/contains.js
  var GUARD_STRING_MESSAGE2 = "VAL must must contains OBJ";
  var contains_default = (obj, errorMessage = GUARD_STRING_MESSAGE2) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input).replace(/OBJ/g, obj);
      const check = input.includes(obj);
      if (!check) {
        return new GuardianError(msg, "contains", input);
      }
      return input;
    };
  };

  // src/guardians/type.js
  var GUARD_TYPE_MESSAGE = "A VAL must have type TYPE";
  function getType(obj) {
    return Object.prototype.toString.call(obj).replace(/^\[object (.+)]$/, "$1").toLowerCase();
  }
  var type_default = (type = "string", errorMessage = GUARD_TYPE_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input).replace(/TYPE/g, type);
      const check = type === getType(input);
      if (!check) {
        return new GuardianError(msg, "type", input);
      }
      return input;
    };
  };

  // src/guardians/equal.js
  var GUARD_EQUAL_MESSAGE = "VAL must be an equal to VALUE";
  var equal_default = (val, errorMessage = GUARD_EQUAL_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input).replace(/VALUE/g, val);
      const check = input === val;
      if (!check) {
        return new GuardianError(msg, "equal", input);
      }
      return input;
    };
  };

  // src/guardians/similar.js
  var GUARD_SIMILAR_MESSAGE = "VAL must be a similar to VALUE";
  var similar_default = (val, errorMessage = GUARD_SIMILAR_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input).replace(/VALUE/g, val);
      const check = input == val;
      if (!check) {
        return new GuardianError(msg, "similar", input);
      }
      return input;
    };
  };

  // src/guardians/great.js
  var GUARD_GREAT_MESSAGE = "VAL must be a great then VALUE";
  var great_default = (val, errorMessage = GUARD_GREAT_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input).replace(/VALUE/g, val);
      const check = input > val;
      if (!check) {
        return new GuardianError(msg, "great", input);
      }
      return input;
    };
  };

  // src/guardians/less.js
  var GUARD_LESS_MESSAGE = "VAL must be a less then VALUE";
  var less_default = (val, errorMessage = GUARD_LESS_MESSAGE) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input).replace(/VALUE/g, val);
      const check = input < val;
      if (!check) {
        return new GuardianError(msg, "less", input);
      }
      return input;
    };
  };

  // src/guardians/greatOrEqual.js
  var GUARD_GREAT_MESSAGE2 = "VAL must be a great or equal to VALUE";
  var greatOrEqual_default = (val, errorMessage = GUARD_GREAT_MESSAGE2) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input).replace(/VALUE/g, val);
      const check = input >= val;
      if (!check) {
        return new GuardianError(msg, "greatOrEqual", input);
      }
      return input;
    };
  };

  // src/guardians/lessOrEqual.js
  var GUARD_LESS_MESSAGE2 = "VAL must be a less or equal to VALUE";
  var lessOrEqual_default = (val, errorMessage = GUARD_LESS_MESSAGE2) => {
    return function(input) {
      const msg = errorMessage.replace(/VAL/g, input).replace(/VALUE/g, val);
      const check = input <= val;
      if (!check) {
        return new GuardianError(msg, "lessOrEqual", input);
      }
      return input;
    };
  };

  // src/info/info.js
  var version = "0.7.2";
  var build_time = "02.05.2025, 18:47:05";
  var info_default = () => {
    console.info(`%c Guardian %c v${version} %c ${build_time} `, "color: pink; font-weight: bold; background: #2b1700", "color: white; background: darkgreen", "color: white; background: #0080fe;");
  };
  return __toCommonJS(index_exports);
})();
//# sourceMappingURL=guardian.js.map

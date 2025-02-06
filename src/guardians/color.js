import {GuardianError} from "../error/index.js";

const GUARD_COLOR_MESSAGE = 'VAL must be a valid color in HEX, RGB(A), or HSL(A) format'
const GUARD_HEX_COLOR_MESSAGE = 'VAL must be a valid HEX color'
const GUARD_RGB_COLOR_MESSAGE = 'VAL must be a valid RGB(a) color'
const GUARD_HSL_COLOR_MESSAGE = 'VAL must be a valid HSL(A) color'

const regexp = /^#(?:[\da-f]{3}){1,2}$|^#(?:[\da-f]{4}){1,2}$|^(rgb|hsl)a?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*)\)$|^(rgb|hsl)a?\((\s*-?\d+%?\s*,){3}\s*(0|(0?\.\d+)|1)\)$/gmi
const regexpHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i
const regexpRgb = /^rgba?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*)\)$|^rgba?\((\s*-?\d+%?\s*,){3}\s*(0|(0?\.\d+)|1)\)$/gmi
const regexpHsl = /^hsla?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*)\)$|^hsla?\((\s*-?\d+%?\s*,){3}\s*(0|(0?\.\d+)|1)\)$/gmi

export default (errorMessage = GUARD_COLOR_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && regexp.test(input)
        if (!check) {
            return new GuardianError( msg,"color", input )
        }
        return input
    }
}

export const hexColor = (errorMessage = GUARD_HEX_COLOR_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && regexpHex.test(input)
        if (!check) {
            return new GuardianError( msg,"hexColor", input )
        }
        return input
    }
}

export const rgbColor = (errorMessage = GUARD_RGB_COLOR_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && regexpRgb.test(input)
        if (!check) {
            return new GuardianError( msg,"rgbColor", input )
        }
        return input
    }
}

export const hslColor = (errorMessage = GUARD_HSL_COLOR_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && regexpHsl.test(input)
        if (!check) {
            return new GuardianError( msg,"hslColor", input )
        }
        return input
    }
}

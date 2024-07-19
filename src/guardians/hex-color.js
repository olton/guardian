import {GuardianError} from "../error";

const GUARD_HEX_COLOR_MESSAGE = 'VAL must be a valid hex color'

const regexp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i

export default (errorMessage = GUARD_HEX_COLOR_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && regexp.test(input)
        if (!check) {
            return new GuardianError( msg,"hexColor", input )
        }
        return input
    }
}

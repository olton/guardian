import {GuardianError} from "../error";

const GUARD_PATTERN_MESSAGE = 'The value must match the pattern'

export default (pattern, errorMessage = GUARD_PATTERN_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const regexp = typeof pattern === "string" ? new RegExp(pattern, 'g') : pattern
        const check = regexp.test(""+input)
        if (!check) {
            return new GuardianError( msg,"domain", input )
        }
        return input
    }
}

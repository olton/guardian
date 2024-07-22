import {GuardianError} from "../error";

const GUARD_DIGITS_MESSAGE = 'VAL must contains only digits'

export default (errorMessage = GUARD_DIGITS_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = /^\d+$/g.test(""+input)
        if (!check) {
            return new GuardianError( msg,"digits", input )
        }
        return input
    }
}
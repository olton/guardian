import {GuardianError} from "../error";

const GUARD_EMAIL_MESSAGE = 'VAL must be a string in valid email format'

export default (errorMessage = GUARD_EMAIL_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const check = typeof input === "string" && emailRegex.test(input);
        if (!check) {
            return new GuardianError( msg,"email", input )
        }
        return input
    }
}
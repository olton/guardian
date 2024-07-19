import {GuardianError} from "../error";

const GUARD_BASE64_MESSAGE = 'VAL must be a string in valid base 64 format'

export default (errorMessage = GUARD_BASE64_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        const check = typeof input === "string" && base64Regex.test(input);
        if (!check) {
            return new GuardianError( msg,"base64", input )
        }
        return input
    }
}
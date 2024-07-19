import {GuardianError} from "../error";
import isValue from "../helpers/is-value.js";

const GUARD_NOT_NULL_MESSAGE = 'VAL can`t be null or undefined.';

export default (errorMessage = GUARD_NOT_NULL_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = isValue(input)
        if (!check) {
            return new GuardianError( msg,"notNull", input )
        }
        return input
    }
}
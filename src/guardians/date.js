import {GuardianError} from "../error";

const GUARD_DATE_MESSAGE = 'VAL must be valid date object or date string'

export default (errorMessage = GUARD_DATE_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = input instanceof Date
        if (!check) {
            return new GuardianError( msg,"date", input )
        }
        return input
    }
}
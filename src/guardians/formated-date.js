import {GuardianError} from "../error";
import str2date from "../helpers/str2date.js";

const GUARD_FORMATED_DATE_MESSAGE = 'VAL must be a string in date format'

export default (errorMessage = GUARD_FORMATED_DATE_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && str2date(input) instanceof Date
        if (!check) {
            return new GuardianError( msg,"formated-date", input )
        }
        return input
    }
}
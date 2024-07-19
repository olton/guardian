import {GuardianError} from "../error";

const GUARD_NOT_NUMBER_MESSAGE = 'VAL can`t be a number'

export default (errorMessage = GUARD_NOT_NUMBER_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = isNaN(input)
        if (!check) {
            return new GuardianError( msg,"notNumber", input )
        }
        return input
    }
}
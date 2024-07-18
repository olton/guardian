import {GuardianError} from "../error";

const GUARD_NUMBER_MESSAGE = 'VAL must be a valid number'

export default (errorMessage = GUARD_NUMBER_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = !isNaN(input)
        if (!check) {
            return new GuardianError( msg,"number", input )
        }
        return input
    }
}
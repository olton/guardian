import {GuardianError} from "../error";

const GUARD_NUMBER_MESSAGE = 'VAL must be a number'

export default (errorMessage = GUARD_NUMBER_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "number" //!isNaN(input)
        if (!check) {
            return new GuardianError( msg,"number", input )
        }
        return input
    }
}
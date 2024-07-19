import {GuardianError} from "../error";

const GUARD_FINITE_MESSAGE = 'VAL must be a finite number'

export default (errorMessage = GUARD_FINITE_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = Number.isFinite(input)
        if (!check) {
            return new GuardianError( msg,"finite", input )
        }
        return input
    }
}
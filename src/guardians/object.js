import {GuardianError} from "../error";

const GUARD_OBJECT_MESSAGE = 'VAL must be an object'

export default (errorMessage = GUARD_OBJECT_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === 'object'
        if (!check) {
            return new GuardianError( msg,"object", input )
        }
        return input
    }
}
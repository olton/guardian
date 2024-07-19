import {GuardianError} from "../error";

const GUARD_INSTANCE_MESSAGE = 'VAL must be an instance of'

export default (obj, errorMessage = GUARD_INSTANCE_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = input instanceof obj
        if (!check) {
            return new GuardianError( msg,"instance", input )
        }
        return input
    }
}
import {GuardianError} from "../error/index.js";

const GUARD_PROMISE_MESSAGE = 'VAL must be an instance of Promise'

export default (errorMessage = GUARD_PROMISE_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = input instanceof Promise
        if (!check) {
            return new GuardianError( msg,"promise", input )
        }
        return input
    }
}

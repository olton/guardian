import {GuardianError} from "../error";

const GUARD_BIGINT_MESSAGE = 'VAL must be a bigint'

export default (errorMessage = GUARD_BIGINT_MESSAGE) => {
    return function(val){
        const msg = errorMessage.replace(/VAL/g, val)
        if (typeof val !== "bigint") {
            return new GuardianError( msg,"bigint", val )
        }
        return val
    }
}
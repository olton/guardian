import {GuardianError} from "../error";

const GUARD_BIGINT_MESSAGE = 'VAL must be a bigint'

export default (errorMessage = GUARD_BIGINT_MESSAGE) => {
    return function(input){
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "bigint"
        if (!check) {
            return new GuardianError( msg,"bigint", input )
        }
        return input
    }
}
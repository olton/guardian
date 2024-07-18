import {GuardianError} from "../error";

const GUARD_SYMBOL_MESSAGE = 'A symbol is required'

export default (msg = GUARD_SYMBOL_MESSAGE) => {
    return function(val){
        if (typeof val !== "symbol") {
            return new GuardianError( msg, "symbol", val )
        }
        return val
    }
}
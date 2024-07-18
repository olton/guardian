import {GuardianError} from "../error";

const GUARD_SYMBOL_MESSAGE = 'A symbol is required'

export default (msg = GUARD_SYMBOL_MESSAGE) => {
    return function(input){
        const check = typeof input === "symbol"
        if (!check) {
            return new GuardianError( msg, "symbol", input )
        }
        return input
    }
}
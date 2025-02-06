import {GuardianError} from "../error/index.js";

const GUARD_TYPE_MESSAGE = 'A VAL must have type TYPE'

function getType (obj){
    return Object.prototype.toString.call(obj).replace(/^\[object (.+)]$/, '$1').toLowerCase();
}

export default (type = 'string', errorMessage = GUARD_TYPE_MESSAGE) => {
    return function(input){
        const msg = errorMessage.replace(/VAL/g, input).replace(/TYPE/g, type)
        const check = type === getType(input)
        if (!check) {
            return new GuardianError( msg, "type", input )
        }
        return input
    }
}
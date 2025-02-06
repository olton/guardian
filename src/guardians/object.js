import {GuardianError} from "../error/index.js";

const GUARD_OBJECT_MESSAGE = 'VAL must be an object'

export default (input, errorMessage = GUARD_OBJECT_MESSAGE) => {
    const check = typeof input === "object"
    if (!check) {
        throw new GuardianError( errorMessage.replace(/VAL/g, input),"object", input )
    }
    return {
        ...input
    }
}
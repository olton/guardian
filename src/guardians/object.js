import {GuardianError} from "../error/index.js";

const GUARD_OBJECT_MESSAGE = 'VAL must be an object'

export default (input) => {
    const check = typeof input === "object"
    if (!check) {
        throw new GuardianError( GUARD_OBJECT_MESSAGE.replace(/VAL/g, input),"object", input )
    }
    return {
        ...input
    }
}
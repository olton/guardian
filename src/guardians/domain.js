import {GuardianError} from "../error";

const GUARD_DOMAIN_MESSAGE = 'VAL must be a valid domain name, xn--* for internationalized names'

const regexpDomain = /^((xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/

export default (errorMessage = GUARD_DOMAIN_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && regexpDomain.test(input)
        if (!check) {
            return new GuardianError( msg,"domain", input )
        }
        return input
    }
}

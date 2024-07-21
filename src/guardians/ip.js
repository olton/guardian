import {GuardianError} from "../error";

const GUARD_IP_MESSAGE = 'VAL must be a valid ip address ipv4 or ipv6'
const GUARD_IPv4_MESSAGE = 'VAL must be a valid ipv4 address'
const GUARD_IPv6_MESSAGE = 'VAL must be a valid ipv6 address'

const regexpIpv4 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const regexpIpv6 = /^[a-fA-F0-9]{1, 4}:[a-fA-F0-9]{1, 4}:[a-fA-F0-9]{1, 4}:[a-fA-F0-9]{1, 4}:[a-fA-F0-9]{1, 4}:[a-fA-F0-9]{1, 4}:[a-fA-F0-9]{1, 4}:[a-fA-F0-9]{1, 4}$/

export const ip = (errorMessage = GUARD_IP_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && (regexpIpv4.test(input) || regexpIpv6.test(input))
        if (!check) {
            return new GuardianError( msg,"ip", input )
        }
        return input
    }
}

export const ipv4 = (errorMessage = GUARD_IPv4_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && regexpIpv4.test(input)
        if (!check) {
            return new GuardianError( msg,"ipv4", input )
        }
        return input
    }
}

export const ipv6 = (errorMessage = GUARD_IPv6_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && regexpIpv6.test(input)
        if (!check) {
            return new GuardianError( msg,"ipv6", input )
        }
        return input
    }
}
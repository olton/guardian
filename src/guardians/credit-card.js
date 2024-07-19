import {GuardianError} from "../error";

const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
const amexpRegEx = /^(?:3[47][0-9]{13})$/;
const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;


const GUARD_CREDIT_CARD_MESSAGE = 'VAL must be a valid CC number (visa, mastercard, american express or discovery)'
const GUARD_CREDIT_CARD_VISA_MESSAGE = 'VAL must be a valid Visa CC number'
const GUARD_CREDIT_CARD_MASTER_MESSAGE = 'VAL must be a valid Mastercard CC number'
const GUARD_CREDIT_CARD_AMEX_MESSAGE = 'VAL must be a valid American Express CC number'
const GUARD_CREDIT_CARD_DISC_MESSAGE = 'VAL must be a valid DISCOVERY CC number'

export const creditCard = (errorMessage = GUARD_CREDIT_CARD_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && (
            visaRegEx.test(input)
            || mastercardRegEx.test(input)
            || amexpRegEx.test(input)
            || discovRegEx.test(input)
        )
        if (!check) {
            return new GuardianError( msg,"creditCard", input )
        }
        return input
    }
}

export const visa = (errorMessage = GUARD_CREDIT_CARD_VISA_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && (
            visaRegEx.test(input)
        )
        if (!check) {
            return new GuardianError( msg,"visa", input )
        }
        return input
    }
}

export const mastercard = (errorMessage = GUARD_CREDIT_CARD_MASTER_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && (
            mastercardRegEx.test(input)
        )
        if (!check) {
            return new GuardianError( msg,"visa", input )
        }
        return input
    }
}

export const americanExpress = (errorMessage = GUARD_CREDIT_CARD_AMEX_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && (
            amexpRegEx.test(input)
        )
        if (!check) {
            return new GuardianError( msg,"americanExpress", input )
        }
        return input
    }
}

export const discovery = (errorMessage = GUARD_CREDIT_CARD_DISC_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && (
            discovRegEx.test(input)
        )
        if (!check) {
            return new GuardianError( msg,"discovery", input )
        }
        return input
    }
}

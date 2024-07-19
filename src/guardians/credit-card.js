import {GuardianError} from "../error";

const visaRegEx = /^4\d{12}(?:\d{3,6})?$/u;
const mastercardRegEx = /^5[1-5]\d{2}|(?:222\d|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)\d{12}$/u;
const amexpRegEx = /^3[47]\d{13}$/u;
const discovRegEx = /^6(?:011|5\d{2})\d{12,15}$/u;
const dinersRegEx = /^3(?:0[0-5]|[68]\d)\d{11,13}$/u
const jcbRegExp = /^(?:2131|1800|35\d{3})\d{11}$/u
const unionRegExp = /^(?:6[27]\d{14,17}|81\d{14,17})$/u


const GUARD_CREDIT_CARD_MESSAGE = 'VAL must be a valid CC number (visa, mastercard, american express, discover, diners club, jcb, or union pay)'
const GUARD_CREDIT_CARD_VISA_MESSAGE = 'VAL must be a valid Visa card number'
const GUARD_CREDIT_CARD_MASTER_MESSAGE = 'VAL must be a valid Mastercard card number'
const GUARD_CREDIT_CARD_AMEX_MESSAGE = 'VAL must be a valid American Express card number'
const GUARD_CREDIT_CARD_DISC_MESSAGE = 'VAL must be a valid DISCOVER card number'
const GUARD_CREDIT_CARD_DINER_MESSAGE = 'VAL must be a valid DINERS CLUB card number'
const GUARD_CREDIT_CARD_JCB_MESSAGE = 'VAL must be a valid JCB card number'
const GUARD_CREDIT_CARD_UNION_MESSAGE = 'VAL must be a valid Union Pay card number'

export const creditCard = (errorMessage = GUARD_CREDIT_CARD_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && (
            visaRegEx.test(input)
            || mastercardRegEx.test(input)
            || amexpRegEx.test(input)
            || discovRegEx.test(input)
            || dinersRegEx.test(input)
            || jcbRegExp.test(input)
            || unionRegExp.test(input)
        )
        if (!check) {
            return new GuardianError( msg,"creditCard", input )
        }
        return input
    }
}



const card = (name, pattern, errorMessage = GUARD_CREDIT_CARD_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && (
            pattern.test(input)
        )
        if (!check) {
            return new GuardianError( msg,name, input )
        }
        return input
    }
}


export const visa = (errorMessage = GUARD_CREDIT_CARD_VISA_MESSAGE) => {
    return card("visa", visaRegEx, errorMessage)
}

export const mastercard = (errorMessage = GUARD_CREDIT_CARD_MASTER_MESSAGE) => {
    return card("mastercard", mastercardRegEx, errorMessage)
}

export const americanExpress = (errorMessage = GUARD_CREDIT_CARD_AMEX_MESSAGE) => {
    return card("american express", amexpRegEx, errorMessage)
}

export const discover = (errorMessage = GUARD_CREDIT_CARD_DISC_MESSAGE) => {
    return card("discover", discovRegEx, errorMessage)
}

export const diners = (errorMessage = GUARD_CREDIT_CARD_DINER_MESSAGE) => {
    return card("diners club", dinersRegEx, errorMessage)
}

export const jcb = (errorMessage = GUARD_CREDIT_CARD_JCB_MESSAGE) => {
    return card("jcb card", jcbRegExp, errorMessage)
}

export const unionPay = (errorMessage = GUARD_CREDIT_CARD_UNION_MESSAGE) => {
    return card("union pay", unionRegExp, errorMessage)
}

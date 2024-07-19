import {GuardianError} from "../error";

const GUARD_EMEI_MESSAGE = 'VAL must be a valid EMEI'

const isValidIMEI = (n) => {
    const sumDig = (n) => {
        let a = 0;
        while (n > 0)
        {
            a = a + n % 10;
            n = parseInt(""+n / 10, 10);
        }
        return a;
    }

    let len = (""+n).length;
    if (len !== 15) return false;

    let sum = 0;
    for(let i = len; i >= 1; i--) {
        let d = (n % 10);
        if (i % 2 === 0) d = 2 * d;
        sum += sumDig(d);
        n = parseInt(""+n / 10, 10);
    }

    return (sum % 10 === 0);
}

export default (errorMessage = GUARD_EMEI_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = isValidIMEI(input)
        if (!check) {
            return new GuardianError( msg,"emei", input )
        }
        return input
    }
}
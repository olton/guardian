/*
* Parse data by scheme
* Function return parsed data.
* if the data does not match the scheme, the parser throws an error with the GuardianParseError object
* @param {object}: schema - schema object
* @param {any}: data - user input
* @return {any} Parsed data
* */
import {GuardianError} from "../error/index.js";

const parse = (schema, data) => {
    let result

    if (!schema) {
        throw new Error(`Schema object required for parse data!`)
    }

    if (typeof schema === "function") {
        result = schema.apply(null, [data])
        if (result instanceof GuardianError) {
            throw result
        }
    } else {
        for(let key in schema){
            const value = data[key]
            const guard = schema[key]

            if (!guard) throw new GuardianError(`Guard not defined for field ${key} in input data!`, "general", data)
            if (!data.hasOwnProperty(key)) throw new GuardianError(`Field ${key} doesn't exists in input data!`, "general", data)

            if (typeof guard === "function") {
                console.log(guard.name)
                result = guard.apply(null, [value])

                if (result instanceof GuardianError) {
                    throw result
                }
            } else {
                parse(guard, value)
            }
        }
    }

    return data
}

const safeParse = (schema, data) => {
    let result

    if (!schema) {
        throw new Error(`Schema object required for parse data!`)
    }

    if (typeof schema === "function") {
        result = schema.apply(null, [data])
        if (result instanceof GuardianError) {
            return {
                ok: false,
                error: result
            }
        }
    } else {
        for(let key in schema){
            const value = data[key]
            const guard = schema[key]

            if (!guard) {continue}

            if (typeof guard === "function") {
                result = guard.apply(null, [data])
                if (result instanceof GuardianError) {
                    return {
                        ok: false,
                        error: result
                    }
                }
            } else {
                parse(guard, value)
            }
        }
    }

    return {
        ok: true,
        output: data
    }
}

export {
    parse,
    safeParse,
}
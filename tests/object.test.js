import {expect, test} from "vitest";
import {object, email, parse, pipe, required, string} from "../src/index.js";

test('Create schema success', () => {
    const schema = object({
        name: string(),
        email: pipe(string(), email())
    })
    expect( parse(schema, {name: "Serhii Pimenov", email: "serhii@pimenov.com.ua"}).name ).toBe('Serhii Pimenov')
})

test('Create schema false', () => {
    const schema = object({
        name: string(),
        email: pipe(string(), email())
    })
    expect( parse(schema, {name: "Serhii Pimenov", email: "serhii@pimenov.com.ua"}).name === 'Sergey Pimenov' ).toBe(false)
})

test('Create schema fail', () => {
    const schema = object({
        name: pipe(string()),
        email: pipe(string(), email())
    })
    expect( () => parse(schema, {name: 123, email: "serhii@pimenov.com.ua"}) ).toThrowError(/123 must be a string/)
})

test('Create schema fail', () => {
    const schema = object({
        name: string(),
        email: pipe(string(), email("Enter a valid email address"))
    })
    expect( () => parse(schema, {name: "", email: "serhii_pimenov.com.ua"}) ).toThrowError(/Enter a valid email address/)
})

test('Create schema fail', () => {
    const schema = object({
        name: pipe(required("Name required"), string()),
        email: pipe(string(), email())
    })
    expect( () => parse(schema, {name: "", email: "serhii@pimenov.com.ua"}) ).toThrowError(/Name required/)
})



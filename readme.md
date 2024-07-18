# Guardian

Data guard and validation library

### Install
```shell
npm i @olton/guardian
```

### Using
```javascript
import {parse, string, required, email, createSchema} from "@olton/guardian"

const schema = string()
let value = parse(schema, "123")

console.log(value); // -> 123

let value = parse(schema, 123) // -> throw error


let value = safeParse(schema, 123) // -> return obj with error
if (!value.ok) {
    console.log(value.error)
}

let value = safeParse(schema, "123") // -> return obj with data
if (value.ok) {
    console.log(value.output)
}

let objSchema = createSchema({
    name: pipe(required("Name Required"), string()),
    email: pipe(string(), email("Please enter a valid email address"))
})

const res1 = parse(objSchema, {
    name: "",
    email: "vasya@pupkin.com"
}) // -> Error "Name Required"

const res2 = parse(objSchema, {
    name: "Serhii Pimenov",
    email: "vasya_pupkin.com"
}) // -> Error "Please enter a valid email address"


```
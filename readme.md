# Guardian

Data guard and validation library

### Install
```shell
npm i @olton/guardian
```

### Using
```javascript
import {parse, string, required, email, object} from "@olton/guardian"

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

let schema = object({
    name: pipe(required("Name Required"), string()),
    email: pipe(string(), email("Please enter a valid email address"))
})

const res0 = parse(schema, {
    name: "Vasya Pupkin",
    email: "vasya@pupkin.com"
}) // -> Ok

const res1 = parse(schema, {
    name: "",
    email: "vasya@pupkin.com"
}) // -> Error "Name Required"

const res2 = parse(schema, {
    name: "Serhii Pimenov",
    email: "vasya_pupkin.com"
}) // -> Error "Please enter a valid email address"


```
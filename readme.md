# Guardian

Data guard and validation library

### Install
```shell
npm i @olton/guardian
```

### Using
```javascript
import {parse, string} from "@olton/guardian"

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
```
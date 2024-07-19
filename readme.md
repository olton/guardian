<h1 align="center">Guardian</h1>

<p align="center">
    <img src="./assets/guardian.svg" style="height: 200px;"/>
</p>

<p align="center">
Data guard and validation library.
Validate user input with Guardian.
</p>


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

### Parsing
- [x] parse - Throw error when invalid data
- [x] safeParse - Return special object with .output when all ok, and .error when invalid data


### Pipes
- [x] pipe - run guarders left to right
- [x] compose - run guarders right to left

```javascript
import {pipe, string, email} from "@olton/guardian"

const scheme1 = pipe(string(), email()) // left to right
const scheme2 = compose(email(), string()) // right to left
```

### Create simple schema
```javascript
import {parse, object, visa, mastercard, string, email} from "@olton/guardian"

const schema1 = string()
const data1 = parse(schema1, "123")

const schema2 = pipe(required(), email())
const data2 = parse(schema2, "vasya@pupkin.com")
```

### Create complex schema
```javascript
import {parse, object, visa, mastercard, string, email} from "@olton/guardian"

const schema = object({
    name: string(),
    email: email(),
    cards: object({
        visa: visa(),
        mastercard: mastercard()
    })
})

const data = parse(schema, {...})
```

### Guardians
- [x] array
- [x] base64
- [x] between
- [x] bigint
- [x] boolean
- [x] bytes
- [x] creditCard (visa, mastercard, discover, jbc, diners, unionPay, americanExpress)
- [x] date
- [x] domain
- [x] email
- [x] empty
- [x] endsWith
- [x] finite
- [x] func
- [x] hexColor
- [x] imei
- [x] instance
- [x] integer
- [x] ip (ipv4, ipv6)
- [x] length
- [x] maxValue
- [x] minValue
- [x] notNull
- [x] notNumber
- [x] number
- [x] pattern
- [x] promise
- [x] required
- [x] safeInteger
- [x] startsWith
- [x] string
- [x] symbol
- [x] unknown
- [x] url
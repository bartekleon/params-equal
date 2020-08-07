# param-type [![NPM version](https://img.shields.io/npm/v/params-equal.svg?style=flat)](https://www.npmjs.com/package/params-equal)

Is function() {} = function() {}? Or {} = {}? "hello" = new String("hello")?
Now they are. **params-equal** checks if two given parameters are equal and works for cases, other programs do not check. Optimalised to be **as fast as it is possible** and **tested** to work as intended.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save params-equal
```

```js
import paramsEqual from 'params-equal';
or
const paramsEqual = require('params-equal').default;

paramsEqual(NaN, NaN) //=> true

paramsEqual(NaN, 0 / 0) //=> true

paramsEqual(null, null) //=> true

paramsEqual(true, true) //=> true

paramsEqual(true, false) //=> false

paramsEqual("", "") //=> true

paramsEqual("", "hi") //=> false

paramsEqual(2, 2) //=> true

paramsEqual(2, 4) //=> false

paramsEqual(2, "4") //=> false

paramsEqual(-0, +0) // => false

paramsEqual(Infinity, Infinity) // => true

paramsEqual(Infinity, 1 / 0) // => true

paramsEqual(-0, -0)) // => true

paramsEqual(/a/g, /a/g) //=> true

paramsEqual(/a/g, /a/u) //=> false

paramsEqual(/b/g, /a/g) //=> false

paramsEqual(/a/g, new RegExp('a', 'g')) //=> true

paramsEqual(Symbol(12), Symbol(12)) //=> true

paramsEqual(Symbol(12), Symbol("12")) //=> true

paramsEqual(Symbol(12), Symbol(6)) //=> false

paramsEqual(new Boolean(true), new Boolean(true)) //=> true

paramsEqual(new Boolean(true), new Boolean(false)) //=> false

paramsEqual(new Object(), new Object()) //=> true

paramsEqual([], []) //=> true

paramsEqual([1], []) //=> false

paramsEqual({}, []) //=> false

paramsEqual(function() {}, function() {}) //=> true

paramsEqual(function hi() {}, function() {}) //=> false

paramsEqual(() => {}, function() {}) //=> false

paramsEqual(function() {}, function() {return false; }) //=> false

paramsEqual(async function() {}, function() {}) //=> false

paramsEqual(new Date(), new Date(1256252)) //=> false

paramsEqual({ hi: { hello: 1 } }, { hi: { hello: "1" } }) //=> false

paramsEqual([{ hi: "hello" }, "hi"], [{ hi: "hello" }, "hi"]) //=> true

paramsEqual({
  log: [],
  set yo(name: string) {
    this.log.push(name);
  },
  get yo() {
    return "this is set";
  }
},
{
  log: [],
  get yo() {
    return "this is set";
  }
}) //=> false

paramsEqual({
  log: [],
  yo: "this is set"
},
{
  log: [],
  get yo() {
    return "this is set";
  }
}) //=> false

paramsEqual({
  log: [],
  set yo(name: string) {
    this.log.push(name);
  },
  get yo() {
    return "this is set";
  }
},
{
  log: [],
  set yo(name: string) {
    this.log.push(name);
  },
  get yo() {
    return "this is set";
  }
}) //=> true

const a = { hi: "hello", s: {} };
const b = { hi: "hello", s: {} };
const c = { hi: "h", c: {} };

c.c = c;
a.s = a;
b.s = c;
paramsEqual(a, b) //=> RangeError("You are not allowed to create infinite nest")
```

## Test

- Unit tests:
```sh
$ npm install && npm test
```

### Author

**kmdrGroch**

### License
Copyright © 2018, [kmdrGroch](https://github.com/kmdrgroch).
Released under the [MIT License](LICENSE).

### Note
The code will work for node >= 8, although there is a possibility that development tools won't work for some versions.
# Values and Types

## Primitive Types

### Numbers (64 bits per number)

- 1
- 0.23847
- 10.4
- NaN
- Infinity

```
(1/0) // Infinity
(0/0) // NaN

typeof(Infinity) // "number"

Number.POSITIVE_INFINITY === Infinity // true
Number.NEGATIVE_INFINITY === -Infinity // true
```

### Strings (16 bits per string element)

- 'hi!'
- "this is another string"
- `` `this is a special string called a "template string". It can span across multiple lines` ``
- `` `half of 100 is ${100 / 2}. This can embed values.` ``
- "con" + "cat" + "e" + "nate"
- "This is the first line\nthis is the second line"
- "we are\\\on the same line because of escaped character"

### Booleans

- true
- false

### Others

- Symbol (introduced in ES6)
- null
- undefined

Primitive types can be combined together to create objects.

### Quiz

What is the output of the following?

```js
console.log("Abc" < "Zyx");
console.log("abc" < "Abc");
console.log(NaN == NaN);
```

## Automatic type conversion

```js
console.log(8 * null); // 0
console.log("5" - 1); // 4
console.log("5" + 1); // 51
```

JavaScript will silently convert the types when an operator is applied to the "wrong" type.

This is **type coercion**.

## Working with numbers

- Arithmetic operators: +, -, /, \*, %
- Math methods (e.g. Math.pow(2,2))
- Increment/decrement operators (++ and --)
- Operators with assignment: +=, -=, /=

## Working with strings

- Single and double quotes
- Template strings
- String properties (e.g. `"some string".length`)
- String methods (e.g. `"some string".toLowerCase()`, `"some string".toUpperCase()`)
  and much more (see [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))!

## Declaring and initialization variables

<img src="https://scotch-res.cloudinary.com/image/upload/dpr_2,w_800,q_auto:good,f_auto/media/8976/bNTL1QI3RFebh7C1JPYC_variable%20hoisting.png" alt="JavaScript variable lifecycle" width="500"/>

Three types of declarations:

- var e.g. `var isSaturday = false`
- let e.g. `let age = 45`
- const e.g. `const name = 'Jack'`

A variable (or constant) contains a value, (e.g. "hello" or 42).
You use variables to store, retrieve, and manipulate values that appear in your code.
Variables can refer to other variables.

`let` and `const` were introduced in modern JavaScript to solve the problems that `var` had.
In modern JS, use `let` or `const` whenever possible and appropriate.

```js
const a = 1;
const b = a; // b is also 1

const x = 15;
const y = x + 20; // y is ???
```

## Differences between var and let and const

### Scoping

While `var` is **function scoped**, `let` and `const` is **block scoped**. We shall elaborate more in the [scopes](javascript/scopes) topic.

### Variable Hoisting

JavaScript treats all variable declarations using `var` as if they are declared at the top of a functional scope (if declared inside a function) or global scope (if declared outside of a function) regardless of where the actual declaration occurs. Only declarations are hoisted (or "lifted"), not initializations.

This is done by the JavaScript interpreter.

To understand what we mean by this, let's look at an example:

```js
console.log(name); // prints undefined
console.log(y); // throws ReferenceError: y is not defined
var name = "James";
```

This behaviour could be quite unintuitive.
This is equivalent to writing the code like this:

```js
var name;
console.log(name); // prints undefined
console.log(y); // throws ReferenceError: y is not defined
name = "James";
```

A best practice is to place all var statements near to the top of the function. This increases the clarity of the code.

Are `let` and `const` hoisted?
Yes. There are many conflicting answers of this online but let's check the reliable [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types#Variable_hoisting).

> In ECMAScript 2015, let and const are hoisted but not initialized. Referencing the variable in the block before the variable declaration results in a ReferenceError, because the variable is in a ["temporal dead zone"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz) from the start of the block until the declaration is processed.
> [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types#Variable_hoisting)

Example of `let` being "declared" but not initialized throwing **ReferenceError**.

```js
console.log(name); // prints undefined
console.log(foo); // throws ReferenceError
var name = "James";
let foo = 1;
```

### Further reading:

**On variable "hoisting":**

> The thing that’s confusing about “hoisting” is that nothing is actually “hoisted” or moved around. Now that you understand Execution Contexts and that variable declarations are assigned a default value of undefined during the Creation phase, you understanding “hoisting” because that’s literally all it is. [source](https://ui.dev/ultimate-guide-to-execution-contexts-hoisting-scopes-and-closures-in-javascript/)

> JavaScript is not actually moving code to the top of the page. All this means is that before your code begins to be executed line by line, the JavaScript engine has already set aside memory space for the variables that you have created in that entire code that you have built and all of the functions that you have created, as well. [source](https://medium.com/javascript-in-plain-english/90-of-developers-get-this-wrong-fdbdb2e4bf66)

## Naming rules and conventions

Try to give your variables meaningful names to make it easy for other people to understand what your code does.

- Names are case-sensitive
- Names cannot start with numbers
- Generally speaking, use only alphabets
- The name must not be a reserved keyword (e.g. var, for, if, while) (see full list of reserved keywords [here](https://mathiasbynens.be/notes/reserved-keywords))

**Refer to this [blog post](https://www.robinwieruch.de/javascript-naming-conventions) for JavaScript naming conventions.**

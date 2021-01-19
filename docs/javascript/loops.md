# Loops

There are many ways to loop through an array or object.

## For loop

Syntax:

```js
myArray = ["alice", "tim", "bob", "june"];
for (startingValueOfI; endingCondition; incrementStep) {
  // do something with myArray[i]
}
```

Example:

```js
someArray = ["alice", "tim", "bob", "june"];
for (var i = 0; i < someArray.length; i++) {
  console.log("Hi " + someArray[i] + "!");
}
```

## While loop

```js
let text = "";
let i = 1;

while (i < 4) {
  text += "The number is " + i;
  i++;
}

console.log(text); // The number is 1The number is 2The number is 3
```

## for...of statement

Use `for...of` to iterate over the values in an iterable, like an array for example:

```js
for (variable of iterable) {
  statement;
}
```

```js
const numbers = [10, 20, 30];
for (const number of numbers) {
  console.log(number);
}
```

Strings are also an iterable type, so you can use for...of on strings:

```js
const string = "abcde";

for (const char of string) {
  console.log(char.toUpperCase().repeat(3));
}
```

## for...in statement

Use for...in to iterate over the object keys:

```js
for (key in object) {
  // do something with key
}
```

```js
const car = {
  wheels: 4,
  doors: 2,
  seats: 5,
};

for (const thing in car) {
  console.log(`my car has ${car[thing]} ${thing}`);
}
```

You can also use for...in to iterate over the index values of an iterable like an array or a string:

```js
const string = "Turn the page";

for (const index in string) {
  console.log(`Index of ${string[index]}: ${index}`);
}
```

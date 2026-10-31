# TypeScript Arrays and Objects

## Imp

- **string is primitive data type but String is a Object type string**

## Arrays

- It can be of all primitive type
- It can also have union type (string | number)
- it doesn't what pos we are changing a string to number it changes it if arr can accept that data type

## TypeScript Array Methods — Complete Notes

> **Important:** TypeScript uses JavaScript's built-in arrays and array methods. TypeScript adds compile-time type checking; the array methods themselves behave like JavaScript.
>
> These notes cover standard `Array` methods commonly available in modern JavaScript/TypeScript. Very new methods such as `Array.fromAsync()` and the non-mutating methods may require a compatible JavaScript runtime and TypeScript `lib` configuration.

## 1. Quick reference: what should I use?

| Goal                               | Method            | What it does                                  | Return value                | Mutates original array?                   |
| ---------------------------------- | ----------------- | --------------------------------------------- | --------------------------- | ----------------------------------------- |
| Perform an action for each item    | `forEach()`       | Calls a callback for each present element     | `undefined`                 | No, unless the callback mutates something |
| Transform each item                | `map()`           | Converts every item to a corresponding result | New array                   | No                                        |
| Keep items matching a condition    | `filter()`        | Selects matching elements                     | New array                   | No                                        |
| Combine items into one result      | `reduce()`        | Accumulates values, e.g. sum or object        | Accumulator/result          | No, unless callback mutates something     |
| Search for the first matching item | `find()`          | Returns the first matching element            | Element or `undefined`      | No                                        |
| Search from the end                | `findLast()`      | Returns the last matching element             | Element or `undefined`      | No                                        |
| Get the index of a matching item   | `findIndex()`     | Finds the first matching index                | Index or `-1`               | No                                        |
| Get the last matching index        | `findLastIndex()` | Finds the last matching index                 | Index or `-1`               | No                                        |
| Check whether any item matches     | `some()`          | Tests whether at least one item passes        | `boolean`                   | No                                        |
| Check whether all items match      | `every()`         | Tests whether every item passes               | `boolean`                   | No                                        |
| Check for a specific value         | `includes()`      | Checks whether a value exists                 | `boolean`                   | No                                        |
| Get an item's index                | `indexOf()`       | Finds the first matching value                | Index or `-1`               | No                                        |
| Get the last index of a value      | `lastIndexOf()`   | Finds the last matching value                 | Index or `-1`               | No                                        |
| Get part of an array               | `slice()`         | Copies a selected range                       | New array                   | No                                        |
| Remove/insert/replace items        | `splice()`        | Edits the array at an index                   | Array of removed items      | **Yes**                                   |
| Add items at the end               | `push()`          | Appends items                                 | New length                  | **Yes**                                   |
| Remove the last item               | `pop()`           | Removes the last item                         | Removed item or `undefined` | **Yes**                                   |
| Add items at the beginning         | `unshift()`       | Prepends items                                | New length                  | **Yes**                                   |
| Remove the first item              | `shift()`         | Removes the first item                        | Removed item or `undefined` | **Yes**                                   |
| Sort items                         | `sort()`          | Sorts the array                               | Same array                  | **Yes**                                   |
| Reverse item order                 | `reverse()`       | Reverses the array                            | Same array                  | **Yes**                                   |
| Sort without changing original     | `toSorted()`      | Returns a sorted copy                         | New array                   | No                                        |
| Reverse without changing original  | `toReversed()`    | Returns a reversed copy                       | New array                   | No                                        |
| Edit without changing original     | `toSpliced()`     | Returns an edited copy                        | New array                   | No                                        |
| Replace one item without mutation  | `with()`          | Returns a copy with one index replaced        | New array                   | No                                        |
| Combine arrays                     | `concat()`        | Joins arrays/values into a new array          | New array                   | No                                        |
| Flatten nested arrays              | `flat()`          | Flattens nested arrays to a specified depth   | New array                   | No                                        |
| Map and flatten one level          | `flatMap()`       | Maps items, then flattens one level           | New array                   | No                                        |
| Convert items into a string        | `join()`          | Joins items with a separator                  | `string`                    | No                                        |
| Read an item by index              | `at()`            | Supports negative indexes                     | Element or `undefined`      | No                                        |

---

## 2. Iteration and transformation methods

Assume these examples where needed:

```ts
const nums: number[] = [1, 2, 3, 4, 5];
```

### `forEach(callback)`

Runs a function once for each present array element. Use it for side effects such as logging or updating another system, not to create a new array.

```ts
nums.forEach((num) => {
  console.log(num);
});
// Logs: 1, 2, 3, 4, 5
```

**Returns:** `undefined`  
**Mutation:** Does not mutate the array by itself. The callback can mutate values or other data.  
**Note:** `forEach()` does not stop early with `break` or a `return` from the callback.

### `map(callback)`

Transforms each element and returns a new array of results.

```ts
const doubled = nums.map((num) => num * 2);
// [2, 4, 6, 8, 10]
```

**Returns:** New array, normally with the same length.  
**Mutation:** No.

### `filter(callback)`

Returns only the elements for which the callback returns a truthy value.

```ts
const even = nums.filter((num) => num % 2 === 0);
// [2, 4]
```

**Returns:** New array; it may be shorter or empty.  
**Mutation:** No.

### `reduce(callback, initialValue?)`

Combines array elements into one accumulated result. Common uses include sums, counts, grouping, and building objects.

```ts
const total = nums.reduce((sum, num) => sum + num, 0);
// 15
```

The callback receives the accumulator, current element, current index, and original array. Providing an initial value is usually a good habit, especially when the array could be empty.

**Returns:** The final accumulator value.  
**Mutation:** Does not mutate the array by itself; the callback can mutate its accumulator.

### `reduceRight(callback, initialValue?)`

Like `reduce()`, but processes elements from right to left.

```ts
const result = ["a", "b", "c"].reduceRight((text, letter) => text + letter, "");
// "cba"
```

**Returns:** The final accumulator value.  
**Mutation:** No, unless the callback mutates something.

### `flatMap(callback)`

Maps each item, then flattens the result by exactly one level. It can be useful when one item produces zero, one, or multiple output items.

```ts
const result = [1, 2, 3].flatMap((n) => [n, n * 10]);
// [1, 10, 2, 20, 3, 30]
```

**Returns:** New array.  
**Mutation:** No.

---

## 3. Search and condition methods

```ts
const values: number[] = [10, 20, 30, 20, 40];
```

### `find(callback)`

Returns the **first element** that satisfies the condition.

```ts
values.find((n) => n > 20); // 30
values.find((n) => n > 100); // undefined
```

### `findLast(callback)`

Returns the **last element** that satisfies the condition, searching from the end.

```ts
values.findLast((n) => n === 20); // 20 (the last 20)
```

### `findIndex(callback)`

Returns the index of the first matching element.

```ts
values.findIndex((n) => n === 20); // 1
```

### `findLastIndex(callback)`

Returns the index of the last matching element.

```ts
values.findLastIndex((n) => n === 20); // 3
```

### `some(callback)`

Returns `true` if **at least one** element satisfies the condition.

```ts
values.some((n) => n > 35); // true
```

### `every(callback)`

Returns `true` only if **every** element satisfies the condition.

```ts
values.every((n) => n > 0); // true
values.every((n) => n > 20); // false
```

### `includes(value, fromIndex?)`

Checks whether the array contains a value.

```ts
values.includes(30); // true
values.includes(99); // false
```

### `indexOf(value, fromIndex?)`

Returns the first index where a matching value occurs, or `-1` if absent.

```ts
values.indexOf(20); // 1
values.indexOf(99); // -1
```

### `lastIndexOf(value, fromIndex?)`

Returns the last matching index, or `-1` if absent.

```ts
values.lastIndexOf(20); // 3
```

**Important difference:** `find()` and `findIndex()` use a callback condition. `includes()`, `indexOf()`, and `lastIndexOf()` search for a particular value.

---

## 4. Extracting and editing arrays

### `slice(start?, end?)`

Copies a selected range. The `start` index is included, while the `end` index is excluded. Negative indexes count from the end.

```ts
const letters = ["a", "b", "c", "d", "e"];
letters.slice(1, 4); // ["b", "c", "d"]
letters.slice(2); // ["c", "d", "e"]
letters.slice(-2); // ["d", "e"]
// letters is unchanged
```

**Returns:** New array. **Mutates?** No.

### `splice(start, deleteCount?, ...items)`

Removes, inserts, and/or replaces items **in the original array**.

```ts
const letters = ["a", "b", "c", "d"];
const removed = letters.splice(1, 2);

// removed: ["b", "c"]
// letters: ["a", "d"]
```

Insert without removing anything:

```ts
const nums = [10, 20, 40];
nums.splice(2, 0, 30);
// nums: [10, 20, 30, 40]
```

Replace an item:

```ts
const nums = [10, 20, 40];
nums.splice(1, 1, 25);
// nums: [10, 25, 40]
```

**Returns:** Array of removed elements. **Mutates?** Yes.

### `toSpliced(start, deleteCount?, ...items)`

Modern non-mutating version of `splice()`. It returns an edited copy and leaves the original unchanged.

```ts
const nums = [10, 20, 40];
const edited = nums.toSpliced(2, 0, 30);
// edited: [10, 20, 30, 40]
// nums:   [10, 20, 40]
```

### `with(index, value)`

Returns a copy with one index replaced. It does not alter the original array.

```ts
const nums = [10, 20, 30];
const updated = nums.with(1, 99);
// updated: [10, 99, 30]
// nums:    [10, 20, 30]
```

### `concat(...items)`

Combines the original array with other arrays and/or values into a new array.

```ts
const a = [1, 2];
const combined = a.concat([3, 4], 5);
// [1, 2, 3, 4, 5]
// a remains [1, 2]
```

### `at(index)`

Returns the element at an index. Negative indexes count from the end.

```ts
const letters = ["a", "b", "c"];
letters.at(0); // "a"
letters.at(-1); // "c"
```

### `push(...items)` and `pop()`

```ts
const nums = [1, 2];
const newLength = nums.push(3, 4); // nums: [1, 2, 3, 4], newLength: 4
const last = nums.pop(); // last: 4, nums: [1, 2, 3]
```

`push()` adds to the end and returns the new length. `pop()` removes and returns the final element (`undefined` if empty). **Both mutate the array.**

### `unshift(...items)` and `shift()`

```ts
const nums = [2, 3];
const newLength = nums.unshift(0, 1); // nums: [0, 1, 2, 3], newLength: 4
const first = nums.shift(); // first: 0, nums: [1, 2, 3]
```

`unshift()` adds to the beginning and returns the new length. `shift()` removes and returns the first element (`undefined` if empty). **Both mutate the array.**

---

## 5. Sorting and reversing

### `sort(compareFn?)`

Sorts the original array. By default, values are sorted as strings, so use a comparator for numeric sorting.

```ts
const nums = [30, 5, 100, 20];
nums.sort((a, b) => a - b); // nums: [5, 20, 30, 100]
```

Descending order:

```ts
nums.sort((a, b) => b - a);
```

**Returns:** The same array reference. **Mutates?** Yes.

### `toSorted(compareFn?)`

Returns a sorted copy; the original array is unchanged.

```ts
const nums = [30, 5, 100, 20];
const sorted = nums.toSorted((a, b) => a - b);
// sorted: [5, 20, 30, 100]
// nums:   [30, 5, 100, 20]
```

### `reverse()`

Reverses the original array in place.

```ts
const nums = [1, 2, 3];
nums.reverse(); // nums: [3, 2, 1]
```

### `toReversed()`

Returns a reversed copy without changing the original.

```ts
const nums = [1, 2, 3];
const reversed = nums.toReversed();
// reversed: [3, 2, 1]
// nums:     [1, 2, 3]
```

---

## 6. Flattening and filling

### `flat(depth?)`

Flattens nested arrays by the specified depth. The default depth is `1`.

```ts
[1, [2, 3], [4, [5]]].flat(); // [1, 2, 3, 4, [5]]
[1, [2, 3], [4, [5]]].flat(2); // [1, 2, 3, 4, 5]
[1, [2, [3]]].flat(Infinity); // [1, 2, 3]
```

**Returns:** New array. **Mutates?** No.

### `fill(value, start?, end?)`

Fills a range in the original array with the same value.

```ts
const nums = [1, 2, 3, 4];
nums.fill(0, 1, 3);
// nums: [1, 0, 0, 4]
```

The start index is included; the end index is excluded. **Mutates?** Yes.

### `copyWithin(target, start, end?)`

Copies part of an array to another position within the same array. It does not change the array's length.

```ts
const nums = [1, 2, 3, 4, 5];
nums.copyWithin(0, 3);
// nums: [4, 5, 3, 4, 5]
```

**Mutates?** Yes. This is less common in everyday application code.

---

## 7. Conversion and iteration helpers

### `join(separator?)`

Combines array elements into a string. The default separator is a comma.

```ts
["red", "green", "blue"].join(" - "); // "red - green - blue"
[1, 2, 3].join(); // "1,2,3"
```

**Returns:** `string`. **Mutates?** No.

### `toString()`

Returns a string representation of the array, generally by joining its elements with commas.

```ts
[1, 2, 3].toString(); // "1,2,3"
```

### `toLocaleString(locales?, options?)`

Converts array elements to locale-sensitive strings and joins them, usually with commas. The exact output can depend on locale and element types.

```ts
[1000, new Date()].toLocaleString();
```

### `keys()`

Returns an iterator over the array's indexes.

```ts
const iterator = ["a", "b"].keys();
console.log([...iterator]); // [0, 1]
```

### `values()`

Returns an iterator over the array's values.

```ts
const iterator = ["a", "b"].values();
console.log([...iterator]); // ["a", "b"]
```

### `entries()`

Returns an iterator of `[index, value]` pairs.

```ts
const iterator = ["a", "b"].entries();
console.log([...iterator]); // [[0, "a"], [1, "b"]]
```

### `[Symbol.iterator]()`

The default array iterator; it behaves like `values()` in standard arrays. This is why you can use arrays in `for...of` loops.

```ts
for (const value of [10, 20, 30]) {
  console.log(value);
}
```

---

## 8. Static `Array` methods

Static methods are called on `Array`, not on an existing array instance.

### `Array.isArray(value)`

Checks whether a value is an array.

```ts
Array.isArray([1, 2]); // true
Array.isArray("text"); // false
```

### `Array.from(iterableOrArrayLike, mapFn?)`

Creates a new array from an iterable or array-like value. It can optionally map each value during creation.

```ts
Array.from("cat"); // ["c", "a", "t"]
Array.from([1, 2, 3], (n) => n * 2); // [2, 4, 6]
```

### `Array.of(...items)`

Creates an array from the supplied arguments.

```ts
Array.of(3); // [3]
Array.of(1, 2, 3); // [1, 2, 3]
```

This differs from `Array(3)`, which creates an array with length `3` and empty slots.

### `Array.fromAsync(source, mapFn?)`

Creates a new array from an async iterable, iterable, or array-like source, consuming asynchronous values where needed. It returns a `Promise`.

```ts
async function example(): Promise<void> {
  const result = await Array.fromAsync([
    Promise.resolve(1),
    Promise.resolve(2),
  ]);
  console.log(result); // [1, 2]
}
```

**Compatibility note:** Check that your Node.js/browser runtime and TypeScript library definitions support `Array.fromAsync()` before using it.

---

## 9. Array properties and constructor

| Property / constructor  | Purpose                                                                        | Example                                             |
| ----------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------- |
| `length`                | Number of array slots, including empty slots                                   | `[10, 20, 30].length` → `3`                         |
| `Array()`               | Creates an array; behavior depends on the arguments                            | `Array(3)` creates a length-3 sparse array          |
| `Array[Symbol.species]` | Constructor hook used by certain built-in methods when creating derived arrays | Advanced topic; usually not needed in everyday code |

Prefer array literals for ordinary arrays:

```ts
const nums: number[] = [1, 2, 3];
const empty: number[] = [];
```

---

## 10. Mutating vs non-mutating methods

### Methods that mutate the original array

- `copyWithin()`
- `fill()`
- `pop()`
- `push()`
- `reverse()`
- `shift()`
- `sort()`
- `splice()`
- `unshift()`

### Methods that return a new array or a derived result without mutating the array

- `at()`
- `concat()`
- `entries()`
- `every()`
- `filter()`
- `find()`
- `findIndex()`
- `findLast()`
- `findLastIndex()`
- `flat()`
- `flatMap()`
- `forEach()`
- `includes()`
- `indexOf()`
- `join()`
- `keys()`
- `lastIndexOf()`
- `map()`
- `reduce()`
- `reduceRight()`
- `slice()`
- `some()`
- `toLocaleString()`
- `toString()`
- `toReversed()`
- `toSorted()`
- `toSpliced()`
- `values()`
- `with()`
- `Array.from()`, `Array.fromAsync()`, `Array.isArray()`, and `Array.of()` are static methods, not instance methods.

> A callback can still mutate an object or array that it accesses. “Non-mutating” means the built-in method itself does not edit the receiver array.

---

## 11. Common differences to memorize

| Pair                          | Main difference                                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `forEach()` vs `map()`        | `forEach()` is for actions and returns `undefined`; `map()` returns a transformed array.                                 |
| `map()` vs `filter()`         | `map()` transforms each item; `filter()` keeps items that pass a condition.                                              |
| `filter()` vs `find()`        | `filter()` returns all matches in an array; `find()` returns the first match or `undefined`.                             |
| `find()` vs `findIndex()`     | `find()` returns an element; `findIndex()` returns its index.                                                            |
| `some()` vs `every()`         | `some()` asks whether at least one item passes; `every()` asks whether all pass.                                         |
| `includes()` vs `indexOf()`   | `includes()` returns a boolean; `indexOf()` returns an index or `-1`. `includes()` can detect `NaN`; `indexOf()` cannot. |
| `slice()` vs `splice()`       | `slice()` copies a range without mutation; `splice()` changes the original array.                                        |
| `splice()` vs `toSpliced()`   | `splice()` mutates the original; `toSpliced()` returns an edited copy.                                                   |
| `sort()` vs `toSorted()`      | `sort()` mutates the original; `toSorted()` returns a sorted copy.                                                       |
| `reverse()` vs `toReversed()` | `reverse()` mutates the original; `toReversed()` returns a reversed copy.                                                |
| `push()` vs `unshift()`       | `push()` adds at the end; `unshift()` adds at the beginning.                                                             |
| `pop()` vs `shift()`          | `pop()` removes from the end; `shift()` removes from the beginning.                                                      |
| `concat()` vs `push()`        | `concat()` returns a new combined array; `push()` changes the original and returns its new length.                       |
| `flat()` vs `flatMap()`       | `flat()` flattens nested arrays; `flatMap()` first maps items and then flattens one level.                               |

---

## 12. TypeScript tip: types of array results

TypeScript infers result types from the array and callback, and checks them during development.

```ts
const prices: number[] = [100, 200, 300];

const labels: string[] = prices.map((price) => `₹${price}`);
const expensive: number[] = prices.filter((price) => price >= 200);
const total: number = prices.reduce((sum, price) => sum + price, 0);
const firstExpensive: number | undefined = prices.find((price) => price >= 200);
```

Notice that `find()` can return `undefined` if no element matches. That possibility is reflected in its TypeScript type and should be handled in code.

---

## 13. Official reference

- MDN — JavaScript `Array`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
- TypeScript Handbook — Everyday Types: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
- TypeScript Handbook — Modules Reference: https://www.typescriptlang.org/docs/handbook/modules/reference.html

<!--

 -->

## Tuple

- You can specify the type of a particular element strictly

## What is a Tuple in TypeScript?

A tuple is a special type of array in TypeScript in which you specify the type of each element at a particular position.

Unlike a normal array, where all elements generally share the same type, a tuple can contain different types in a defined order.

## 1. Basic example

```ts
let person: [string, number, boolean];

person = ["Osheen", 21, true]; // ✅ Valid

// person = [21, "Osheen", true]; // ❌ Error
// person = ["Osheen", 21];       // ❌ Error
```

Here:

- Index `0` must contain a `string`.
- Index `1` must contain a `number`.
- Index `2` must contain a `boolean`.

The order matters!

## 2. Tuple vs normal array

```ts
// Normal array
let numbers: number[] = [10, 20, 30];

// Tuple
let user: [string, number] = ["Osheen", 21];
```

| Feature            | Normal array                     | Tuple                                                                |
| ------------------ | -------------------------------- | -------------------------------------------------------------------- |
| Types              | Usually one element type         | Can have different types at different positions                      |
| Order              | Elements generally share a type  | Each position has a defined type                                     |
| Length             | Can vary freely                  | Defined by the tuple type, unless optional or rest elements are used |
| Accessing elements | Returns the array's element type | Returns the type associated with that position                       |

## 3. Accessing tuple elements

```ts
let user: [string, number] = ["Osheen", 21];

console.log(user[0]); // "Osheen"
console.log(user[1]); // 21

let name: string = user[0];
let age: number = user[1];
```

TypeScript knows the type of each position, so it can catch type errors before runtime.

## 4. Real-world example

Tuples are useful when a function needs to return multiple related values in a fixed order.

```ts
function getUser(): [string, number] {
  return ["Osheen", 21];
}

const [name, age] = getUser();

console.log(name); // Osheen
console.log(age); // 21
```

Another common example is representing a coordinate:

```ts
let point: [number, number] = [10, 20];
```

The first number represents the X coordinate and the second represents the Y coordinate.

## 5. Optional and rest elements

Tuples can also support optional positions and rest elements.

```ts
// Optional element
let user: [string, number?];

user = ["Osheen"];
user = ["Osheen", 21];

// Rest element
let scores: [string, ...number[]];

scores = ["Maths", 90, 85, 95];
```

In the first tuple, the age is optional. In the second, the first value must be a string, followed by zero or more numbers.

## 6. Read-only tuple

Use `readonly` when you don't want tuple elements to be reassigned or mutated through that tuple reference.

```ts
const point: readonly [number, number] = [10, 20];

// point[0] = 50; // ❌ Error
// point.push(30); // ❌ Error
```

One important detail: tuples provide compile-time type checking, not runtime validation. TypeScript types are removed when the code is compiled into JavaScript.

## Remember this

Array: `string[]` means a collection of strings.

Tuple: `[string, number]` means a string at position 0 followed by a number at position 1.

A tuple is useful when the position and type of each value have a specific meaning.

<!--
 -->

## Objects

What is an Object in TypeScript?
An object in TypeScript is a collection of properties that store data in the form of key-value pairs.

Just like JavaScript, an object can contain strings, numbers, booleans, arrays, functions, and even other objects.

The main difference is that TypeScript allows you to define the types of an object's properties, so it can detect invalid values before runtime.

1. Basic object in JavaScript vs TypeScript

JavaScript:

```js
const user = {
  name: "Osheen",
  age: 21,
  isStudent: true,
};
```

TypeScript:

```ts
const user: {
  name: string;
  age: number;
  isStudent: boolean;
} = {
  name: "Osheen",
  age: 21,
  isStudent: true,
};
```

Here, we've defined the type of every property.
Property - Type
name - string
age - number
isStudent - boolean

Now TypeScript checks whether the values assigned to these properties match their declared types.
user.name = "Rahul"; // ✅ Valid
user.age = 25; // ✅ Valid

// user.age = "25"; // ❌ Error
// user.name = 100; // ❌ Error

2. Why do we need object types?
   Suppose you're developing a user registration application.

You want every user to have a name, email, age, and account status.

Without TypeScript, JavaScript doesn't enforce a particular structure for the object.

With TypeScript, you can define the expected structure.

```ts
const user: {
  name: string;
  email: string;
  age: number;
  isActive: boolean;
} = {
  name: "Osheen",
  email: "osheen@gmail.com",
  age: 21,
  isActive: true,
};
```

Now TypeScript checks:

- Whether all required properties exist.
- Whether their values have the correct types.
- Whether you're accessing properties using valid types.

3. Optional properties (?)
   Sometimes an object doesn't need to contain every property.

For example, a user might not have a phone number.

You can make a property optional using ?.

```ts
type User = {
  name: string;
  age: number;
  email?: string;
};

const user1: User = {
  name: "Osheen",
  age: 21,
};

const user2: User = {
  name: "Rahul",
  age: 24,
  email: "rahul@gmail.com",
};
```

Both objects are valid.

Remember:

- email: string → Required property.
- email?: string → Optional property. It can be missing or contain a string.
  When accessing an optional property, its value may be undefined.

4. Readonly properties
   Sometimes you want to prevent a property from being reassigned after an object is created.

Use readonly.

```ts
type User = {
  readonly id: number;
  name: string;
};

const user: User = {
  id: 101,
  name: "Osheen",
};
```

user.name = "Rahul"; // ✅ Valid

// user.id = 102; // ❌ Error

readonly prevents reassignment through that property. It doesn't make nested objects deeply immutable.

5. Nested objects
   An object can contain another object as a property.

For example, a user can have an address.

```ts
type User = {
  name: string;
  age: number;

  address: {
    city: string;
    state: string;
    pincode: number;
  };
};

const user: User = {
  name: "Osheen",
  age: 21,

  address: {
    city: "Delhi",
    state: "Delhi",
    pincode: 110001,
  },
};
```

console.log(user.address.city);

This is especially useful when designing API responses and database structures. 6. Object containing arrays
You can also define arrays inside objects.

```ts
type User = {
  name: string;
  skills: string[];
  marks: number[];
};

const user: User = {
  name: "Osheen",
  skills: ["JavaScript", "TypeScript", "React"],
  marks: [85, 90, 95],
};
```

7. Object containing functions.
   Objects can also contain methods.

```ts
type User = {
  name: string;
  greet: () => string;
};
```

```ts
const user: User = {
  name: "Osheen",
  greet() {
    return `Hello, ${this.name}`;
  },
};

console.log(user.greet());
```

Here, greet: () => string describes a function that returns a string. 8. Two ways to define object structures: type vs interface
In TypeScript, you'll frequently encounter both.

Using type:

```ts
type User = {
  name: string;
  age: number;
};

const user: User = {
  name: "Osheen",
  age: 21,
};
```

```ts
Using interface:
interface User {
name: string;
age: number;
}

const user: User = {
name: "Osheen",
age: 21
};
```

Both can describe object structures.
Feature type interface
Define object structure Yes Yes
Optional properties Yes Yes
Readonly properties Yes Yes
Extend another structure Using intersections (&) Using extends
Union types Yes No, not directly
Declaration merging No Yes

For now, understand both. We'll explore their differences in more depth later.

9. Index signatures
   What happens when you don't know the property names in advance, but you know what type their values should have?

Use an index signature.

```ts
type Scores = {
  [subject: string]: number;
};

const marks: Scores = {
  maths: 90,
  physics: 85,
  chemistry: 95,
};
```

This means the object can have string keys, and their values must be numbers.

Another useful utility type is **Record**:

```ts
type Scores = Record<string, number>;

const marks: Scores = {
  maths: 90,
  physics: 85,
};
```

Both express a similar object structure.

10. Important distinction: object vs {} vs Object
    These three are not interchangeable in TypeScript.
    Type Meaning
    object Any non-primitive value, such as arrays, functions, and objects
    {} Any non-nullish value, including strings and numbers
    Object Broad JavaScript object type; generally avoid using it as a type

Example:
let a: object;

a = { name: "Osheen" }; // ✅
a = [1, 2, 3]; // ✅
a = "Hello"; // ❌
a = 21; // ❌

For most application development, prefer explicitly defining the properties your object should contain instead of using the broad object type. 11. Quick revision
Concept Syntax
Object type { name: string }
Optional property age?: number
Readonly property readonly id: number
Nested object address: { city: string }
Array in object skills: string[]
Function in object greet: () => string
Interface interface User { ... }
Type alias type User = { ... }
Index signature [key: string]: number
Record Record<string, number>

<!--
<!--
 -->

-->

## Interface vs Type in TypeScript

Both `interface` and `type` are used to define the structure and shape of data in TypeScript.

The biggest difference is:

- `interface` is primarily used to define object structures that can be extended and reopened.
- `type` is more flexible. It can define objects, unions, tuples, primitive aliases, function types, and more.

Let's understand the differences with examples.

## 1. Basic syntax

### Using `interface`

```ts
interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = {
  name: "Osheen",
  age: 21,
  email: "osheen@gmail.com",
};
```

### Using `type`

```ts
type User = {
  name: string;
  age: number;
  email: string;
};

const user: User = {
  name: "Osheen",
  age: 21,
  email: "osheen@gmail.com",
};
```

Both work exactly the same for this basic object structure.

## 2. Main differences

| Feature                    | Interface        | Type               |
| -------------------------- | ---------------- | ------------------ |
| Define object structure    | Yes              | Yes                |
| Optional properties        | Yes              | Yes                |
| Readonly properties        | Yes              | Yes                |
| Extend another type        | `extends`        | `&` (intersection) |
| Extend multiple structures | Yes              | Yes, using `&`     |
| Union types                | No, not directly | Yes                |
| Primitive aliases          | No               | Yes                |
| Tuples                     | No, not directly | Yes                |
| Function types             | Yes              | Yes                |
| Declaration merging        | Yes              | No                 |
| Mapped types               | No, not directly | Yes                |
| Conditional types          | No               | Yes                |

Let's understand the three most important differences.

## 3. Difference 1: Declaration merging

This is one of the most important differences.

Interface supports declaration merging.

It means you can declare the same interface multiple times, and TypeScript combines their properties.

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}

const user: User = {
  name: "Osheen",
  age: 21,
};
```

Both declarations are merged into one interface.

The resulting structure is:

```ts
interface User {
  name: string;
  age: number;
}
```

Can we do the same with `type`?

No.

```ts
type User = {
  name: string;
};

// ❌ Error: Duplicate identifier 'User'
type User = {
  age: number;
};
```

A type alias cannot be redeclared in the same scope.

When is declaration merging useful?

It is particularly useful when extending existing library or framework types, such as augmenting Express request types or adding custom properties to existing interfaces.

## 4. Difference 2: Union types

This is where `type` becomes more powerful.

A union means a value can have one of several possible types.

```ts
type Status = "success" | "error" | "loading";

let currentStatus: Status;

currentStatus = "success"; // ✅
currentStatus = "error"; // ✅
currentStatus = "loading"; // ✅

// currentStatus = "pending"; // ❌ Error
```

You cannot directly define this kind of union using an interface.

Another example:

```ts
type ID = string | number;

let userId: ID;

userId = 101; // ✅
userId = "USER101"; // ✅
```

This is why `type` is useful when defining multiple possible values.

## 5. Difference 3: Extending and composition

Both can reuse existing structures.

### Interface using `extends`

```ts
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  salary: number;
}

const employee: Employee = {
  name: "Osheen",
  age: 21,
  employeeId: 101,
  salary: 50000,
};
```

Here, `Employee` inherits all properties of `Person` and adds its own properties.

### Type using intersection (`&`)

```ts
type Person = {
  name: string;
  age: number;
};

type Employee = Person & {
  employeeId: number;
  salary: number;
};
```

The `&` operator combines both structures.

The result is effectively:

```ts
type Employee = {
  name: string;
  age: number;
  employeeId: number;
  salary: number;
};
```

Both approaches work.

An important difference: If two interfaces extend structures containing incompatible property types, TypeScript generally reports an error. With intersections, conflicting properties can instead become `never`.

## 6. Where should you use Interface and where should you use Type?

This is the most important practical part.

### Use `interface` for:

1\. Object structures

```ts
interface User {
  id: number;
  name: string;
  email: string;
}
```

2\. Class contracts

```ts
interface Payment {
  amount: number;
  pay(): void;
}

class CreditCardPayment implements Payment {
  amount = 1000;

  pay(): void {
    console.log("Payment successful");
  }
}
```

3\. Extendable application models

```ts
interface BaseUser {
  id: number;
  name: string;
}

interface Admin extends BaseUser {
  permissions: string[];
}
```

4\. Library and framework type augmentation

For example, adding a custom user property to Express's request interface.

### Use `type` for:

1\. Union types

```ts
type Status = "pending" | "success" | "failed";
```

2\. Primitive aliases

```ts
type UserID = string | number;
```

3\. Tuples

```ts
type Coordinates = [number, number];
```

4\. Function signatures

```ts
type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b;
```

5\. Utility and advanced types

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UserPreview = Pick<User, "id" | "name">;

type OptionalUser = Partial<User>;

type UserWithoutEmail = Omit<User, "email">;
```

## 7. Practical example: Building a user application

Imagine you're creating a user management application.

You can use both together:

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UserRole = "admin" | "user" | "moderator";

interface UserAccount extends User {
  role: UserRole;
  isActive: boolean;
}

const account: UserAccount = {
  id: 101,
  name: "Osheen",
  email: "osheen@gmail.com",
  role: "admin",
  isActive: true,
};
```

Here:

- `User` defines the basic object structure.
- `UserRole` defines the allowed role values.
- `UserAccount` extends the user structure and adds more properties.

This is a perfectly reasonable way to combine both.

## 8. My recommendation for real projects

| Situation                        | Recommended                            |
| -------------------------------- | -------------------------------------- |
| Defining an object's structure   | `interface`                            |
| Defining React component props   | Either; `interface` is a common choice |
| Defining API response structures | Either; `interface` is a common choice |
| Defining union types             | `type`                                 |
| Defining tuples                  | `type`                                 |
| Defining function signatures     | `type` (often convenient)              |
| Using `Pick`, `Omit`, `Partial`  | `type`                                 |
| Extending library declarations   | `interface`                            |
| Defining class contracts         | `interface`                            |

My rule of thumb:

- Start with `interface` when defining an object or class contract.
- Use `type` when you need unions, intersections, tuples, utility types, or other advanced type operations.
- Don't unnecessarily mix them when one is sufficient.

There is no universal rule requiring you to use one over the other. Both are widely used in production TypeScript applications.

One concept to remember: `interface` and `type` both describe types; neither creates an actual JavaScript object or performs runtime validation. They are TypeScript compile-time features.

<!--
 -->

## What are Enums in TypeScript?

An Enum (Enumeration) in TypeScript is a feature that allows you to define a set of named constants.

Instead of using multiple hardcoded values throughout your application, you define a collection of meaningful names and use them wherever required.

Enums are particularly useful when a variable can have only a fixed set of possible values.

## 1. Why do we need Enums?

Imagine you're developing an e-commerce application.

An order can have only four statuses:

- Pending
- Processing
- Shipped
- Delivered

Without enums, you might write:

```ts
let orderStatus = "pending";

orderStatus = "shipped";
orderStatus = "delivered";
```

The problem is that you can accidentally assign an invalid value:

```ts
orderStatus = "delivred"; // Typo!
```

TypeScript won't catch this if `orderStatus` is simply inferred as `string`.

With an enum, you can restrict the allowed values.

## 2. Creating an Enum

Use the `enum` keyword.

```ts
enum OrderStatus {
  Pending,
  Processing,
  Shipped,
  Delivered,
}
```

Using this enum:

```ts
let status: OrderStatus;

status = OrderStatus.Pending; // Valid
status = OrderStatus.Shipped; // Valid

// status = "Delivered";         // Error
// status = 10;                   // Error
```

Here, `OrderStatus.Pending` is a named enum member.

Important: By default, numeric enums start at `0` and increment automatically.

| Enum member | Value |
| ----------- | ----- |
| Pending     | 0     |
| Processing  | 1     |
| Shipped     | 2     |
| Delivered   | 3     |

## 3. String Enums

Instead of automatically assigning numbers, you can assign string values manually.

```ts
enum OrderStatus {
  Pending = "PENDING",
  Processing = "PROCESSING",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
}
```

Usage:

```ts
let status: OrderStatus;

status = OrderStatus.Pending;
status = OrderStatus.Delivered;

console.log(status); // DELIVERED
```

| Member       | Value          |
| ------------ | -------------- |
| `Pending`    | `"PENDING"`    |
| `Processing` | `"PROCESSING"` |
| `Shipped`    | `"SHIPPED"`    |
| `Delivered`  | `"DELIVERED"`  |

Why use string enums?

Suppose you're sending an order status to a backend API.

A value like `"SHIPPED"` is more meaningful in API requests and debugging than a numeric value like `2`.

Unlike numeric enums, string enums do not automatically assign values.

## 4. Explicit Numeric Enums

You can manually assign numeric values.

```ts
enum Status {
  Pending = 10,
  Processing = 20,
  Shipped = 30,
  Delivered = 40,
}

console.log(Status.Pending); // 10
console.log(Status.Delivered); // 40
```

You can also mix manual initialization with automatic increments:

```ts
enum Status {
  Pending = 1,
  Processing, // 2
  Shipped, // 3
  Delivered, // 4
}
```

This is useful when the numeric values have a specific meaning or are defined by an external system.

## 5. Enums as Function Parameters and Return Types

Enums can be used as types in functions.

```ts
enum PaymentStatus {
  Pending = "PENDING",
  Success = "SUCCESS",
  Failed = "FAILED",
}

function makePayment(status: PaymentStatus): void {
  console.log(`Payment status: ${status}`);
}

makePayment(PaymentStatus.Success);
makePayment(PaymentStatus.Failed);

// makePayment("SUCCESS"); // Error
```

You can also return an enum from a function.

```ts
function getPaymentStatus(): PaymentStatus {
  return PaymentStatus.Success;
}
```

This ensures that the function returns one of the permitted enum members.

## 6. Enum with Switch Statements

This is one of the practical use cases.

```ts
enum OrderStatus {
  Pending = "PENDING",
  Processing = "PROCESSING",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
}

function trackOrder(status: OrderStatus): void {
  switch (status) {
    case OrderStatus.Pending:
      console.log("Your order is waiting for confirmation");
      break;

    case OrderStatus.Processing:
      console.log("Your order is being prepared");
      break;

    case OrderStatus.Shipped:
      console.log("Your order is on the way");
      break;

    case OrderStatus.Delivered:
      console.log("Your order has been delivered");
      break;
  }
}

trackOrder(OrderStatus.Shipped);
```

This is useful for:

- Payment status management.
- Order status management.
- User roles and permissions.
- Application states.
- Logging levels.

## 7. Reverse Mapping in Numeric Enums

This is an interesting feature of numeric enums.

You can get the enum member's name using its numeric value.

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

console.log(Direction.Up); // 0
console.log(Direction[0]); // Up
console.log(Direction[2]); // Left
```

Numeric enums support reverse mapping.

However, string enums do not.

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
}

console.log(Direction.Up); // UP

// Direction["UP"] does not return "Up"
```

This difference comes from how TypeScript generates JavaScript for numeric and string enums.&#x20;

## 8. Const Enums

TypeScript also provides `const enum`.

```ts
const enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const movement = Direction.Up;
```

The compiler replaces enum references with their actual values during compilation.

Conceptually, the generated JavaScript becomes:

```ts
const movement = 0;
```

Unlike regular enums, `const enum` does not generate a runtime enum object.

## 9. Enum vs Union Type — Which should you use?

This is particularly important in modern TypeScript development.

You don't always need an enum to represent a fixed set of values.

You can achieve a similar result using a union type.

### Using Enum

```ts
enum Role {
  Admin = "ADMIN",
  User = "USER",
  Manager = "MANAGER",
}

let userRole: Role = Role.Admin;
```

### Using Union Type

```ts
type Role = "ADMIN" | "USER" | "MANAGER";

let userRole: Role = "ADMIN";
```

Both restrict the allowed values, but they work differently.

| Feature                         | Enum                   | Union Type     |
| ------------------------------- | ---------------------- | -------------- |
| Fixed values                    | Yes                    | Yes            |
| Type checking                   | Yes                    | Yes            |
| Creates runtime object          | Yes, for regular enums | No             |
| Auto-incrementing values        | Yes, numeric enums     | No             |
| Works with strings              | Yes                    | Yes            |
| Runtime access to named members | Yes                    | No             |
| JavaScript output               | Generates enum object  | Type is erased |

### Another modern approach: `as const`

You can also use an object with `as const`.

```ts
const Role = {
  Admin: "ADMIN",
  User: "USER",
  Manager: "MANAGER",
} as const;

type Role = (typeof Role)[keyof typeof Role];

let userRole: Role = Role.Admin;
```

Here:

- `Role` is a JavaScript object available at runtime.
- `as const` preserves literal values instead of widening them to `string`.
- `typeof Role` obtains the object's type.
- `keyof typeof Role` obtains its property names.
- `typeof Role[keyof typeof Role]` obtains the union of its values.

This approach gives you runtime access to named values along with a union type.

## 10. What should you use in real projects in 2026?

My recommendation:

| Requirement                               | Recommended approach              |
| ----------------------------------------- | --------------------------------- |
| Fixed string values                       | Union type                        |
| Need a runtime collection of named values | `as const` object                 |
| Numeric constant values                   | Numeric enum or `as const` object |
| Existing library uses enums               | Use its enums                     |
| Need automatic numeric incrementing       | Numeric enum                      |
| Simple API status and roles               | String union or `as const` object |

TypeScript's official documentation also discusses `as const` objects as an alternative to enums.&#x20;

## 11. Quick revision

| Concept            | Syntax                                |
| ------------------ | ------------------------------------- | ---------- |
| Enum declaration   | `enum Status {}`                      |
| Numeric enum       | `enum Status { Pending, Success }`    |
| String enum        | `enum Status { Pending = "PENDING" }` |
| Explicit values    | `enum Status { Pending = 10 }`        |
| Access enum value  | `Status.Pending`                      |
| Use enum as type   | `let status: Status`                  |
| Const enum         | `const enum Status {}`                |
| Union alternative  | `type Status = "PENDING" \\           | "SUCCESS"` |
| Object alternative | `const Status = { ... } as const`     |

Final takeaway: An enum gives meaningful names to a fixed set of values. Learn numeric enums, string enums, and their runtime behavior. Then understand union types and `as const`, because you'll encounter all three approaches in real-world TypeScript projects.

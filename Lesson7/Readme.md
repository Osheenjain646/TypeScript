# Index Signature and `keyof` in TypeScript

Both Index Signatures and the `keyof` operator are used when working with object types in TypeScript, especially when object property names are dynamic or not known beforehand.

They solve two different problems:

- Index Signature: Defines the type of values an object can store under dynamically named properties.
- `keyof`: Extracts the property names of an existing object type and turns them into a union of literal types.

Let's understand them with practical examples.

## 1. What is an Index Signature?

An Index Signature allows you to define the type of values an object can contain when you don't know all its property names in advance.

### Normal object

Suppose you have an object storing subject marks:

```ts
type Marks = {
  maths: number;
  physics: number;
  chemistry: number;
};
```

Here, you explicitly define every property.

But what happens when you don't know the property names beforehand?

For example, a user can add any number of subjects.

### Using Index Signature

```ts
type Marks = {
  [key: string]: number;
};

const studentMarks: Marks = {
  maths: 90,
  physics: 85,
  chemistry: 95,
  biology: 88,
};
```

Here:

```ts
[key: string]: number;
```

Means:

- `key` represents an object property name.
- `string` means property names must be strings.
- `number` means property values must be numbers.

You can add as many string-named properties as required, provided their values are numbers.

### Different types of Index Signatures

A. String index signature

```ts
interface UserScores {
  [key: string]: number;
}

const scores: UserScores = {
  osheen: 90,
  rahul: 85,
  aman: 95,
};
```

B. Number index signature

Useful when accessing values through numeric indexes.

```ts
interface StringArray {
  [index: number]: string;
}

const names: StringArray = ["Osheen", "Rahul", "Aman"];

console.log(names[0]); // Osheen
```

C. Readonly index signature

Prevents assigning new values through the index signature.

```ts
interface Scores {
  readonly [key: string]: number;
}

const marks: Scores = {
  maths: 90,
  physics: 85,
};

// marks.maths = 95; // Error
```

D. Multiple value types

You can allow more than one value type using a union.

```ts
interface UserData {
  [key: string]: string | number | boolean;
}

const user: UserData = {
  name: "Osheen",
  age: 21,
  isActive: true,
};
```

Important rule

When you use a string index signature, explicitly declared properties must also have values compatible with the index signature.

```ts
interface User {
  [key: string]: number;

  age: number; // Valid
  // name: string; // Error
}
```

## 2. What is `keyof` in TypeScript?

The `keyof` operator takes an existing object type and produces a union of its property names.

Consider:

```ts
type User = {
  name: string;
  age: number;
  email: string;
};
```

Now use `keyof`:

```ts
type UserKeys = keyof User;
```

The resulting type is:

```ts
type UserKeys = "name" | "age" | "email";
```

This means `UserKeys` can only contain one of these three values.

```ts
let key: UserKeys;

key = "name"; // Valid
key = "age"; // Valid
key = "email"; // Valid

// key = "address"; // Error
```

In simple words: `keyof User` extracts all the property names from the `User` type.

### Visual understanding

User object type

```ts
type User = {
  name: string;
  age: number;
  email: string;
};
```

keyof User

Union of keys

```ts
type UserKeys = "name" | "age" | "email";
```

### 3. Using `keyof` with `typeof`

This is particularly useful when you already have a JavaScript object and want to extract its keys.

```ts
const user = {
  name: "Osheen",
  age: 21,
  email: "osheen@gmail.com",
};

type UserKeys = keyof typeof user;
```

Here:

- `typeof user` extracts the object's TypeScript type.
- `keyof` extracts the keys from that type.

Result:

```ts
type UserKeys = "name" | "age" | "email";
```

Remember the difference:

| Operator            | Purpose                               |
| ------------------- | ------------------------------------- |
| `typeof user`       | Gets the type of the variable `user`. |
| `keyof User`        | Gets the keys of the type `User`.     |
| `keyof typeof user` | Gets the keys of the variable's type. |

## 4. What is `as keyof`? (Keyof assertion)

This is probably what you mean by keyof assertion.

Suppose you want to access an object property dynamically using a variable.

```ts
const user = {
  name: "Osheen",
  age: 21,
  email: "osheen@gmail.com",
};

const key = "name";

console.log(user[key]);
```

This particular example works because TypeScript can infer `key` as the literal type `"name"`.

But suppose the key comes from a function or a general string variable:

```ts
const key: string = "name";

// console.log(user[key]); // Error
```

Why?

Because `string` could be anything:

```ts
"name";
"age";
"email";
"address";
"anything";
```

TypeScript cannot guarantee that the string is a valid property of `user`.

You can use a type assertion:

```ts
console.log(user[key as keyof typeof user]);
```

Here:

- `keyof typeof user` produces `"name" | "age" | "email"`.
- `as` tells TypeScript to treat `key` as one of those permitted keys.

Important: `as keyof` is a type assertion, not runtime validation. It does not check whether the property actually exists.

For untrusted dynamic input, validate the key before accessing it.

## 5. Practical use of `keyof` with Generics

This is one of the most important real-world uses of `keyof`.

Suppose you want to create a reusable function that gets any property from an object.

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

Let's understand the syntax:

| Syntax              | Meaning                                    |
| ------------------- | ------------------------------------------ |
| `T`                 | Type of the object                         |
| `K`                 | Type of the property key                   |
| `K extends keyof T` | K must be a valid key of T                 |
| `T[K]`              | Type of the value associated with that key |

Usage:

```ts
const user = {
  name: "Osheen",
  age: 21,
  email: "osheen@gmail.com",
};

const name = getProperty(user, "name");
// TypeScript infers string

const age = getProperty(user, "age");
// TypeScript infers number

// getProperty(user, "address"); // Error
```

Notice something important: the return type automatically changes based on the property you pass.

This is particularly useful when creating reusable utility functions, form handlers, and generic components.

## 6. Index Signature vs `keyof`

| Feature   | Index Signature                                       | `keyof`                          |
| --------- | ----------------------------------------------------- | -------------------------------- | ------ |
| Purpose   | Defines allowed dynamic property keys and value types | Extracts existing property names |
| Syntax    | `[key: string]: number`                               | `keyof User`                     |
| Used with | Object types                                          | Existing object types            |
| Main use  | Dynamic dictionaries                                  | Safe property access             |
| Example   | `Record<string, number>`                              | `"name" \\                       | "age"` |

One interesting interaction:

```ts
type Dictionary = {
  [key: string]: number;
};

type Keys = keyof Dictionary;
```

Here, `Keys` becomes `string | number`, because JavaScript object property keys can be accessed using strings or numbers.&#x20;

## 7. When should you use what?

Use Index Signatures when:

- You don't know object property names beforehand.
- You are creating dynamic dictionaries.
- You're storing dynamic configuration values.
- You're building key-value maps.

Use `keyof` when:

- You want to extract object property names.
- You want type-safe dynamic property access.
- You're writing generic utility functions.
- You're building reusable form components or object helpers.

## 8. Quick revision

```ts
// INDEX SIGNATURE
type Dictionary = {
  [key: string]: number;
};

// KEYOF
type User = {
  name: string;
  age: number;
};

type UserKeys = keyof User;
// "name" | "age"

// KEYOF + TYPEOF
const user = {
  name: "Osheen",
  age: 21,
};

type Keys = keyof typeof user;

// KEYOF ASSERTION
const key: string = "name";

const value = user[key as keyof typeof user];

// GENERIC KEYOF
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

Final takeaway:

- Index Signature = Defines what dynamically named properties an object can have.
- `keyof` = Extracts the keys of an existing type.
- `as keyof` = Tells TypeScript to treat a key as belonging to the allowed key union, without validating it at runtime.
- `T[K]` = Extracts the type of a particular property.

These concepts are especially important before moving into Generics, Mapped Types, Conditional Types, and Utility Types in TypeScript.

<!--

 -->

<!--
 -->

Your code is actually correct. The confusion comes from how TypeScript handles keys inside a `for...in` loop and how `Record` works.

Let's break it down.

## 1. What is happening in your code?

```ts
type Streams = "salary" | "bonus" | "sideHustle";

type Incomes = Record<Streams, number | string>;

const monthlyIncomes: Incomes = {
  salary: 5000000,
  bonus: 5000000,
  sideHustle: 10000000,
};

for (const key in monthlyIncomes) {
  console.log(`${key}: ${monthlyIncomes[key as keyof Incomes]}`);
}
```

First, understand this:

```ts
type Streams = "salary" | "bonus" | "sideHustle";
```

`Streams` is a union of three string literal types.

Then:

```ts
type Incomes = Record<Streams, number | string>;
```

Is equivalent to:

```ts
type Incomes = {
  salary: number | string;
  bonus: number | string;
  sideHustle: number | string;
};
```

Therefore:

```ts
keyof Incomes
```

Produces:

```ts
"salary" | "bonus" | "sideHustle";
```

## 2. Why do you need `as keyof Incomes`?

The problem is here:

```ts
for (const key in monthlyIncomes)
```

TypeScript considers `key` to be a `string`, not automatically the union of your object's known keys.

But your object expects one of these types:

```ts
"salary" | "bonus" | "sideHustle";
```

Therefore, you use:

```ts
monthlyIncomes[key as keyof Incomes];
```

This tells TypeScript to treat `key` as one of the valid keys.

Your assertion is correct for this object.

## 3. A cleaner approach using Object.keys()

You can write:

```ts
for (const key of Object.keys(monthlyIncomes) as (keyof Incomes)[]) {
  console.log(`${key}: ${monthlyIncomes[key]}`);
}
```

Here:

- `Object.keys()` gets the actual property names at runtime.
- `keyof Incomes` extracts the allowed keys at compile time.
- `as (keyof Incomes)[]` tells TypeScript that the resulting keys belong to that union.

## 4. Important: TypeScript types don't exist at runtime

You cannot do this:

```ts
console.log(Streams); // Error
console.log(Incomes); // Error
```

Why?

Because `Streams` and `Incomes` are type declarations. TypeScript removes these type declarations during compilation.

To access the actual keys, you need a runtime object:

```ts
console.log(Object.keys(monthlyIncomes));
```

Output:

```ts
["salary", "bonus", "sideHustle"];
```

## 5. Expected output of your code

```ts
salary: 5000000;
bonus: 5000000;
sideHustle: 10000000;
```

My recommendation: Your original solution using `key as keyof Incomes` is perfectly fine for this example. Just remember:

- `keyof` extracts keys at compile time.
- `Object.keys()` extracts keys at runtime.
- `as` is a type assertion; it does not perform runtime validation.

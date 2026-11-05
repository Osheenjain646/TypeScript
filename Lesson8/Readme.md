# Generics in TypeScript

Generics allow you to write reusable functions, classes, interfaces, and types that can work with different data types while maintaining type safety.

In simple words, instead of writing separate code for `string`, `number`, `boolean`, or objects, you write one reusable implementation that can accept different types.

Think of generics as a placeholder for a type that gets decided when you use the function or component.

## 1. Why do we need Generics?

Suppose you want to create a function that returns whatever value is passed to it.

Without generics, you might write separate functions:

```ts
function getNumber(value: number): number {
  return value;
}

function getString(value: string): string {
  return value;
}

function getBoolean(value: boolean): boolean {
  return value;
}
```

The problem is that you're writing almost identical functions repeatedly.

We can solve this using generics.

## 2. Basic Generic Syntax

```ts
function getValue<T>(value: T): T {
  return value;
}
```

Usage:

```ts
const num = getValue<number>(100);

const name = getValue<string>("Osheen");

const isActive = getValue<boolean>(true);
```

Output:

```ts
100;
("Osheen");
true;
```

Let's understand the syntax:

| Syntax               | Meaning                                         |
| -------------------- | ----------------------------------------------- |
| `<T>`                | Declares a generic type parameter               |
| `value: T`           | The parameter accepts the type represented by T |
| `: T`                | The function returns the same type              |
| `getValue<number>()` | Specifies T as number                           |

Important: `T` is not a special TypeScript keyword. It's just a naming convention for a type parameter. You could use `Type`, `Input`, or another meaningful name.

### Can TypeScript automatically identify the type?

Yes! This is called type inference.

You don't always need to explicitly pass the type.

```ts
function getValue<T>(value: T): T {
  return value;
}

const num = getValue(100);
const name = getValue("Osheen");
```

TypeScript automatically infers:

```ts
num; // number
name; // string
```

This is generally the preferred approach when the compiler can infer the type correctly.&#x20;

## 3. Generics vs `any`

This is one of the most important differences to understand.

Consider two functions:

Using `any`:

```ts
function identity(value: any): any {
  return value;
}

const result = identity("Hello");

result.toFixed(); // No TypeScript error
```

Here, TypeScript allows `toFixed()` even though the returned value is a string. This can lead to runtime errors.

Using Generics:

```ts
function identity<T>(value: T): T {
  return value;
}

const result = identity("Hello");

// result.toFixed(); // TypeScript error
result.toUpperCase(); // Valid
```

Why?

Because generics preserve the relationship between the input type and the return type.

| Feature                  | `any` | Generics   |
| ------------------------ | ----- | ---------- |
| Accepts different types  | Yes   | Yes        |
| Preserves the input type | No    | Yes        |
| Type safety              | Lost  | Maintained |
| Reusable                 | Yes   | Yes        |

Remember: Generics are not simply a replacement for `any`. They allow flexibility while preserving type information.

## 4. Generics with Arrays

Suppose you want to create a function that returns the first element of an array.

Without generics:

```ts
function getFirst(arr: any[]) {
  return arr[0];
}
```

The return type becomes `any`, so you lose useful type information.

Using generics:

```ts
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}
```

Usage:

```ts
const firstNumber = getFirst([10, 20, 30]);

const firstName = getFirst(["Osheen", "Rahul"]);

const firstBoolean = getFirst([true, false]);
```

Inferred return types:

```ts
firstNumber; // number | undefined
firstName; // string | undefined
firstBoolean; // boolean | undefined
```

Why `undefined`?

Because an array can be empty, in which case there is no first element.

This is a practical example of how generics preserve type information even when working with different arrays.&#x20;

## 5. Generics with Multiple Parameters

You can define multiple generic type parameters in one function.

```ts
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}
```

Usage:

```ts
const result1 = pair<string, number>("Osheen", 21);

const result2 = pair<number, boolean>(100, true);

const result3 = pair("Developer", 50000);
```

The inferred types are:

```ts
result1; // [string, number]
result2; // [number, boolean]
result3; // [string, number]
```

Here:

- `T` represents the first parameter's type.
- `U` represents the second parameter's type.
- Both types are independently inferred.

## 6. Generic Constraints (`extends`)

Sometimes you don't want a generic function to accept absolutely every type.

You want to restrict it to types that satisfy certain conditions.

For example, suppose you want to create a function that returns the length of a value.

```ts
function getLength<T>(value: T): number {
  return value.length; // Error
}
```

Why does this give an error?

Because TypeScript doesn't know whether `T` has a `length` property.

For example:

- Strings have `length`.
- Arrays have `length`.
- Numbers don't have `length`.

We can solve this using generic constraints.

```ts
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}
```

Usage:

```ts
getLength("Osheen"); // Valid
getLength([10, 20, 30]); // Valid
getLength({ length: 100 }); // Valid

// getLength(100);            // Error
```

Let's understand:

```ts
<T extends { length: number }>
```

It means:

T can be any type, provided it has a `length` property whose type is `number`.

Important: `extends` here means a type constraint. It doesn't necessarily mean class inheritance.

## 7. Generics with `keyof` (Connected to your previous topic)

You previously learned about:

- `keyof`
- Index signatures
- `Record`
- Type assertions

Now let's combine generics with `keyof`.

Suppose you have a user object:

```ts
const user = {
  name: "Osheen",
  age: 21,
  email: "osheen@gmail.com",
};
```

You want to create a reusable function that accepts:

1. An object.
2. A property of that object.
3. Returns the corresponding property value.

You can write:

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

Usage:

```ts
const name = getProperty(user, "name");

const age = getProperty(user, "age");

const email = getProperty(user, "email");
```

TypeScript infers:

```ts
name; // string
age; // number
email; // string
```

This will not work:

```ts
getProperty(user, "address"); // Error
```

Why?

Because `K extends keyof T` restricts the key to existing properties of the object.

Let's break down the generic function:

| Part                | Meaning                       |
| ------------------- | ----------------------------- |
| `T`                 | Type of the object            |
| `K`                 | Type of the property key      |
| `K extends keyof T` | K must be a valid key of T    |
| `T[K]`              | Type of the selected property |

This is one of the most useful real-world applications of generics. It is also an example covered in the official TypeScript handbook.&#x20;

## 8. Generics with Interfaces

You can also create generic interfaces.

Suppose you are developing an API and every API response contains:

- A success status.
- Some data.
- A message.

The data could be a user, product, order, or array.

Instead of creating separate interfaces for every API response, create one generic interface.

```ts
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
```

Now use it with different data types.

User response:

```ts
type User = {
  id: number;
  name: string;
};

const userResponse: ApiResponse<User> = {
  success: true,
  message: "User fetched successfully",
  data: {
    id: 1,
    name: "Osheen",
  },
};
```

Product response:

```ts
type Product = {
  id: number;
  price: number;
};

const productResponse: ApiResponse<Product[]> = {
  success: true,
  message: "Products fetched successfully",
  data: [
    { id: 1, price: 500 },
    { id: 2, price: 1000 },
  ],
};
```

Notice that we didn't create separate API response interfaces.

We reused the same `ApiResponse` interface by changing `T`.

## 9. Generics with Classes

Generics are also useful when creating reusable classes.

For example, let's create a `Box` class that can store any type of data.

```ts
class Box<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }
}
```

Usage:

```ts
const numberBox = new Box<number>(100);

const stringBox = new Box<string>("Osheen");

console.log(numberBox.getValue()); // 100

console.log(stringBox.getValue()); // Osheen
```

The same class works with different data types without losing type safety.

## 10. Generics in React (Important for Development)

Since you're working with React and Next.js, you'll frequently encounter generics.

For example, `useState` supports a generic type parameter.

```ts
import { useState } from "react";

type User = {
    name: string;
    age: number;
};

function App() {
    const [user, setUser] = useState<User | null>(null);

    return <div>{user?.name}</div>;
}
```

Here:

```ts
useState<User | null>(null);
```

Means the state can contain either:

- A `User` object.
- `null`.

Another common example is a reusable generic component or hook:

```ts
function useArray<T>(initialValue: T[]) {
  const [items, setItems] = useState<T[]>(initialValue);

  return { items, setItems };
}
```

Usage:

```ts
const numbers = useArray<number>([1, 2, 3]);

const names = useArray<string>(["Osheen", "Rahul"]);
```

One implementation works for both.

## 11. Generic Default Types

You can also provide a default type for a generic parameter.

```ts
interface ApiResponse<T = string> {
  data: T;
}
```

Now:

```ts
const response1: ApiResponse = {
  data: "Success",
};
```

Because the default type is `string`.

You can override it:

```ts
const response2: ApiResponse<number> = {
  data: 200,
};
```

This is useful when a generic type has a commonly used default but should still support other types.&#x20;

## 12. Quick revision: Generic syntax

| Concept                | Syntax                            |
| ---------------------- | --------------------------------- |
| Generic function       | `function test<T>(value: T): T`   |
| Multiple generics      | `function test<T, U>(a: T, b: U)` |
| Generic array          | `T[]`                             |
| Generic constraint     | `T extends SomeType`              |
| Generic with keyof     | `K extends keyof T`               |
| Property type lookup   | `T[K]`                            |
| Generic interface      | `interface ApiResponse<T> {}`     |
| Generic class          | `class Box<T> {}`                 |
| Default generic        | `interface Box<T = string> {}`    |
| Explicit type argument | `getValue<number>(10)`            |

## 13. Why and when should you use Generics?

This is the most important part to remember.

### Why use generics?

1\. Reusability

Write one function or component and use it with different data types.

2\. Type safety

Preserve the types of input and output instead of losing them through `any`.

3\. Flexibility

Allow functions, interfaces, and classes to work with different data structures.

4\. Better developer experience

Get accurate autocomplete, type checking, and compile-time error detection.

### When should you use generics?

| Situation                                      | Use generics?       | Example                          |
| ---------------------------------------------- | ------------------- | -------------------------------- | -------- |
| Same function works with different input types | Yes                 | `identity<T>()`                  |
| Reusable array utility                         | Yes                 | `getFirst<T>()`                  |
| API response structures                        | Yes                 | `ApiResponse<T>`                 |
| Reusable React hooks                           | Yes                 | `useArray<T>()`                  |
| Reusable classes                               | Yes                 | `Box<T>`                         |
| Dynamic object property access                 | Yes                 | `getProperty<T, K>()`            |
| Function accepts only a number                 | Usually no          | `calculateTotal(amount: number)` |
| Function accepts only a string                 | Usually no          | `formatName(name: string)`       |
| Several unrelated fixed values                 | Usually use a union | `"success" \\                    | "error"` |

My recommendation: Use generics when you want to preserve a relationship between types or reuse the same implementation across different types. Don't introduce generics just to make simple functions look advanced.

Official documentation: [TypeScript Handbook – Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html?utm_source=chatgpt.com).

Final takeaway: Generics are the foundation for writing reusable TypeScript. Pay particular attention to `T`, `extends`, `keyof`, and `T[K]`. Once you understand these four concepts, advanced topics such as generic utility functions, mapped types, conditional types, and reusable React hooks become much easier.

<!--
 -->

<!--
 -->

## Double Negation

`!!arg` is used to convert any value into a Boolean (`true` or `false`) based on its truthiness.

It is called double negation in JavaScript.

## 1. How does `!!` work?

Let's understand it step by step.

```ts
const value = 100;

console.log(!value); // false
console.log(!!value); // true
```

- First `!` converts the value to a Boolean and reverses its truthiness.
- Second `!` reverses it again, giving you the original truthiness as a Boolean.

Therefore:

```ts
!!value === Boolean(value);
```

Both produce the same result.

## 2. Examples

| Value       | `!value` | `!!value` |
| ----------- | -------- | --------- |
| `100`       | `false`  | `true`    |
| `0`         | `true`   | `false`   |
| `"Hello"`   | `false`  | `true`    |
| `""`        | `true`   | `false`   |
| `true`      | `false`  | `true`    |
| `false`     | `true`   | `false`   |
| `null`      | `true`   | `false`   |
| `undefined` | `true`   | `false`   |
| `NaN`       | `true`   | `false`   |
| `{}`        | `false`  | `true`    |
| `[]`        | `false`  | `true`    |

Important: Empty arrays and empty objects are truthy in JavaScript.

## 3. Understanding it in your code

You wrote:

```ts
return { arg, is: !!arg };
```

This means:

- If `arg` is truthy, `is` becomes `true`.
- If `arg` is falsy, `is` becomes `false`.

For example:

```ts
isTrue(10);
// { arg: 10, is: true }

isTrue(0);
// { arg: 0, is: false }

isTrue("");
// { arg: "", is: false }

isTrue(null);
// { arg: null, is: false }
```

Your earlier conditions specifically handle empty arrays and empty objects because JavaScript considers both truthy.

```ts
if (Array.isArray(arg) && !arg.length) {
  return { arg, is: false };
}
```

```ts
if (isObj(arg) && !Object.keys(arg as keyof T).length) {
  return { arg, is: false };
}
```

These checks ensure that empty arrays and objects also return `is: false`.

## 4. Final takeaway

```ts
!!value;
```

is simply a shorter way of writing:

```ts
Boolean(value);
```

Both convert a value into its Boolean equivalent without changing the original value.

When to use it: Whenever you need to convert a potentially non-Boolean value into an explicit `true` or `false`, such as in conditions, return values, and Boolean flags.

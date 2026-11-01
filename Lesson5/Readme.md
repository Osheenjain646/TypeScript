# Type Assertion or Type Casting in TypeScript

- Sometimes we have information about the type of a value that TypeScript can't know about

This lesson covers the most important type assertion concepts used when TypeScript cannot infer a value's type correctly, but we know more than the compiler does.

## 1. Type Aliases

A type alias lets us give a custom name to an existing type.

```ts
type One = string;

type Two = string | number;

type Three = "hello";

let a: One = "hello";
```

- `One` is just another name for `string`.
- This is useful when you want more readable and reusable types.
- It helps keep code cleaner and easier to maintain.

## 2. Union Types

A union type means a value can be one of several types.

```ts
type Two = string | number;
let b = a as Two;
```

- Here, `b` may be either a `string` or a `number`.
- Union types are helpful when a variable can accept different valid values.

## 3. Literal Types

A literal type allows only a specific value, not just a general type.

```ts
type Three = "hello";
let c = a as Three;
```

- `Three` means the value must literally be `"hello"`.
- This creates stricter validation compared to `string`.
- It is often used for controlled values like `"add" | "concat"`.

## 4. Type Assertions / Type Casting

Type assertions tell TypeScript: “Trust me, I know this value is of this type.”

```ts
let myVal: string = addOrConcat(2, 2, "concat") as string;
```

### Syntax options

```ts
let value = someValue as SomeType;
let value2 = <SomeType>someValue;
```

- `as` syntax is the modern standard.
- `<Type>` syntax is older and still works in TypeScript.
- It is not runtime conversion. It only changes compile-time behavior.

### Important note

Type assertions do not verify the value at runtime.

```ts
let nextVal: number = addOrConcat(2, 2, "concat") as number;
```

This may look safe to TypeScript, but it can be wrong if the actual value is a string. The compiler trusts the assertion, but runtime behavior may still fail.

## 5. Type Assertion for Narrowing

Sometimes a function returns a broad type but we know the actual value is more specific.

```ts
const addOrConcat = (
  a: number,
  b: number,
  c: "add" | "concat",
): number | string => {
  if (c === "add") {
    return a + b;
  }
  return "" + a + b;
};
```

Here, the function returns either `number` or `string`.

If we know the returned value is definitely a string, we can assert it:

```ts
let myVal: string = addOrConcat(2, 2, "concat") as string;
```

This is useful when we are writing logic and know more than TypeScript does.

## 6. Why `unknown` is Safer in Forced Casting

When you need to override TypeScript strongly, a common pattern is:

```ts
10 as unknown as string;
```

This is called double casting.

- First convert to `unknown` to bypass TypeScript restrictions.
- Then cast to the final type.

This is useful when you intentionally want to force a value into a different type, but it should be used carefully because it can hide real bugs.

## 7. DOM (Document Object Model) Type Casting

TypeScript includes browser DOM types such as:

- `HTMLImageElement`
- `HTMLSpanElement`
- `HTMLElement`

Example:

```ts
const img = document.querySelector("img")!;
const myImg = document.getElementById("#img") as HTMLImageElement;
```

### Non-null assertion (`!`)

```ts
const img = document.querySelector("img")!;
```

- `!` tells TypeScript that the value is not `null`.
- It is a compile-time signal, not a runtime guarantee.
- If the element does not exist in the DOM, the code can still crash.

## 8. Casting Elements to Specific HTML Types

```ts
const nextImg = document.getElementById("#img") as HTMLImageElement;
img.src;
myImg.src;
```

- If we know an element is an image, we can cast it to `HTMLImageElement`.
- Then TypeScript allows image-specific properties like `.src`.

## 9. DOM Manipulation Example

```ts
const year = document.getElementById("year") as HTMLSpanElement;
const thisYear: string = new Date().getFullYear().toString();
year.setAttribute("dataTime", thisYear);
year.textContent = thisYear;
```

This code:

- gets the element with id `year`
- creates the current year as a string
- stores it in an attribute called `dataTime`
- updates the visible text content of the element

This is a common DOM pattern in JavaScript and TypeScript.

## 10. Safer Alternative to Type Assertions

The file also shows a safer pattern using runtime checks:

```ts
let year: HTMLElement | null = document.getElementById("year");
let thisYear: string = new Date().getFullYear().toString();

if (year) {
  year.setAttribute("dataTime", thisYear);
  year.textContent = thisYear;
}
```

This is better because it checks whether the element actually exists before using it.

## 11. React Note

The comments in the file mention a useful React detail:

- Angle-bracket assertions like `<Type>value` are not ideal in JSX.
- In React, the `as` syntax is preferred.

Example:

```ts
const value = someData as string;
```

This works well in JSX-based files because TypeScript and JSX can conflict with `<Type>` syntax.

## 12. Best Practices

- Use type assertions only when you are sure about the type.
- Avoid blindly asserting values without understanding the runtime behavior.
- Prefer runtime checks when values may be `null` or `undefined`.
- Use `unknown` before a forced cast when you must override TypeScript.
- Use DOM casting carefully, especially when manipulating HTML elements.

## 13. Summary

This lesson focuses on the idea that TypeScript sometimes needs help when the compiler cannot infer types correctly. The key topics are:

- type aliases
- union types
- literal types
- type assertions
- narrowing with assertions
- `unknown` casting
- DOM element casting
- non-null assertion
- safe runtime checks in DOM code

Type assertions are powerful, but they should be used responsibly because they bypass TypeScript safety checks and can cause bugs if used incorrectly.

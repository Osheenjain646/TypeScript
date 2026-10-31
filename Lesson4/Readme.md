# TypeScript Functions and Types

These notes summarize the type and function patterns demonstrated in `src/main.ts`.

## Type Aliases

A type alias gives a reusable name to a type. It can describe unions, arrays, and object shapes.

```typescript
type StringOrNumber = string | number;
type StringOrNumberArray = StringOrNumber[];

type ExampleObject = {
  name: string;
  isActive: boolean;
  albums: StringOrNumberArray;
};
```

Use an alias when the same type is needed in several places or when a type expression would otherwise be hard to read.

## Interfaces and Type Aliases

Interfaces and type aliases both give reusable names to types. In this lesson, `mathFunction1` uses a type alias and `mathFunction2` uses an interface to describe the same function signature: two number parameters and a number return value.

Type aliases can describe unions, arrays, object shapes, and function types. Interfaces are commonly used to describe object shapes and can also describe functions with a call signature.

## Literal Types

A literal type restricts a value to one exact value, or to a union of specific values.

```typescript
let userName: "Osheen Jain" | "xyz" | "abc";
userName = "Osheen Jain";
```

Assigning any other string to `userName` produces a type error.

## Function Type Signatures

A function signature specifies the parameter types and return type. The function implementation must match it.

```typescript
const add = (a: number, b: number): number => {
  return a + b;
};
```

Here, both parameters and the returned value are numbers. Use `void` for a function that does not return a useful value, such as a function that only logs a message.

## Function Type Alias

A type alias can describe the shape of a function and be reused for multiple implementations.

```typescript
type MathFunction = (a: number, b: number) => number;

const multiply: MathFunction = (a, b) => a * b;
```

## Function Interface

An interface can also describe a function by declaring its call signature.

```typescript
interface MathOperation {
  (a: number, b: number): number;
}

const multiply: MathOperation = (a, b) => a * b;
```

Both function aliases and call-signature interfaces provide type checking; choose the style that best fits the surrounding code.

## Optional Parameters

Add `?` to mark a parameter as optional. Its value may be `undefined`, so check for that before using it.

```typescript
const addAll = (a: number, b: number, c?: number): number => {
  return typeof c !== "undefined" ? a + b + c : a + b;
};
```

Optional parameters should come after required parameters.

## Default Parameters

A parameter can have a default value, used when the caller omits it or passes `undefined`.

```typescript
const sumAll = (a: number, b: number, c: number = 2): number => {
  return a + b + c;
};

sumAll(2, 3); // Uses 2 for c
sumAll(2, 3, 5); // Uses 5 for c
```

When a defaulted parameter comes before a required parameter, pass `undefined` to use the default while supplying later arguments.

## Rest Parameters

A rest parameter gathers remaining arguments into an array. It must be the last parameter.

```typescript
const total = (first: number, ...numbers: number[]): number => {
  return first + numbers.reduce((sum, current) => sum + current, 0);
};
```

## Never Type

`never` is the return type for a function that cannot finish normally, such as one that always throws an error.

```typescript
const createError = (message: string): never => {
  throw new Error(message);
};
```

It can also help check that all cases of a union have been handled. A loop that eventually breaks can finish normally, so it does not have a `never` return type.

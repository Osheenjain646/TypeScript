// Type Aliases

type stringOrNumber = string | number;

type stringOrNumberArray = stringOrNumber[];

type exampleObj = {
  name: string;
  isActive: boolean;
  albums: stringOrNumberArray;
};

type UserId = stringOrNumber;

// Literal Types

let myName: "Osheen Jain";
// myName = 'john' // can't assign now as it's type is fixed now as Dave
// so it can have only Dave in it now

// union type literal

let userName: "Osheen Jain" | "xyz" | "abc";
userName = "Osheen Jain"; // 🟢
// userName = 'cahicdh' // 🔴

// Functions

const add = (a: number, b: number): number => {
  return a + b;
};

const logMSG = (message: any): void => {
  // sideEffects
  console.log(message);
};

logMSG("Hello!");
logMSG(add(2, 3));

const subtract = function (c: number, d: number): number {
  return c - d;
};

logMSG(subtract(6, 3));

// function type alias
// type is more preferred to use
// type signature

type mathFunction1 = (a: number, b: number) => number;

const multiply1: mathFunction1 = (c, d) => {
  return c * d;
};

logMSG(multiply1(4, 5));

// function interface alias

interface mathFunction2 {
  (a: number, b: number): number;
}

const multiply2: mathFunction2 = (c, d) => {
  return c * d;
};

logMSG(multiply2(4, 5));

// Optional Parameter
// It can be in the last of the parameter list only not anywhere else

const addAll = (a: number, b: number, c?: number): number => {
  if (typeof c !== "undefined") {
    return a + b + c;
  }
  return a + b;
};

// default parameter
// any parameter can be assigned
// but if we make any parameter rather than last so during calling the function we must pass undefined in that param place to take the default value

const sumAll1 = (a: number, b: number, c: number = 2): number => {
  return a + b + c;
};

// Here we can't use the type alias function for type define of the function as assigned parameter is there the value parameter is defined here

const sumAll2 = (a: number = 10, b: number, c: number): number => {
  return a + b + c;
};

logMSG(addAll(2, 3, 5)); // c is not undefined so take the value in addition
logMSG(addAll(2, 3)); // c is undefined not taken in addition
logMSG(sumAll1(2, 3)); // c take the on the go assigned parameter
logMSG(sumAll1(2, 3, 5)); // c take the passed argument
logMSG(sumAll2(undefined, 5, 8));

// Rest Parameter (using the Rest operator)
// Take first parameter in a and rest of them will go in the array

const total = (a: number, ...nums: number[]): number => {
  return a + nums.reduce((prev, curr) => prev + curr);
};

logMSG(total(1, 2, 3, 4, 5, 6, 7));

// Never Type

const createError = (errMSg: string): never => {
  throw new Error(errMSg);
};

// if there is an infinite loop it is also a never type

// without if it is never type but with if it will become the void
const infinite = () => {
  let i: number = 1;
  while (true) {
    i++;
    if (i > 100) {
      break;
    }
  }
};

// custom type guard for type check
const isNumber = (value: any): boolean => {
  return typeof value === "number" ? true : false;
};

// Use of never type
const numberOrString = (value: number | string): string => {
  if (typeof value === "string") return "string";
  if (isNumber(value)) return "number";
  return createError("This should never happen"); // to handle a undefined error return we have to return something
  // that never going to be happen
};

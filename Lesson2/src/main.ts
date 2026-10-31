// implicit declaration
// will infer type automatically
// let myName = 'Osheen Jain'
// myName = 42 // give error

// explicit declaration
// no need to infer the type
let myName: string = "Osheen Jain";

// or

// both true as i am assigning a string to it only as per specified
// as of let
let Name: string;
Name = "Osheen";
Name = "xyz";
// but const doesn't let you do it

// types

let string: string;
let Number: number;
let isCorrect: boolean;
let anyValue: any; // can have any type of data whether it is primitive or non-primitive data types
let unionType: string | number; // can have both string and number type data

string = "Osheen Jain";
Number = 21;
isCorrect = true;
anyValue = "string"; // number-78 , bigint-1e+7 , boolean-true , null-intensional void , undefined-unIntensional void(unassigned) , symbol-unique identifier
unionType = "Hello";
unionType = 85; // can assign later too

// function

// can infer the return type if not defined

const sum1 = (a: number, b: number): number => {
  return a + b;
};

const sum2 = (a: number, b: string): string => {
  return a + b;
};

// can have any number of union data type
let postId: string | number;
let isActive: number | boolean | string;

let regularExpression: RegExp = /\w+/g; // regular expression can accept all the words globally(g)

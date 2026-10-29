// implicit declaration
// will infer type automatically
// let myName = 'Osheen Jain'
// myName = 42 // give error
// explicit declaration
// no need to infer the type
let myName = "Osheen Jain";
// or
// both true as i am assigning a string to it only as per specified
// as of let
let Name;
Name = "Osheen";
Name = "xyz";
// but const doesn't let you do it
// types
let string;
let Number;
let isCorrect;
let anyValue; // can have any type of data whether it is primitive or non-primitive data types
let unionType; // can have both string and number type data
string = "Osheen Jain";
Number = 21;
isCorrect = true;
anyValue = "string"; // number-78 , bigint-1e+7 , boolean-true , null-intensional void , undefined-unIntensional void(unassigned) , symbol-unique identifier
unionType = "Hello";
unionType = 85; // can assign later too
// function
// can infer the return type if not defined
const sum1 = (a, b) => {
    return a + b;
};
const sum2 = (a, b) => {
    return a + b;
};
// can have any number of union data type
let postId;
let isActive;
let regularExpression = /\w+/g; // regular expression can accept all the words globally(g)
export {};
//# sourceMappingURL=main.js.map
// Type Aliases
// Literal Types
let myName;
// myName = 'john' // can't assign now as it's type is fixed now as Dave
// so it can have only Dave in it now
// union type literal
let userName;
userName = "Osheen Jain"; // 🟢
// userName = 'cahicdh' // 🔴
// Functions
const add = (a, b) => {
    return a + b;
};
const logMSG = (message) => {
    // sideEffects
    console.log(message);
};
logMSG("Hello!");
logMSG(add(2, 3));
const subtract = function (c, d) {
    return c - d;
};
logMSG(subtract(6, 3));
const multiply1 = (c, d) => {
    return c * d;
};
logMSG(multiply1(4, 5));
const multiply2 = (c, d) => {
    return c * d;
};
logMSG(multiply2(4, 5));
// Optional Parameter
// It can be in the last of the parameter list only not anywhere else
const addAll = (a, b, c) => {
    if (typeof c !== "undefined") {
        return a + b + c;
    }
    return a + b;
};
// default parameter
// any parameter can be assigned
// but if we make any parameter rather than last so during calling the function we must pass undefined in that param place to take the default value
const sumAll1 = (a, b, c = 2) => {
    return a + b + c;
};
// Here we can't use the type alias function for type define of the function as assigned parameter is there the value parameter is defined here
const sumAll2 = (a = 10, b, c) => {
    return a + b + c;
};
logMSG(addAll(2, 3, 5)); // c is not undefined so take the value in addition
logMSG(addAll(2, 3)); // c is undefined not taken in addition
logMSG(sumAll1(2, 3)); // c take the on the go assigned parameter
logMSG(sumAll1(2, 3, 5)); // c take the passed argument
logMSG(sumAll2(undefined, 5, 8));
// Rest Parameter (using the Rest operator)
// Take first parameter in a and rest of them will go in the array
const total = (a, ...nums) => {
    return a + nums.reduce((prev, curr) => prev + curr);
};
logMSG(total(1, 2, 3, 4, 5, 6, 7));
// Never Type
const createError = (errMSg) => {
    throw new Error(errMSg);
};
// if there is an infinite loop it is also a never type
// without if it is never type but with if it will become the void
const infinite = () => {
    let i = 1;
    while (true) {
        i++;
        if (i > 100) {
            break;
        }
    }
};
// custom type guard for type check
const isNumber = (value) => {
    return typeof value === "number" ? true : false;
};
// Use of never type
const numberOrString = (value) => {
    if (typeof value === "string")
        return "string";
    if (isNumber(value))
        return "number";
    return createError("This should never happen"); // to handle a undefined error return we have to return something
    // that never going to be happen
};
export {};
//# sourceMappingURL=main.js.map
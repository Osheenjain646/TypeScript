// Arrays
let stringArr = ["one", "two", "three"];
let stringNumberArr = ["osheen", "xyz", 67568];
let mixedData = ["aajbkj", 1984, true];
// stringArr[0] = 895 // give error as of not matched types
// stringArr.push(46) // same here
stringArr.push("hey");
stringNumberArr[0] = 790; // all good as it accept both string and number even changing string to number
stringNumberArr.unshift("john"); // as it accepts number also
mixedData.push(780); // can have any value
// stringArr = stringNumberArr // give error as we are assigning a arr or type of both
// number and string to a string only type arr
// but
// stringNumberArr = stringArr // can be done as stringNumber arr can accept string as their element data type
// as it can have any datatype here
// mixedData = stringArr
// mixedData = stringNumberArr
let test = []; // infer as any[] type of data
let brands = []; // can accept only String type data in future
brands.push("Porche"); // correctly accepted
// if want to specify the type of a particular element in a array at a position you can use tuple for it
// Tuple
let myTuple = ["Osheen", 21, true]; // specifying the type at specific positions
let mixed = ["xyz", 65, false];
// myTuple = mixed // give error as the element at 0 pos in mixed can have any data type
// whether string | number | boolean but i am assigning it to a fixed datatype that is string in myTuple
// but
mixed = myTuple; // this is correct
// console.log(myTuple[0]);
// console.log(myTuple[1]);
// console.log(myTuple[2]);
// myTuple[3] = 42 can't be accepted as 3 index type is not defined here
// see Readme for more reference and info
// Objects
let myObject;
myObject = []; // re-assignable to an array but still it is an object type
// console.log(typeof myObject) // object
myObject = brands; // so it is assignable to an array
myObject = {}; // can be assign to a empty object too
const exampleObj1 = {
    name: "Osheen Jain",
    active: true,
    albums: ["TypeScript", 2026],
};
const exampleObj2 = {
    name: "Osheen Jain",
    // optional active property
    albums: ["Hello", 26462],
};
// using in a function by passing a object of type ObjectType
const greet1 = (user) => {
    return `Hello ${user.name}!`;
};
let exampleObj3 = {
    name: "Osheen Jain",
    active: false,
    albums: ["typescript", 2026],
};
const greet2 = (user) => {
    if (user.name)
        return `Hello ${user.name?.toUpperCase()}`; // as it is optional and might be undefined so need a optional quality of upperCase conversion
    return "Hello!";
};
console.log(greet2(exampleObj3));
// Enums
// "Unlike most TypeScript features, Enums are not a type-level addition to JavaScript but something added to the language and runtime"
// default starts with the value 0 to first prop and u can change by yourself
var Grade;
(function (Grade) {
    Grade[Grade["U"] = 3] = "U";
    Grade[Grade["D"] = 4] = "D";
    Grade[Grade["C"] = 5] = "C";
    Grade[Grade["B"] = 6] = "B";
    Grade[Grade["A"] = 7] = "A";
})(Grade || (Grade = {}));
console.log(Grade.U, Grade.D, Grade.C, Grade.B, Grade.A);
export {};
//# sourceMappingURL=main.js.map
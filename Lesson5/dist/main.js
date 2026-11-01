// convert to more or less specific
let a = "hello";
let b = a; // less Specific (to string only from Two)
let c = a; // more Specific (as already assigned Three as type 'hello')
// You can use <> brackets to declare the type of the variable also
// you cannot use this type of declaration for type define in jsx in react
// but it is used in declaring generics in react jsx as for useState<string>()
let d = "world";
let e = 456;
// Assertion for narrowing
const addOrConcat = (a, b, c) => {
    if (c === "add") {
        return a + b;
    }
    return "" + a + b;
};
let myVal = addOrConcat(2, 2, "concat");
// be careful as ts sees is no problem - but a string is returned here
// so use a unknown like example here below
let nextVal = addOrConcat(2, 2, "concat");
// we are over-ruling type script here
// double casting or force casting
// using the unknown type here
// two assertion
// 10 as string // wrong
10;
// The DOM
const img = document.querySelector("img");
const myImg = document.getElementById("#img") /*!*/; // non - null assertion that we know that it is present there that it is not null
// to make that myImg is not null but if we specify it as the HTMLImageElement then we also need to specify it as it is not null
// basically we are specifying it is a HTMLImageElement or specifying it is not null
const nextImg = document.getElementById("#img"); // also correct but not used for type assertion in react
img.src;
myImg.src;
// Original JS Code
// const year = document.getElementById("year")
// const thisYear = new Date().getFullYear()
// year.setAttribute("dataTime" , thisYear)
// year.textContent = thisYear
// 1st variation
// let year: HTMLElement | null = document.getElementById("year");
// let thisYear: string = new Date().getFullYear().toString();
// if (year) {
//   year.setAttribute("dataTime", thisYear);
//   year.textContent = thisYear;
// }
// 2nd variation
const year = document.getElementById("year");
const thisYear = new Date().getFullYear().toString();
year.setAttribute("dataTime", thisYear);
year.textContent = thisYear;
export {};
//# sourceMappingURL=main.js.map
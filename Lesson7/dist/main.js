// Index Signature and keyof Assertion
const todayTransactions = {
    Pizza: -10,
    Books: -5,
    Job: 50,
};
console.log(todayTransactions.Pizza);
console.log(todayTransactions["Pizza"]);
// Dynamically access
let prop = "Pizza";
console.log(todayTransactions[prop]); // can't access as we do not created a index signature of it (implicitly have any type)
// applying to loop
const todaysNet = (transactions) => {
    let total = 0;
    for (const transaction in transactions) {
        total += transactions[transaction] ?? 0; // using the nullish coalescing operator as there is chance that a null value
        // can come here as noUncheckedIndexedAccess is true in tsconfig file
    }
    return total;
};
console.log(todaysNet(todayTransactions));
// to correct it we must redeclare the TransactionObj using the index signature
// todayTransactions.Pizza = 40; // as it is readonly so can't access
console.log(todayTransactions["Osheen"]); // we do not get error as typescript doesn't know that what are the keys we are making at start
const student = {
    name: "Osheen Jain",
    CGPA: 7.2,
    classes: [100, 200],
};
console.log(student.test); // undefined
// now we can iterate over it also
for (const key in student) {
    console.log(`${key}: ${student[key]}`);
}
const student1 = {
    name: "Osheen Jain",
    CGPA: 7.2,
    classes: [100, 200],
};
// console.log(student1.test) // give error as no index signature for the keys to be dynamically get accessed and made
// as keyof create a union type of all the type of keys as a string literal types
for (const key in student1) {
    console.log(`${key}: ${student1[key]}`);
}
// one more example alternate version for this
Object.keys(student1).map((key) => {
    console.log(`${key}: ${student1[key]}`);
    // as here we do not know the type of the student1 object so we get it using the typeof object name
    // to get it's type Student1 and apply the keyof on it to get it's keys and use it's key one by one for access
});
// using the function
const logStudent1Keys = (student1, key) => {
    console.log(`${key}: ${student1[key]}`);
};
logStudent1Keys(student1, "name");
logStudent1Keys(student1, "CGPA");
logStudent1Keys(student1, "classes");
const monthlyIncomes = {
    salary: 5000000,
    bonus: 5000000,
    sideHustle: 10000000,
};
for (const key in monthlyIncomes) {
    console.log(`${key}: ${monthlyIncomes[key]}`);
    // can't access the keys of the Incomes to print
}
export {};
// explanation for this is in the readme file
// to access the key we use and write like it
// for (const key of Object.keys(monthlyIncomes) as (keyof Incomes)[]) {
//   console.log(`${key}: ${monthlyIncomes[key]}`);
// }
//# sourceMappingURL=main.js.map
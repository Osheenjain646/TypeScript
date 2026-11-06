// Utility Types
const updateAssignment = (assign, propsToUpdate) => {
    return { ...assign, ...propsToUpdate };
};
const assign1 = {
    studentId: "compSci123",
    title: "Final Year Project",
    grade: 0,
};
console.log(updateAssignment(assign1, { grade: 95 }));
console.log(assign1); // this will not have the updated grade as we have just partially updated it for that console log only
const assignGraded = updateAssignment(assign1, { grade: 95 });
console.log(assignGraded); // Now this assignGraded Object will always have the updated obj
// Require and Readonly
// It says that it require all the properties even the optional too to be come here
const recordAssignment = (assign) => {
    // send all required data and send to data base for eg etc
    return assign; // or msg for the completion of the work
};
// We can only read the properties of that can't modify it
const assignVerified = {
    ...assignGraded,
    verified: true,
};
// assignVerified.grade = 88;// error as we can't modify the data of the object a readonly type
recordAssignment({ ...assignVerified, verified: true });
// Record Type
// It tell the hexColorMap through the Record that the key will be of string type and the value will also of the string type too
const hexColorMap = {
    red: "FF0000",
    green: "00FF00",
    blue: "0000FF",
};
// Record using the string literals
const finalGrades = {
    Sara: "B",
    Kelly: "A",
};
const gradeData = {
    Sara: { assign1: 89, assign2: 95 },
    Kelly: { assign1: 87, assign2: 99 },
};
const score = {
    studentId: "CompSci456",
    grade: 95,
};
const preview = {
    studentId: "compSci789",
    title: "Final Year Teachings",
};
// ReturnType
// type newAssign = { title: string; points: number };
// const createNewAssign = (title: string, points: number): newAssign => {
//   return { title, points }; // this will infer the return type of the title and the points from the newAssign type
//   // but we have to give the format of returning by our side
// };
// but if we don't provide the return Type this will automatically infer it
const createNewAssign = (title, points) => {
    return { title, points };
};
const tsAssign = createNewAssign("Utility", 100);
// creating a tsAssign of type NewAssign which is the return type of typeof createNewAssign using the function createNewAssign
console.log(tsAssign);
// now assigning the args as per the type of the parameters which is a tuple
// which means the assign args can have the data of that type of only in parameters
// with fixed positions as per we do in the tuple
const assignArgs = ["Utility Type", 100];
const tsAssign2 = createNewAssign(...assignArgs);
console.log(tsAssign2);
// fetchUser of type promise which have generic type of User type array
const fetchUser = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
        return res.json();
    })
        .catch((err) => {
        if (err instanceof Error)
            console.log(err.message);
    });
    return data;
};
fetchUser().then((users) => console.log(users));
export {};
//# sourceMappingURL=main.js.map
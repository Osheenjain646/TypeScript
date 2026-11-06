// Utility Types

// Partial Type

interface Assignment {
  studentId: string;
  title: string;
  grade: number;
  verified?: boolean;
}

const updateAssignment = (
  assign: Assignment,
  propsToUpdate: Partial<Assignment>,
): Assignment => {
  return { ...assign, ...propsToUpdate };
};

const assign1: Assignment = {
  studentId: "compSci123",
  title: "Final Year Project",
  grade: 0,
};

console.log(updateAssignment(assign1, { grade: 95 }));
console.log(assign1); // this will not have the updated grade as we have just partially updated it for that console log only
const assignGraded: Assignment = updateAssignment(assign1, { grade: 95 });
console.log(assignGraded); // Now this assignGraded Object will always have the updated obj

// Require and Readonly

// It says that it require all the properties even the optional too to be come here
const recordAssignment = (assign: Required<Assignment>): Assignment => {
  // send all required data and send to data base for eg etc
  return assign; // or msg for the completion of the work
};

// We can only read the properties of that can't modify it
const assignVerified: Readonly<Assignment> = {
  ...assignGraded,
  verified: true,
};

// assignVerified.grade = 88;// error as we can't modify the data of the object a readonly type

recordAssignment({ ...assignVerified, verified: true });

// Record Type

// It tell the hexColorMap through the Record that the key will be of string type and the value will also of the string type too
const hexColorMap: Record<string, string> = {
  red: "FF0000",
  green: "00FF00",
  blue: "0000FF",
};

// string literal type
type Students = "Sara" | "Kelly";
type LetterGrades = "A" | "B" | "C" | "D" | "E" | "F";

// Record using the string literals
const finalGrades: Record<Students, LetterGrades> = {
  Sara: "B",
  Kelly: "A",
};

// Record using the interface
interface Grades {
  assign1: number;
  assign2: number;
}

const gradeData: Record<Students, Grades> = {
  Sara: { assign1: 89, assign2: 95 },
  Kelly: { assign1: 87, assign2: 99 },
};

// Pick and Omit

// pick only the mentioned property from that type or might be interface and omit all others from it
type AssignResult = Pick<Assignment, "studentId" | "grade">;

const score: AssignResult = {
  studentId: "CompSci456",
  grade: 95,
};

// Omit the mentioned property and only pick the left over property
type AssignPreview = Omit<Assignment, "grade" | "verified">;

const preview: AssignPreview = {
  studentId: "compSci789",
  title: "Final Year Teachings",
};

// All these type above can work with all like type , interface , union etc

// Exclude and Extract
// These two only works with the string literals or union types only , no interface

// Exclude the string literal "U" from the type LetterGrades and take in all the rest values
type adjustedGrade = Exclude<LetterGrades, "U">;

// Extract(include) the only the mentioned string literals from the type LetterGrades and ignore Others
type highGrade = Extract<LetterGrades, "A" | "B">;

// NonNullable type

type AllPossibleGrades = "Osheen" | "ABC" | null | undefined;

// will have only the string literals in type which are not null or undefined
type NamesOnly = NonNullable<AllPossibleGrades>;

// ReturnType

// type newAssign = { title: string; points: number };

// const createNewAssign = (title: string, points: number): newAssign => {
//   return { title, points }; // this will infer the return type of the title and the points from the newAssign type
//   // but we have to give the format of returning by our side
// };

// but if we don't provide the return Type this will automatically infer it

const createNewAssign = (title: string, points: number) => {
  return { title, points };
};

// now we can infer the return type of the createAssign function using that utility type

type newAssign = ReturnType<typeof createNewAssign>;

// now if we update the create assign we will get the correct ReturnType of it
// this is useful for the function whose return type is unknown for you likely from a library
// you can get or infer it's type from it

// usage of it

type NewAssign = ReturnType<typeof createNewAssign>;

const tsAssign: NewAssign = createNewAssign("Utility", 100);
// creating a tsAssign of type NewAssign which is the return type of typeof createNewAssign using the function createNewAssign
console.log(tsAssign);

// Parameter type

// bring the parameters of typeof createNewAssign(parameter of the createNewAssign)
type AssignParams = Parameters<typeof createNewAssign>;

// now assigning the args as per the type of the parameters which is a tuple
// which means the assign args can have the data of that type of only in parameters
// with fixed positions as per we do in the tuple
const assignArgs: AssignParams = ["Utility Type", 100];

const tsAssign2: NewAssign = createNewAssign(...assignArgs);
console.log(tsAssign2);

// Awaited Type
// it helps us with the ReturnType of a promise

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// fetchUser of type promise which have generic type of User type array
const fetchUser = async (): Promise<User[]> => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      if (err instanceof Error) console.log(err.message);
    });
  return data;
};

// this will give you give the promise type of generic type of User type array
// type fetchUsersReturnType = ReturnType<typeof fetchUser> // Promise<User[]>

// this will get the actual return type of the data return by the fetchUser
// accurate return type of the fetchUser
type fetchUsersReturnType = Awaited<ReturnType<typeof fetchUser>>; // User[]

fetchUser().then((users) => console.log(users));

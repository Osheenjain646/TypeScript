// Generics

// specific for string type only
const stringEcho = (arg: string): string => arg;

// using generics for multiple type
const echo = <T>(arg: T): T => arg;

// here T is of any type

const isObj = <T>(arg: T): boolean => {
  return typeof arg === "object" && !Array.isArray(arg) && arg !== null;
};

console.log(isObj(true));
console.log(isObj("john"));
console.log(isObj([1, 2, 3]));
console.log(isObj({ name: "john" }));
console.log(isObj(null));

const isTrue1 = <T>(arg: T): { arg: T; is: boolean } => {
  if (Array.isArray(arg) && !arg.length) {
    return { arg, is: false };
  }
  if (isObj(arg) && !Object.keys(arg as keyof T).length) {
    return { arg, is: false };
  }
  return { arg, is: !!arg };
};

console.log(isTrue1(false));
console.log(isTrue1(0));
console.log(isTrue1(true));
console.log(isTrue1(1));
console.log(isTrue1("Osheen"));
console.log(isTrue1(""));
console.log(isTrue1(null));
console.log(isTrue1(undefined));
console.log(isTrue1({}));
console.log(isTrue1({ name: "Osheen" }));
console.log(isTrue1([]));
console.log(isTrue1([1, 2, 3]));
console.log(isTrue1(NaN));
console.log(isTrue1(-0));

// we can pre declare the type of return data of the function using a function too which also use the generics

interface BoolCheck<T> {
  value: T;
  is: boolean;
}

const isTrue2 = <T>(arg: T): BoolCheck<T> => {
  if (Array.isArray(arg) && !arg.length) {
    return { value: arg, is: false };
  }
  if (isObj(arg) && !Object.keys(arg as keyof T).length) {
    return { value: arg, is: false };
  }
  return { value: arg, is: !!arg };
};

console.log(isTrue2(false));
console.log(isTrue2(0));
console.log(isTrue2(true));
console.log(isTrue2(1));
console.log(isTrue2("Osheen"));
console.log(isTrue2(""));
console.log(isTrue2(null));
console.log(isTrue2(undefined));
console.log(isTrue2({}));
console.log(isTrue2({ name: "Osheen" }));
console.log(isTrue2([]));
console.log(isTrue2([1, 2, 3]));
console.log(isTrue2(NaN));
console.log(isTrue2(-0));

// another example

interface HasID {
  id: number;
}

// this is going make sure that the user is of T type and also have the property as HasID
const processUser = <T extends HasID>(user: T): T => {
  // process the user with logic here
  return user;
};

// console.log(processUser({name: 'Osheen Jain'})); // as it doesn't have the HasID id in it
console.log(processUser({ id: 21, name: "Osheen Jain" }));

// another complex example

const getUsersProperty = <T extends HasID, K extends keyof T>(
  users: T[],
  key: K,
): T[K][] => {
  return users.map((user) => user[key]);
};

const usersArray = [
  {
    id: 123,
    username: "alicew",
    contact: {
      email: "alice.w@example.com",
      phone: "555-0102",
      address: {
        street: "123 Wonderland Ave",
        city: "Anystate",
        zipCode: "12345",
        country: "US",
      },
    },
    profile: {
      dateOfBirth: "1990-04-12",
      bio: "Software engineer and coffee enthusiast",
      avatarUrl: "https://cdn.example.com/avatars/alicew.png",
    },
    preferences: {
      theme: "dark",
      language: "en-US",
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
    },
    activity: {
      lastLogin: "2026-11-04T09:32:00Z",
      sessions: [
        {
          id: "s-001",
          ip: "192.168.1.44",
          device: "Chrome / macOS",
          startedAt: "2026-11-04T09:32:00Z",
          endedAt: "2026-11-04T11:15:00Z",
        },
        {
          id: "s-002",
          ip: "10.0.0.7",
          device: "Safari / iOS",
          startedAt: "2026-11-03T18:00:00Z",
          endedAt: "2026-11-03T18:22:00Z",
        },
      ],
    },
  },
  {
    id: 456,
    username: "bob_m",
    contact: {
      email: "bob.m@example.com",
      phone: "555-0347",
      address: {
        street: "456 Data Drive",
        city: "Newtown",
        zipCode: "67890",
        country: "US",
      },
    },
    profile: {
      dateOfBirth: "1987-09-23",
      bio: "DevOps engineer, home lab tinkerer",
      avatarUrl: "https://cdn.example.com/avatars/bob_m.png",
    },
    preferences: {
      theme: "light",
      language: "en-GB",
      notifications: {
        email: false,
        sms: true,
        push: true,
      },
    },
    activity: {
      lastLogin: "2026-11-05T07:10:00Z",
      sessions: [
        {
          id: "s-010",
          ip: "172.16.4.2",
          device: "Firefox / Linux",
          startedAt: "2026-11-05T07:10:00Z",
          endedAt: null,
        },
      ],
    },
  },
];

console.log(getUsersProperty(usersArray, "contact"));
console.log(getUsersProperty(usersArray, "preferences"));

// Generics in class

class StateObj<T> {
  private data: T;

  constructor(value: T) {
    this.data = value;
  }

  get state(): T {
    return this.data;
  }

  set state(value: T) {
    this.data = value;
  }
}

const store = new StateObj("Osheen Jain");
console.log(store.state);
store.state = "abc";
console.log(store.state);
// store.state = 12;  // give error as of different type as string and here a number

const myState = new StateObj<(string | number | boolean)[]>([15]);
myState.state = ["Osheen Jain", 21, true];
console.log(myState.state);

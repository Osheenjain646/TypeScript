# What are Classes in TypeScript?

A class in TypeScript is a blueprint for creating objects. It defines the properties (data) and methods (behavior) that objects created from that class will have.

Classes in TypeScript work similarly to JavaScript classes, but TypeScript adds features such as:

- Type annotations.
- Access modifiers (`public`, `private`, `protected`).
- `readonly` properties.
- Interface implementation.
- Abstract classes.
- Strongly typed constructors and methods.

## 1. Basic class declaration

Let's create a simple `User` class.

```ts
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): void {
    console.log(`Hello, my name is ${this.name}`);
  }
}

// Creating an object (instance)
const user1 = new User("Osheen", 21);

console.log(user1.name); // Osheen
console.log(user1.age); // 21

user1.greet(); // Hello, my name is Osheen
```

Let's understand each part:

| Keyword         | Meaning                                           |
| --------------- | ------------------------------------------------- |
| `class`         | Declares a class.                                 |
| `constructor()` | Initializes a new object when `new` is used.      |
| `this`          | Refers to the current instance.                   |
| `new`           | Creates an instance of a class.                   |
| `void`          | Indicates that a function doesn't return a value. |

Remember the difference:

- Class = Blueprint.
- Object = Actual instance created from that blueprint.

## 2. Properties and Methods

A class can contain properties and methods.

Properties store data.

Methods define behavior.

```ts
class Car {
  brand: string;
  model: string;
  speed: number;

  constructor(brand: string, model: string) {
    this.brand = brand;
    this.model = model;
    this.speed = 0;
  }

  accelerate(): void {
    this.speed += 10;
  }

  brake(): void {
    this.speed -= 10;
  }
}

const car = new Car("Mahindra", "Thar");

car.accelerate();

console.log(car.speed); // 10
```

Here:

- `brand`, `model`, and `speed` are properties.
- `accelerate()` and `brake()` are methods.

## 3. Access Modifiers in TypeScript

Access modifiers control where class properties and methods can be accessed.

Also known as data modifiers , visibility modifiers or visibility members.

TypeScript provides three main access modifiers.

### A. Public

A `public` property can be accessed from anywhere.

It is also the default access modifier if you don't specify one.

```ts
class User {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const user = new User("Osheen");

console.log(user.name); // Osheen
```

### B. Private

A `private` property can only be accessed inside the class where it is declared.

```ts
class BankAccount {
  private balance: number = 5000;

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount();

console.log(account.getBalance()); // 5000

// console.log(account.balance); // Error
```

Why use `private`?

You may not want external code to directly modify sensitive internal state.

Note: TypeScript's `private` is primarily a compile-time restriction. For JavaScript runtime-enforced private fields, use `#`.

```ts
class BankAccount {
  #balance = 5000;

  getBalance() {
    return this.#balance;
  }
}
```

### C. Protected

A `protected` property can be accessed inside its class and its subclasses, but not directly from outside.

```ts
class Person {
  protected name: string = "Osheen";
}

class Employee extends Person {
  showName(): void {
    console.log(this.name);
  }
}

const employee = new Employee();

employee.showName(); // Osheen

// employee.name; // Error
```

### Comparison

| Modifier    | Same class | Child class | Outside class |
| ----------- | ---------- | ----------- | ------------- |
| `public`    | Yes        | Yes         | Yes           |
| `private`   | Yes        | No          | No            |
| `protected` | Yes        | Yes         | No            |

## 4. Readonly Properties

The `readonly` modifier prevents a property from being reassigned after initialization.

```ts
class User {
  readonly id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

const user = new User(101, "Osheen");

user.name = "Rahul"; // Valid

// user.id = 102; // Error
```

You can initialize a readonly property in its declaration or constructor.

## 5. Inheritance (`extends`)

Inheritance allows one class to reuse properties and methods from another class.

This is useful when multiple classes share common functionality.

```ts
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  eat(): void {
    console.log(`${this.name} is eating`);
  }
}

class Dog extends Animal {
  bark(): void {
    console.log(`${this.name} is barking`);
  }
}

const dog = new Dog("Tommy");

dog.eat(); // Tommy is eating
dog.bark(); // Tommy is barking
```

Here:

- `Animal` is the parent class.
- `Dog` is the child class.
- `extends` establishes inheritance.
- `Dog` inherits the `name` property and `eat()` method.

### Using `super`

The `super` keyword lets a child class call its parent class constructor or methods.

```ts
class Animal {
  constructor(public name: string) {}

  eat(): void {
    console.log("Animal is eating");
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  eat(): void {
    super.eat();
    console.log(`${this.name} is eating food`);
  }
}

const dog = new Dog("Tommy");
dog.eat();
```

## 6. Static Properties and Methods

A `static` property or method belongs to the class itself, not to individual instances.

```ts
class MathOperations {
  static PI: number = 3.14159;

  static square(num: number): number {
    return num * num;
  }
}

console.log(MathOperations.PI);
console.log(MathOperations.square(5)); // 25
```

Notice that we don't need `new MathOperations()`.

You access static members using the class name.

```ts
MathOperations.square(5); // Correct

// const math = new MathOperations();
// math.square(5); // Error
```

## 7. Getters and Setters

Getters and setters allow you to control how class properties are read and updated.

```ts
class User {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(newName: string) {
    if (newName.length < 3) {
      throw new Error("Name is too short");
    }

    this._name = newName;
  }
}

const user = new User("Osheen");

console.log(user.name); // Osheen

user.name = "Rahul";

console.log(user.name); // Rahul
```

Notice:

```ts
user.name; // Getter
user.name = "Rahul"; // Setter
```

You call them like properties, not like ordinary methods.

## 8. Abstract Classes

An abstract class is a class that cannot be instantiated directly.

It is designed to act as a base class for other classes.

```ts
abstract class Payment {
  abstract pay(amount: number): void;

  showMessage(): void {
    console.log("Processing payment...");
  }
}

class UpiPayment extends Payment {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} using UPI`);
  }
}

const payment = new UpiPayment();

payment.showMessage();
payment.pay(500);
```

Important points:

- You cannot create an instance of an abstract class.
- An abstract method has no implementation in the parent class.
- The child class must implement inherited abstract methods.
- An abstract class can also contain normal implemented methods.

## 9. Classes implementing Interfaces

Remember the `interface` concept we discussed earlier?

You can use an interface to define what a class must implement.

```ts
interface User {
  name: string;
  login(): void;
}

class Admin implements User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  login(): void {
    console.log(`${this.name} logged in`);
  }
}

const admin = new Admin("Osheen");

admin.login();
```

Here:

- `User` defines a contract.
- `Admin` implements that contract.
- The class must provide the required properties and methods.

Difference between `extends` and `implements`:

| `extends`                    | `implements`                               |
| ---------------------------- | ------------------------------------------ |
| Inherits from another class  | Follows an interface contract              |
| Inherits implementations     | Does not inherit interface implementations |
| A class can extend one class | A class can implement multiple interfaces  |

Example:

```ts
interface Logger {
  log(): void;
}

interface Authenticator {
  authenticate(): void;
}

class Admin implements Logger, Authenticator {
  log(): void {
    console.log("Logging");
  }

  authenticate(): void {
    console.log("Authenticated");
  }
}
```

## 10. Parameter Properties (Shorter Constructor Syntax)

TypeScript provides a useful shortcut for declaring and initializing class properties directly inside the constructor.

Instead of writing:

```ts
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

You can write:

```ts
class User {
  constructor(
    public name: string,
    public age: number,
  ) {}
}

const user = new User("Osheen", 21);

console.log(user.name);
```

TypeScript automatically declares and initializes those properties.

You can also use `private`, `protected`, and `readonly` here.

## 11. Complete Class Structure — Quick Revision

| Concept             | Syntax                           |
| ------------------- | -------------------------------- |
| Declare class       | `class User {}`                  |
| Create instance     | `new User()`                     |
| Constructor         | `constructor()`                  |
| Public property     | `public name: string`            |
| Private property    | `private name: string`           |
| Protected property  | `protected name: string`         |
| Readonly property   | `readonly id: number`            |
| Inheritance         | `class Admin extends User {}`    |
| Parent constructor  | `super()`                        |
| Static member       | `static count = 0`               |
| Getter              | `get name()`                     |
| Setter              | `set name(value)`                |
| Abstract class      | `abstract class User {}`         |
| Implement interface | `class Admin implements User {}` |

## 12. When should you use classes in real projects?

Since you're learning TypeScript for application development, here are some practical examples.

| Scenario                    | Class use                       |
| --------------------------- | ------------------------------- |
| Payment system              | Payment processing classes      |
| Banking application         | Bank account management         |
| Game development            | Player, Enemy, Character        |
| Authentication              | Authentication services         |
| Database operations         | Service and repository classes  |
| Object-oriented application | Encapsulating data and behavior |

One important point: not every application needs classes. In React and Next.js, functional components and functions are generally preferred for UI and application logic. Classes are still useful for certain services, SDKs, object-oriented domain models, and error handling.

Main takeaway: Classes combine properties and methods into reusable objects. The most important concepts to master are constructors, `this`, access modifiers, inheritance, `static`, abstract classes, and interfaces.

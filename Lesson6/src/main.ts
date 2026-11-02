// Classes

// Properties and methods are called members of the class

class Coder {
  // member declaration
  // name: string
  // music: string
  // age: number
  // lang: string
  secondLang!: string; // we are not going initializing it

  // member initializer
  constructor(
    // visibility modifiers also known as access modifiers
    public readonly name: string, // public can be access anywhere and readonly mean it can be read only
    // but cam't be modified
    public music: string, // public to all anywhere withing the code
    private age: number, // private can be access only within the class and it is compile time restriction
    // for java script runtime enforced fields use '#'
    protected lang: string = "TypeScript", // making it default and optional if not provide default will be set off else set to the provided value
    // basically it will become optional with ? at and after the lang keyword
    // protected can be access only within the class and it's subClasses only
  ) {
    ((this.name = name),
      (this.music = music),
      (this.age = age),
      (this.lang = lang));
  }

  public getAge(): string {
    return `Hello , I am ${this.age}`;
  }
}

const Osheen = new Coder("Osheen Jain", "Smooth-Relaxing", 21, "TypeScript");

console.log(Osheen.getAge());

class WebDev extends Coder {
  constructor(
    public computer: string,
    name: string,
    music: string,
    age: number,
  ) {
    // needs to call super first to set all the members coming from the parent class
    super(name, music, age);
    this.computer = computer;
  }

  public getLang() {
    return `I write ${this.lang}`;
  }

  // public getAge(): string {
  //     return `Hello , I am ${this.age}`// can't be accessed as it is private can only be access at parent class or initialized using the super for child
  // }
}

const abc = new WebDev("Windows", "abc", "Lofi", 22);

console.log(abc.getLang()); // Return the default in parent class

// can't access it like that as private and protected
// console.log(abc.age)
// console.log(abc.lang)

/////////////////////////////////////////////////

// Interfaces

interface Racer { 
    name: string,
    car: string, 
    drive(action: string): string
}


class Driver implements Racer {
    name: string,
    car: string
    
    constructor(name: string , car: string) {
        this.name = name
        this.car = car
    }

    drive(action: string): string {
        return `${this.name} is ${action} the ${this.car}`
    }
}

const abc1 = new Driver('abc1' , 'Bugatti')

console.log(abc1.drive('driving'))

/////////////////////////////////////////

// static property declaration

// static property is accessible directly there is no need to initialize a instance of the class for it
// and in method of class member can be access using the class name itself only

class Peeps {
    static count: number = 0

    static getCount(): number {
        return Peeps.count;
    }

    public id: number

    constructor(public name: string){
        this.name = name
        this.id = ++Peeps.count
    }
}

console.log(Peeps.getCount());


const a = new Peeps('a');
const b = new Peeps('b');
const c = new Peeps('c');

console.log(a.id);
console.log(b.id);
console.log(c.id);

console.log(Peeps.count);

////////////////////////////////////////

// getters ans setters

class Bands {
    private dataState: string[]

    constructor(){
        this.dataState = []
    }

    public get data(): string[] {
        return this.dataState
    }

    public set data(value: string[]) {
        if(Array.isArray(value) && value.every(element => typeof element === 'string')){
            this.dataState = value
            return
        }else{
            throw new Error('parameter is not an array or not a array of strings')
        }
    }
}

const myBands = new Bands()
myBands.data = ['abc' , 'xyz']
console.log(myBands.data)
myBands.data = [...myBands.data , 'pqr']
console.log(myBands.data)
// myBands.data = ['jkl' , 5150] // give error here and in console too as throw error


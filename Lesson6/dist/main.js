// Classes
// Properties and methods are called members of the class
class Coder {
    name;
    music;
    age;
    lang;
    // member declaration
    // name: string
    // music: string
    // age: number
    // lang: string
    secondLang; // we are not going initializing it
    // member initializer
    constructor(
    // visibility modifiers also known as access modifiers
    name, // public can be access anywhere and readonly mean it can be read only
    // but cam't be modified
    music, // public to all anywhere withing the code
    age, // private can be access only within the class and it is compile time restriction
    // for java script runtime enforced fields use '#'
    lang = "TypeScript") {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
        ((this.name = name),
            (this.music = music),
            (this.age = age),
            (this.lang = lang));
    }
    getAge() {
        return `Hello , I am ${this.age}`;
    }
}
const Osheen = new Coder("Osheen Jain", "Smooth-Relaxing", 21, "TypeScript");
console.log(Osheen.getAge());
class WebDev extends Coder {
    computer;
    constructor(computer, name, music, age) {
        // needs to call super first to set all the members coming from the parent class
        super(name, music, age);
        this.computer = computer;
        this.computer = computer;
    }
    getLang() {
        return `I write ${this.lang}`;
    }
}
const abc = new WebDev("Windows", "abc", "Lofi", 22);
console.log(abc.getLang()); // Return the default in parent class
class Driver {
    name;
    car;
    constructor(name, car) {
        this.name = name;
        this.car = car;
    }
    drive(action) {
        return `${this.name} is ${action} the ${this.car}`;
    }
}
const abc1 = new Driver('abc1', 'Bugatti');
console.log(abc1.drive('driving'));
/////////////////////////////////////////
// static property declaration
// static property is accessible directly there is no need to initialize a instance of the class for it
// and in method of class member can be access using the class name itself only
class Peeps {
    name;
    static count = 0;
    static getCount() {
        return Peeps.count;
    }
    id;
    constructor(name) {
        this.name = name;
        this.name = name;
        this.id = ++Peeps.count;
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
    dataState;
    constructor() {
        this.dataState = [];
    }
    get data() {
        return this.dataState;
    }
    set data(value) {
        if (Array.isArray(value) && value.every(element => typeof element === 'string')) {
            this.dataState = value;
            return;
        }
        else {
            throw new Error('parameter is not an array or not a array of strings');
        }
    }
}
const myBands = new Bands();
myBands.data = ['abc', 'xyz'];
console.log(myBands.data);
myBands.data = [...myBands.data, 'pqr'];
console.log(myBands.data);
export {};
// myBands.data = ['jkl' , 5150] // give error here and in console too as throw error
//# sourceMappingURL=main.js.map
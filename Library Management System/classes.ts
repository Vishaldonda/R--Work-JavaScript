console.log("Library management system");

// classes
// access modifiers : modifiers which affect visibility.
// ineritance
// namespace

class Person {
    name: string;   
    age: number;    
    private bloodgroup : string;

    constructor(name: string, age: number, bloodgroup: string) {
      this.name = name;
      this.age = age;
      this.bloodgroup = bloodgroup;
    }

    // public constructor(public name: string, public age:number, private bloodgroup :string) {} 

    public getBloodGroup():string{
        return this.bloodgroup
    }
}

class Employee extends Person{
    
}

const p1 = new Person("vishal",25,"O+");
console.log(p1.name,p1.age)
console.log(p1.getBloodGroup()) // accesible
// console.log(p1.name,p1.age,p1.bloodgroup) // allows access only with in a class
// 

// three main visibility modifiers
// public - (default) : allow acess form anywhere
// private - allows access only with in a class
// protected - allows only class memebers from itself or classes inhert it
// ( private readonly name: string; ) readonly keyword can prevent class members from being changed


// - implements keyword in TypeScript is used only with interfaces or abstract classes to enforce a specific structure on a class.
// - unlike extends, implements does not inherit behavior but rather ensures that a class follows the required structure
// - A class can only extends one other class.
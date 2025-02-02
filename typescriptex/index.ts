
//console.log(" Hello ")

let firstName: string = "Dylan";
let id: number = 999;
// In TypeScript, types are declared explicitly (or inferred) at compile time, which allows TypeScript to give you type safety
// automatically : This is called Type Inference in TypeScript. So, you don’t need to explicitly declare string or number
console.log(firstName,id)
console.log(typeof(firstName),typeof(id))

// interface
// An interface in TypeScript is a way to define the shape or structure of an object.
// It specifies what properties an object must have and their types.

interface Person {
    firstName: string;
    lastName: string;
    age: number;
}

const person: Person = { // type Person - it must have the structure defined by the Person interface.
    firstName: "Dylan",
    lastName: "Smith",
    age: 25
};

console.log(person);


const greet =  (firstName : string) =>{
    return `Hello, ${firstName}`;
}

const greetPerson = (person: Person): string => {
    return `Hello, ${person.firstName} ${person.lastName}`;
};

console.log(greet(person.firstName));
console.log(greetPerson(person));

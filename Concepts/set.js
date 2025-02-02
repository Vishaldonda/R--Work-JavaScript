// sets
// iterable

const letters = new Set();

letters.add('a')
letters.add('d')
letters.add('d') // doesn throw an error
letters.add('c')

console.log(letters)
console.log(typeof(letters))


//weak sets 
// It is not iterable
// WeakSet only accepts objects
// memory eff - garbage collected if there is no other reference to them

// -  takes an iterable of objects as its argument.

let myWeakSet = new WeakSet();
let obj1 = {'a':2};
let obj2 = {};

myWeakSet.add(obj1);
myWeakSet.add(obj2);
console.log(myWeakSet)
console.log(myWeakSet.has(obj1))

// not iterable
// for (var obj in myWeakSet){
//     console.log("obj",obj)
// }
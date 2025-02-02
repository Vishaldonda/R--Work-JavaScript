// map
// - map() does not change the original array.


const numbers = [65, 44, 12, 4];
// const newArr = numbers.map(myFunction) // applies the fucntion insed to each element by iterating 
const newArr = numbers.map(String) // convert into strings

console.log(newArr)


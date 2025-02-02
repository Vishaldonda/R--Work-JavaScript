const letters = new Set();
const  val = 45;

// add elements to the set
letters.add('a')
letters.add('b')
letters.add('c')


function addElement(letterscopy,valcopy){
    letterscopy.add('d');
    valcopy = 999;
}

addElement(letters,val,'\n')

console.log(letters,val)
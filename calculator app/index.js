// console.log("hello World")
// console.log("prime numbers upto 100")

// debugger

function getValues(){
    var num1 = document.getElementById('num1');
    num1val = Number(num1.value)   
    var num2 = document.getElementById('num2');
    num2val = Number(num2.value)
    // console.log(num1val,num2val)
    return [num1val,num2val];
}

function addFunction(){
    const [val1,val2] = getValues();
    sum = val1+val2;
    // console.log("SUM IS", sum,  num1, num2);
    document.getElementById('output').innerText = sum;    
}


function subFunction(){
    const [val1,val2]= getValues();
    sub = val1-val2;
    // console.log( "SUB IS",sub, num1val,num2val)
    document.getElementById('output').innerText = sub;    
}

function mulFunction(){
    const [val1,val2] = getValues();
    // console.log(num1val,num2val)
    mul = val1*val2;
    document.getElementById('output').innerText = mul;    
}

function divFunction(){
    const [val1,val2] = getValues();
    div = val1/val2;
    document.getElementById('output').innerText = div;    
}
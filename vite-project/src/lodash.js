import _ from 'lodash';

export function printlodash(element) {
    // Requiring the lodash library  

    // Given object
    let object = { 'c': [{ 'python': { 'java': 3 } }] };

    // Use of _.get method 
    console.log(_.get(object, 'c[0].python.java')); 
    const value = _.get(object, 'c[0].python.java');
    element.innerHTML = `Lodash : Here is :${value}`;

}

// install the lodash plugin
// chart.js
// bar chart in students table
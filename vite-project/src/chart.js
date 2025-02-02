import Chart from 'chart.js/auto';
import {setupTable} from './table.js'


export async function setupChart(element) {
    
    console.log("here is table data", await setupTable());
    var apidata = await setupTable();

    var names = [];
    var grade = [];
    for (let person of apidata) {
        names.push(person.name);
        grade.push(person.grade);
    }
    console.log("names",names);
    console.log("grade",grade)

    var gradeval = [];
    var marks = {'A':100,'B':90,'C':80,'D':70,'E':60};

    for (let i=0;i<grade.length;i++){
        gradeval[i] = marks[grade[i]];
    }

    print("gradeVal", gradeval);

    element.innerHTML = '<canvas></canvas>';
    const canvas = element.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    // Sample data for the bar chart
    const data = { 
        labels: names, //['Anna', 'Bob', 'Chipher', 'Doe', 'Eric'], // names
        datasets: [{
            label: 'Student Scores',
            data: [85, 72],  // grade
        }]
    };

    // Chart configuration
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    

    // Create and render the chart
    new Chart(ctx, config);
}

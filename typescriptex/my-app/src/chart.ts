import Chart, {ChartConfiguration} from 'chart.js/auto';
import axios from 'axios';

export async function setupChart(element: HTMLElement) {
    
    interface Student {
        A: number;
        name: string;
        age: number;
        grade: string;
        mark: number;
    }

    async function GetAPI(): Promise<Student[]> {
        const endpointURL = "http://localhost:3000/students/marks"

            const prom = new Promise <Student[]>(async (resolve, reject) => {
            try{
                const response = await axios.get<Student[]>(endpointURL)
                    setTimeout(() => {
                        if (response.data) {
                            resolve(response.data);
                        }
                        else {
                            reject("failed");
                        }
                    }, 2000); 
            }catch (error) {
                reject(error);
            }
            });
            const resp = await prom;            
            console.log(resp); 
            return resp
    }    

    
    async function fetchJsonAPIData(): Promise<Student[]> {
        var responseJsonResult : Student[] = await GetAPI()
        console.log("Display Data: ",responseJsonResult)        
        
        return responseJsonResult
    }

    var apidata : Student[] = await fetchJsonAPIData();

    var names : string[] = [];
    var mark : number[] = [];

    for (let person of apidata) {
        names.push(person.name);
        mark.push(person.mark);
    }
    console.log("names",names);
    console.log("mark",mark)

    element.innerHTML = '<canvas></canvas>';

    const canvas = element.querySelector('canvas');
    const ctx = canvas?.getContext('2d');

    if (ctx) {
        // Sample data for the bar chart
        const data = {
            labels: names, //['Anna', 'Bob', 'Chipher', 'Doe', 'Eric'], // names
            datasets: [{
                label: 'Student Scores',
                data: mark,  // grade
            }]
        };

        // Chart configuration
        const config : ChartConfiguration<'bar', number[], string> = {
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
    } else {
        console.error('Unable to get canvas context');
    }
}
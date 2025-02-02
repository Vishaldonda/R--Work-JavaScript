import Chart, { ChartConfiguration } from 'chart.js/auto';
import axios from 'axios';
import { z } from "zod";
// used for data validation

export async function setup(element: HTMLElement) {
    interface Student {
        id: number;
        name: string;
        age: number;
        grade: string;
        mark: number;
    }

    function fetchTable(arrData: Student[]) {

        var tablebody: HTMLTableElement | null = document.querySelector("#table-body");
        //var table = document.querySelector("table-body")

        if (tablebody) {
            tablebody.innerHTML = "";
            for (let i = 0; i < arrData.length; i++) {

                var row = tablebody.insertRow(-1);

                // Insert new cells 
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);

                // Add some text to the new cells:
                cell1.innerHTML = arrData[i]["id"].toString();
                cell2.innerHTML = arrData[i]["name"];
                cell3.innerHTML = arrData[i]["age"].toString();
                cell4.innerHTML = arrData[i]["grade"];
                cell5.innerHTML = '<button class="editButton" onclick="editButton(' + i + ')">Edit</button>'
                cell6.innerHTML = '<button class="deleteButton" onclick="deleteButton(' + arrData[i]["id"] + ')">Delete</button>'
            }
        }
    }

    // Make a GET request to the root path of the API
    const endpointURL = "http://localhost:3000/students/marks";

    // const chartDataPromise = new Promise<Student[]>(async (resolve, reject) => {
    //     try {
    //         const response = await axios.get<Student[]>(endpointURL)
    //         setTimeout(() => {
    //             if (response.data) {
    //                 resolve(response.data);
    //             }
    //             else {
    //                 reject("failed");
    //             }
    //         }, 2000);
    //     } catch (error) {
    //         reject(error);
    //     }
    // });

    // const chartDataPromise = new Promise<Student[]>(async (resolve, reject) => {
    //     const response = await axios.get<Student[]>(endpointURL)
    //     if (response.data) {
    //         resolve(response.data);
    //     }
    //     else {
    //         reject("failed");
    //     }
    // });

    // const tableDataPromise = new Promise<Student[]>(async (resolve, reject) => {
    //     const response = await axios.get<Student[]>(endpointURL)
    //     if (response.data) {
    //         resolve(response.data);
    //     }
    //     else {
    //         reject("failed");
    //     }
    // });

    // Make a GET request to the root path of the API

    // const tableDataPromise  = new Promise<Student[]>(async (resolve, reject) => {
    //     try {
    //         const response = await axios.get<Student[]>(endpointURL)
    //         setTimeout(() => {
    //             if (response.data) {
    //                 resolve(response.data);
    //             }
    //             else {
    //                 reject("failed");
    //             }
    //         }, 2000);

    //     } catch (error) {
    //         reject(error);
    //     }
    // });

    const chartDataPromise = axios.get<Student[]>(endpointURL);
    const tableDataPromise = axios.get<Student[]>(endpointURL);
    
    const [chartData, tableData] = await Promise.all([chartDataPromise, tableDataPromise]);
    
    // console.log("c1",chartDataPromise);
    // console.log("c2",tableData);

    async function fetchJsonAPIDataTable() {
        var responseJsonResult : Student[] = tableData.data
        console.log("Display Data stored: ", responseJsonResult)
        fetchTable(responseJsonResult);
    }

    async function fetchJsonAPIDatachart() {
        var responseJsonResultChart: Student[] = chartData.data;
        return responseJsonResultChart;
    }

    // -----chart
    async function buildChart() {

        var apidata: Student[] = await fetchJsonAPIDatachart();
        var names: string[] = [];
        var mark: number[] = [];


        for (let person of apidata) {
            names.push(person.name);
            mark.push(person.mark);
        }
        console.log("names", names);
        console.log("mark", mark);

        // Check data types of data parsed through API's
        //----------- zod test
        const Schemanames = z.array(z.string());
        const Schemamarks = z.array(z.number());
                
        Schemanames.parse(names); // => passes if data is strings
        Schemamarks.parse(mark); // => passes if data is numbers
        //-------------------------------------------------------

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
            const config: ChartConfiguration<'bar', number[], string> = {
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

    fetchJsonAPIDataTable()
    buildChart()

}

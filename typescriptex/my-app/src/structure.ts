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
                cell5.innerHTML = '<button class= "editButton"  onclick="editButton(this)"  tuple-id=' + arrData[i]["id"] + ' >Edit</button>'
                cell6.innerHTML = '<button class="deleteButton" onclick="deleteButton(this)" tuple-id=' + arrData[i]["id"] + '>Delete</button>'
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

    async function fetchJsonAPIDataTable() {
        var responseJsonResult: Student[] = tableData.data
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


    // ------edit button 

    const editButtons = document.getElementsByClassName('editButton')

    for (var i = 0; i < editButtons.length; i++) {
        // console.log("here", editButtons[i]);
        let tupleID = editButtons[i].getAttribute("tuple-id") as string;
        editButtons[i]?.addEventListener('click', () => editButton(tupleID));
    }


    const deleteButtons = document.getElementsByClassName('deleteButton')

    for (var i = 0; i < deleteButtons.length; i++) {
        // console.log("here", deleteButtons[i]);
        let tupleID = deleteButtons[i].getAttribute("tuple-id") as string;
        deleteButtons[i]?.addEventListener('click', () => deleteButton(tupleID));
    }


    async function editButton(tid: string) {
        let tupid: number = Number(tid)
        console.log("edit function clicked", tupid);

        const tableElement = document.getElementById("Table") as HTMLElement | null;
        const addElement = document.getElementById("ADD") as HTMLElement | null;
        const addtab = document.getElementById("add-tab") as HTMLElement | null;
        // const tabletab = document.getElementById("table-tab") as HTMLElement | null;
        const edittab = document.getElementById("edit-tab") as HTMLElement | null;
        const editElement = document.getElementById("Edit") as HTMLElement | null;
        const tupleElement = document.getElementById("tuple-number") as HTMLElement | null;



        tupleElement!.style.display = "none"; // show us the id
        // if (tableElement && addElement && editElement) {
        addtab!.style.display = "none";
        // tabletab!.style.display = "none";
        edittab!.style.display = "block";
        addElement!.style.display = "none";
        tableElement!.style.display = "none";
        editElement!.style.display = "block";
        // } else {
        // console.error("Not found");

        //fetch data according to id

        async function fetchdata() {
            let endpointURL = "http://localhost:3000/students/marks";
            let respjson = await axios.get(endpointURL);
            console.log("get data", respjson.data);
            return respjson.data
        }

        let resp: any = await fetchdata() // fetched the response

        console.log("resp", resp, "tupid", tupid)
        console.log(resp[tupid])

        // let currresp = resp[tupid]
        let currresp;
        for (let i = 0; i < resp.length; i++) {
            if (resp[i].id === tupid) {
                currresp = resp[i];
                break;
            }
        }

        var nameV = currresp["name"]
        var ageV = currresp["age"]
        var gradeV = currresp["grade"]
        //var markV = currresp["mark"]

        var tuplenumber: any = document.getElementById('tuple-number') as HTMLElement;
        tuplenumber.value = tupid
        var name: any = document.getElementById('edit-name') as HTMLElement;
        name.value = nameV
        var age: any = document.getElementById('edit-age') as HTMLElement;
        age.value = ageV
        var grade: any = document.getElementById('edit-grade') as HTMLElement;
        grade.value = gradeV

    }

    async function deleteButton(tid: string) {
        let tupid: number = Number(tid)
        console.log("delete function clicked (id)", tupid);

        let endpointURL = "http://localhost:3000/students";
        var idval = tupid;

        let newEndPointURL = endpointURL + '/' + idval + ''
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const response = await fetch(newEndPointURL, {
            method: "DELETE",
            headers: myHeaders,
        });

        if (response.ok) {
            document.getElementById("table-body")!.innerHTML = "";
            setup(document.querySelector("#chart")!);
        }
        else {
            console.log("Delete Record Unsucessfull");
        }
    }

}

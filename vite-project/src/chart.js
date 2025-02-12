import Chart from 'chart.js/auto';
// import {setupTable} from './table.js'

export async function setupTable() {
    // --------------------------------------------
    // get data from 

    async function fetchTable(arrData) {

        for (let i = 0; i < arrData.length; i++) {

            var table = document.getElementById("table-body")
            var row = table.insertRow(-1);

            // Insert new cells 
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5)

            // Add some text to the new cells:
            cell1.innerHTML = arrData[i]["id"];
            cell2.innerHTML = arrData[i]["name"];
            cell3.innerHTML = arrData[i]["age"];
            cell4.innerHTML = arrData[i]["grade"];
            cell5.innerHTML = '<button class="editButton" onclick="editButton(this)"  tuple-id=' + arrData[i]["id"] + ' >Edit</button>'
            cell6.innerHTML = '<button class="deleteButton" onclick="deleteButton(this)"  tuple-id=' + arrData[i]["id"] + ' >Delete</button>'
        }

        const editButtons = document.getElementsByClassName('editButton')
        for (var i = 0; i < editButtons.length; i++) {
            // console.log("here", editButtons[i]);
            let tupleID = editButtons[i].getAttribute("tuple-id");
            editButtons[i].addEventListener('click', () => editButton(tupleID));
        }

        const deleteButtons = document.getElementsByClassName('deleteButton')
        for (var j = 0; j < deleteButtons.length; j++) {
            // console.log("here", deleteButton[j]);
            let tupleID = deleteButtons[j].getAttribute("tuple-id");
            deleteButtons[j].addEventListener('click', () => deleteButton(tupleID));
        }

        async function editButton(i) {

            document.getElementById("Edit").style.display = "block";
            console.log(i, "Edit Button Clicked")

            var endpointURL = "http://localhost:3000/students/" + i
            // console.log(endpointURL)
            var response = await fetch(endpointURL);
            const responseJson = await response.json()
            console.log("responseJson : ", (responseJson))

            var id = responseJson["id"]
            var name = responseJson["name"]
            var age = responseJson["age"]
            var grade = responseJson["grade"]
            console.log(id, name, age, grade)

            document.getElementById("Table").style.display = "none";
            document.getElementById("ADD").style.display = "none";
            document.getElementById("edit-tab").style.display = "block";
            document.getElementById("Edit").style.display = "block";
            document.getElementById("tuple-number").style.display = "none";
            document.getElementById("edit-id").style.display = "none";
            

            document.getElementById("tuple-number").value = id
            document.getElementById("edit-id").value = id
            document.getElementById("edit-name").value = name
            document.getElementById("edit-age").value = age
            document.getElementById("edit-grade").value = grade

            //    fetchJsonAPIDataEdit(i) // will update the tabel freshly with server data
        }

        async function deleteButton(i) {
            console.log(i, "Edit Button Clicked")
            var idval = i;

            var endpointURL = "http://localhost:3000/students/" + idval
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const response = await fetch(endpointURL, {
                method: "DELETE",
                headers: myHeaders,
            });

            document.getElementById("table-body").innerHTML = "";
            await setupChart(document.querySelector('#chart'))
            
        }

    }

    async function GetAPI() {
        var endpointURL = "http://localhost:3000/students";
        var response = await fetch(endpointURL);
        const responseJson = await response.json()
        console.log("responseJson : ", (responseJson))
        return responseJson
    }


    async function fetchJsonAPIData() {
        var responseJsonResult = await GetAPI()
        console.log("Display Data stored: ", responseJsonResult)
        fetchTable(responseJsonResult);
        return responseJsonResult;
    }

    // ------edit button 
    return await fetchJsonAPIData()
    // console.log("here is response", resp)
    // return resp;

    //-----------------------------------------------
}

export async function setupChart(element) {

    // console.log("here is table data", await setupTable());
    var apidata = await setupTable(); // call the updated table version

    var names = [];
    var grade = [];
    for (let person of apidata) {
        names.push(person.name);
        grade.push(person.grade);
    }
    console.log("names", names);
    console.log("grade", grade)

    var gradeval = [];
    var marks = { 'A': 100, 'B': 90, 'C': 80, 'D': 70, 'E': 60 , 'F' : 50};

    for (let i = 0; i < grade.length; i++) {
        if (marks[grade[i]] !== undefined) {
            gradeval[i] = marks[grade[i]];
        } else {
            gradeval[i] = 0;
        }
    }

    console.log("gradeVal", gradeval);

    element.innerHTML = '<canvas></canvas>';
    const canvas = element.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    // Sample data for the bar chart
    const data = {
        labels: names, //['Anna', 'Bob', 'Chipher', 'Doe', 'Eric'], // names
        datasets: [{
            label: 'Student Scores',
            data: gradeval,  // grade
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

export async function addedTOServer() {
    var endpoint = "http://localhost:3000/students";
    console.log("add record triggered")
    async function addDataToAPI() {

        var name = document.getElementById('name');
        var nameval = name.value

        var age = document.getElementById('age');
        var ageval = age.value

        var grade = document.getElementById('grade');
        var gradeval = grade.value

        var ObjectData = {
            name: nameval,
            age: ageval,
            grade: gradeval
        }

        console.log("new reocrd data", ObjectData)

        //post method
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const response = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(ObjectData),
            headers: myHeaders,
        });

        document.getElementById("table-body").innerHTML = "";
        // fetchJsonAPIData()

        document.getElementById("ADD").style.display = "none";
        document.getElementById("Table").style.display = "block";
        document.getElementById("chart").style.display = "block";
    }
    await addDataToAPI();
    await setupChart(document.querySelector('#chart'))
}

export async function updateServer() {
    //document.getElementById("tuple-number")
    var idval = document.getElementById("edit-id").value
    var nameval = document.getElementById("edit-name").value
    var ageval = document.getElementById("edit-age").value
    var gradeval = document.getElementById("edit-grade").value
    // console.log(id, name, age, grade)

    var ObjectData = {
        id: idval,
        name: nameval,
        age: ageval,
        grade: gradeval
    }

    console.log("data", ObjectData)
    var endpoint = 'http://localhost:3000/students/'

    // update the record
    var newEndPointURL = endpoint + idval
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(newEndPointURL, {
        method: "PUT",
        body: JSON.stringify(ObjectData),
        headers: myHeaders,
    });

    document.getElementById("table-body").innerHTML = "";
    await setupChart(document.querySelector('#chart'))


    document.getElementById("Edit").style.display = "none";
    document.getElementById("Table").style.display = "block";
    document.getElementById("add-tab").style.display = "block";
    document.getElementById("table-tab").style.display = "block";
    document.getElementById("edit-tab").style.display = "none";
}

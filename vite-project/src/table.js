export async function setupTable() {
    // --------------------------------------------
    // get data from 

        
    function fetchTable(arrData){

        for (let i = 0; i < arrData.length; i++){
        
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
        cell5.innerHTML = '<button class="editButton" onclick="editButton('+i+')">Edit</button>'
        cell6.innerHTML = '<button class="deleteButton" onclick="deleteButton('+arrData[i]["id"]+')">Delete</button>'
        }    
    }
 
    async function GetAPI() {
        var endpointURL = "http://localhost:3000/students";
        var response = await fetch(endpointURL);
        const responseJson= await response.json()
        console.log("responseJson : ",(responseJson))
        return responseJson
    }     

    
    async function fetchJsonAPIData(){
        var responseJsonResult = await GetAPI()
        console.log("Display Data stored: ",responseJsonResult)
        fetchTable(responseJsonResult);
        return responseJsonResult;
    }

    
    const resp = await fetchJsonAPIData()
    console.log("here is response", resp)
    return resp;

//-----------------------------------------------
}
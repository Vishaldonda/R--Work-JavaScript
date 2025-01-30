document.getElementById("edit-id").style.display = "none";
document.getElementById("tuple-number").style.display = "display";
document.getElementById("Edit").style.display = "none";
document.getElementById("edit-tab").style.display = "none";
document.getElementById("ADD").style.display = "none";


var endpoint = "http://localhost:3000/students";

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

// Make a GET request
async function GetAPI() {
    response = await fetch(endpoint);
    const responseJson= await response.json()
    console.log("responseJson : ",(responseJson))
    return responseJson
}        

async function fetchJsonAPIData(){
    var responseJsonResult = await GetAPI()
    console.log("Display Data stored: ",responseJsonResult)
    fetchTable(responseJsonResult);
}


fetchJsonAPIData()

function alterTab2(){  
    document.getElementById("Table").style.display = "none";
    document.getElementById("ADD").style.display = "block"; 
    document.getElementById("Edit").style.display = "None";          
}

function alterTab1(){
    document.getElementById("ADD").style.display = "none";
    document.getElementById("Table").style.display = "block";
    document.getElementById("Edit").style.display = "None"; 
}

// Add new element to the server -------------------------------------------------------
function addedTOServer(){    
    var endpoint = "http://localhost:3000/students";
    
    async function addDataToAPI(){

        var name = document.getElementById('name');
        nameval = name.value 

        var age = document.getElementById('age');
        ageval = age.value 

        var grade = document.getElementById('grade');
        gradeval = grade.value 

        ObjectData =  {
            name : nameval,
            age : ageval,
            grade : gradeval
        }

        console.log("new reocrd data",ObjectData)
        
        //post method
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const response = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(ObjectData),
            headers: myHeaders,
        });

        document.getElementById("table-body").innerHTML = "";
        fetchJsonAPIData()
        
        document.getElementById("ADD").style.display = "none";
        document.getElementById("Table").style.display = "block";
    }
    addDataToAPI();
}

// Function to replace values of PlaceHolder in edit tab -------------------------------------------------------

async function fetchJsonAPIDataEdit(i){
    var responseJsonResult = await GetAPI()
    
    console.log("Data STORAGE : ",responseJsonResult)
    
    responseJsonResult = responseJsonResult[i];

    idval = (responseJsonResult["id"])
    nameval = (responseJsonResult["name"])
    ageval = (responseJsonResult["age"])
    gradeval = (responseJsonResult["grade"])

    // placed those values
    document.getElementById("edit-id").value = idval;
    document.getElementById("edit-name").value = nameval;
    document.getElementById("edit-age").value = ageval;
    document.getElementById("edit-grade").value = gradeval;
    document.getElementById("tuple-number").value = idval;
    //fetchTable(responseJsonResult);
}

// Call Function to replace values of PlaceHolder in edit tab -------------------------------------------------------

// Function to Trigger when we click on edit Button

function editButton(i){
         
    document.getElementById("Edit").style.display = "block";  

    console.log(i,"Edit Button Clicked")
    
    document.getElementById("Table").style.display = "none";
    document.getElementById("ADD").style.display = "none"; 
    document.getElementById("edit-tab").style.display = "none";
    document.getElementById("Edit").style.display = "block"; 

    async function editDataToAPi(i){
        fetchJsonAPIDataEdit(i) // will update the tabel freshly with server data
    }
    editDataToAPi(i)
}

async function updateServer(){

    // console.log("tuple value(id of the element) :",i)

    var idval = document.getElementById('tuple-number').value;
    
    var nameval = document.getElementById('edit-name').value;
    var ageval = document.getElementById('edit-age').value;
    var gradeval = document.getElementById('edit-grade').value;

    ObjectData = {
            id : idval,
            name : nameval,
            age : ageval,
            grade : gradeval
    }

    console.log("data",ObjectData)
    
    // update the record
    newEndPointURL = endpoint +'/'+idval+'' 
    const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const response = await fetch(newEndPointURL, {
            method: "PUT",
            body: JSON.stringify(ObjectData),
            headers: myHeaders,
    });

    document.getElementById("table-body").innerHTML = "";

    
    fetchJsonAPIData()

    document.getElementById("Edit").style.display = "none";
    document.getElementById("Table").style.display = "block";
    document.getElementById("add-tab").style.display = "block";
    document.getElementById("table-tab").style.display = "block";
}

// delete api request the entire record (2)
async function deleteJsonAPIDataEdit(i){
    console.log("ivalue in delete",i)

    var idval = i; 

    newEndPointURL = endpoint +'/'+idval+'' 
    const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const response = await fetch(newEndPointURL, {
            method: "DELETE",
            headers: myHeaders,
    });

    document.getElementById("table-body").innerHTML = "";
    fetchJsonAPIData()
}

// delete the entire record (1)
function deleteButton(i){    
    console.log(i,"Delete Button Clicked")
    
    async function deleteDataToAPi(i){
        deleteJsonAPIDataEdit(i) // will update the tabel freshly with server data
    }
    deleteDataToAPi(i)
}

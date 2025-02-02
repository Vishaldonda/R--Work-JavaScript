import axios from 'axios';

export async function setupTable() {
    // --------------------------------------------
    // get data from 

    interface User {
        id: number;
        name: string;
        age: number;
        grade: string;
        mark: number;
    }

    function fetchTable(arrData : User[] ){

        var tablebody : HTMLTableElement | null = document.querySelector("#table-body");
        //var table = document.querySelector("table-body")

        if (tablebody) {
            tablebody.innerHTML = "";
            for (let i = 0; i < arrData.length; i++){
                        
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
            cell5.innerHTML = '<button class="editButton" onclick="editButton('+i+')">Edit</button>'
            cell6.innerHTML = '<button class="deleteButton" onclick="deleteButton('+arrData[i]["id"]+')">Delete</button>'
            }    
        }
    }
    
    async function GetAPI(){
        // var endpointURL = "http://localhost:3005/students";
        const endpointURL = "http://localhost:3000/students/marks"
    
        // Make a GET request to the root path of the API
        try{
            // Handle the success response

            const response = await axios.get(endpointURL)
            
            
            console.log(response.data); 
            //console.log(typeof(response.data)); // Object
            //console.log(response.data[0]);
            return response.data
        }
        catch(error){
            console.error(error);
        }
            // Handle the error response
    }    

    
    async function fetchJsonAPIData(){
        var responseJsonResult = await GetAPI()
        console.log("Display Data stored: ",responseJsonResult)        
        // var arrdata = [
        //     {"id":1,"name":"John Doe","age":20,"grade":"A","mark":88},
        //     {"id":2,"name":"Jane Smith","age":22,"grade":"B","mark":61}
        // ]

        const newUser: User[] = responseJsonResult;
        fetchTable(newUser);
        return newUser;
    }
    
    const resp = await fetchJsonAPIData()
    console.log("here is response", resp)
    return resp;

//-----------------------------------------------
}


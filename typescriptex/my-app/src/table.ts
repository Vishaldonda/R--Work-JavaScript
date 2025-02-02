import axios from 'axios';

export async function setupTable() {
    // --------------------------------------------
    // get data from 

    interface Student {
        id: number;
        name: string;
        age: number;
        grade: string;
        mark: number;
    }
        
    function fetchTable(arrData : Student[] ){

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
    
    async function GetAPI(): Promise<Student[]> {
        const endpointURL = "http://localhost:3000/students/marks"
        // Make a GET request to the root path of the API

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

            // Handle the error response
    }    

    
    async function fetchJsonAPIData(){
        var responseJsonResult : Student[] = await GetAPI()
        console.log("Display Data stored: ",responseJsonResult)        
        // var arrdata = [
        //     {"id":1,"name":"John Doe","age":20,"grade":"A","mark":88},
        //     {"id":2,"name":"Jane Smith","age":22,"grade":"B","mark":61}
        // ]

        const newUser: Student[] = responseJsonResult;
        fetchTable(newUser);
        return newUser;
    }
    
    const resp = await fetchJsonAPIData()
    console.log("here is response", resp)
    return resp;

//-----------------------------------------------
}

// http://localhost:3000/students/marks
// feth using axios
 

// import axios from 'axios';

// const endpointURL = "http://localhost:3000/students/marks"

// // Make a GET request to the root path of the API
// axios.get(endpointURL)
//   .then(response => {
//     // Handle the success response
//     console.log(response.data); 
//     console.log(typeof(response.data)); // Object
//     console.log(response.data[0]); 
//   })
//   .catch(error => {
//     // Handle the error response
//     console.error(error);
//   });


import axios from 'axios';

// async function getResults(){
//     async function GetAPI(){
//         // var endpointURL = "http://localhost:3005/students";
//         const endpointURL = "http://localhost:3000/students/marks"
    
//         // Make a GET request to the root path of the API
//         try{
//             // Handle the success response
//             const response = await axios.get(endpointURL)
//             console.log(response.data); 
//             //console.log(typeof(response.data)); // Object
//             //console.log(response.data[0]); 
//             return response.data
//         }
//         catch(error){
//             console.error(error);
//         }
//             // Handle the error response
//     }
//     const resp = await GetAPI()
//     console.log("Here",resp)
// }

interface Student {
    id: number;
    name: string;
    age: number;
    grade: string;
    mark: number;
}

async function GetAPI(){
    const endpointURL = "http://localhost:3000/students/marks"
    // Make a GET request to the root path of the API

    try{
        const prom = new Promise (async (resolve, reject) => {
        const response = await axios.get(endpointURL)
            setTimeout(() => {
                if (response) {
                    // resolve("Succesful fetch");
                    resolve(response);
                }
                else {
                    reject("failed");
                }
            }, 2000);
        });

        const resp :any = await prom;            
        console.log("resp",resp.data); 
        return resp.data;
    }

    catch(error){
        console.error(error);
    }
        // Handle the error response
}    


var responseJsonResult = await GetAPI()
//console.log("Display Data stored: ",responseJsonResult)   
// GetAPI()
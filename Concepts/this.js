class Employee{
    constructor(name,id){
        this.name = name;
        this.id = id;
    }

    displaydetails(){
        console.log(`Hello, my name is ${this.name}`);
        console.log(`Hello, my id is ${this.id}`);
    }

    async getDataFromServer(){
        var endpointURL = "https://run.mocky.io/v3/2e7f616b-897b-402c-867b-eaa9b7e1c785";
        var response = await fetch(endpointURL);
        console.log(response);
        console.log("status :",response.status);
    
        // json only use double quotes
        const responseJson= await response.json()
        console.log("responseJson : ",(responseJson))
        
        const responseEmp =  responseJson["employees"];
        
        // respondse Employees
        //console.log("responseEmp : ",responseEmp)
        
        for(var ind in responseEmp){
            console.log("responseEmp ",ind +":  "+ responseEmp[ind].name)
            console.log("responseEmp ",ind +":  "+ responseEmp[ind].id)
        }
        
        

    }
}

const e1 = new Employee("even","1");
const e2 = new Employee("John","2");

//e1.displaydetails()
//e2.displaydetails()

e1.getDataFromServer()
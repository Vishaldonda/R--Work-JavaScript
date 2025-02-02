import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'
import { setup } from './structure.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>

    <div id="table">
        
        <div class="navBar">
            <div id="table-tab">
                <button>Table</button>
            </div>
        
            <div id="add-tab">
                <button>Add Record</button>
            </div>   

            <div id="edit-tab">
                <button>Edit Record</button>
            </div>       
    </div>

      <div id="Table">       
          <!-- <a href="table.html">Link</a> -->
          <h1> Table </h1>
          
          <table style="width:100%" id="myTable">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Grade</th>
                      <th>Edit</th>
                      <th>Delete</th>
                  </tr>
              </thead>
              <tbody id="table-body">

              </tbody>

          </table>

        <br>
        <br>
  
      </div>


        <div id="ADD">
        
        <input type="text" id="name" placeholder="name">
        <input type="text" id="age" placeholder="age">
        <input type="text" id="grade" placeholder="grade">
        <input type="text" id="mark" placeholder="mark">
        
        
        <br><br>
        <div>
            <button id="add-data" onclick="addedTOServer()">Submit</button>
        </div>

      </div>

    <div id="Edit">
        <input type="number" id="tuple-number" placeholder="tuple-number">
        <input type="number" id="edit-id" placeholder="id">
        <input type="text" id="edit-name" placeholder="name">
        <input type="text" id="edit-age" placeholder="age">
        <input type="text" id="edit-grade" placeholder="grade">
        

        <br><br>
        <div>
            <button onclick="updateServer()">Submit</button>
        </div>
    </div>
      -----------------------------------------------------------------------------------------


        <div id="chart">
          ...Here is the chart
        </div>

    </div>
  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
setup(document.querySelector("#chart")!);

document.getElementById("edit-id")!.style.display = "none";
document.getElementById("tuple-number")!.style.display = "display";
document.getElementById("Edit")!.style.display = "none";
document.getElementById("edit-tab")!.style.display = "none";
document.getElementById("ADD")!.style.display = "none";

document.getElementById('add-tab')?.addEventListener('click', () => alterTab2());
document.getElementById('table-tab')?.addEventListener('click', () => alterTab1());
document.getElementById('add-data')?.addEventListener('click', () => addedTOServer());

function alterTab2() {
  console.log("triggered function alterTab2");
  const tableElement = document.getElementById("Table");
  const addElement = document.getElementById("ADD");
  const editElement = document.getElementById("Edit");

  if (addElement) {
    addElement.style.display = "block";
  }
  if (tableElement && editElement) {
    tableElement.style.display = "none";
    editElement.style.display = "none";
  }

  console.log(tableElement, addElement, editElement); // Check if elements are being found

}

function alterTab1() {
  console.log("triggered function alterTab1");
  const tableElement = document.getElementById("Table") as HTMLElement | null;
  const addElement = document.getElementById("ADD") as HTMLElement | null;
  const editElement = document.getElementById("Edit") as HTMLElement | null;

  if (tableElement && addElement && editElement) {
    addElement.style.display = "none";
    tableElement.style.display = "block";
    editElement.style.display = "none";
  } else {
    console.error("One or more elements are not found");
  }

}

async function addedTOServer() {
  var endpoint = "http://localhost:3000/students/marks";
  
  var name = document.getElementById('name')  as HTMLInputElement;
  const nameval = name?.value

  const ageElement = document.getElementById('age') as HTMLInputElement;
  const ageval = ageElement ? parseInt(ageElement.value) : NaN;

  const gradeElement = document.getElementById('grade') as HTMLInputElement;
  const gradeval = gradeElement?.value;

  const markElement = document.getElementById('mark') as HTMLInputElement;
  const markval = markElement? parseInt(markElement.value) : NaN;
  

  const ObjectData = {
    name: nameval,
    age: ageval,
    grade: gradeval,
    mark : markval
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

  if (response.ok){
    document.getElementById("table-body")!.innerHTML = "";
  // fetchJsonAPIData()
  setup(document.querySelector("#chart")!);

  document.getElementById("ADD")!.style.display = "none";
  document.getElementById("Table")!.style.display = "block";

  }
}

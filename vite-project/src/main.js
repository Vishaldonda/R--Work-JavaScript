import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { printlodash } from './lodash.js'
import { setupChart} from './chart.js'
import { addedTOServer, updateServer } from './chart.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>

    <div class="card">
      <button id="counter" type="button"></button>
    </div>

    <div id="lodash">
      ...Here is the lodash
    </div>
    
    <div id="table">
      <h1> Java script </h1>
        
        <div class="navBar">
            <div id="table-tab">
                <button>Table</button>
            </div>
        
            <div id="add-tab">
                <button>Add Record</button>
            </div>   

            <div id="edit-tab" onclick="alterTab3()">
                <button>Edit Record</button>
            </div> 
        </div>      
    </div>

    <br>

    <div id="Table">       
        <!-- <a href="table.html">Link</a> -->
        <h2>Add element to the Server </h2>
        
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
    </div>

        <br>
        <br>
        
        <div id="ADD">
            <input type="text" id="name" placeholder="name">
            <input type="text" id="age" placeholder="age">
            <input type="text" id="grade" placeholder="grade">
            
            <br><br>
            <div>
                <button id="addedTOServer">Submit</button>
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
                <button id="updateServer">Submit</button>
            </div>
        </div>
  

      <div id="chart">
        ...Here is the chart
      </div>

      <p class="read-the-docs">
        Click on the Vite logo to learn more
      </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
printlodash(document.querySelector('#lodash'))
// setupTable(document.querySelector('#table'))
setupChart(document.querySelector('#chart'))


document.getElementById("Table").style.display = "block";
document.getElementById("ADD").style.display = "none"; 
document.getElementById("Edit").style.display = "none";          
document.getElementById("chart").style.display = "block"; 
document.getElementById("edit-tab").style.display = "none"; 



function alterTab2(){  
  document.getElementById("Table").style.display = "none";
  document.getElementById("ADD").style.display = "block"; 
  document.getElementById("Edit").style.display = "none";          
  document.getElementById("chart").style.display = "none";          
}

function alterTab1(){
  document.getElementById("ADD").style.display = "none";
  document.getElementById("Table").style.display = "block";
  document.getElementById("Edit").style.display = "none"; 
  document.getElementById("chart").style.display = "block"; 
}


document.getElementById('add-tab').addEventListener('click', alterTab2);
document.getElementById('table-tab').addEventListener('click', alterTab1);
document.getElementById('addedTOServer').addEventListener('click', addedTOServer);
document.getElementById('updateServer').addEventListener('click', updateServer);


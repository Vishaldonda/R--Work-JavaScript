import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { printlodash } from './lodash.js'
import { setupChart } from './chart.js'
import { setupTable } from './table.js'

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
        <div id="table-tab" onclick="alterTab1()">
            <button>Table</button>
        </div>
    
        <div id="add-tab" onclick="alterTab2()">
            <button>Add Record</button>
        </div>   

        <div id="edit-tab" onclick="alterTab3()">
            <button>Edit Record</button>
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

        <br>
        <br>
          
        <div>
            ------------------End Table----------------
        </div>
    </div>
    
    -----------------------------------------------------------------------------------------
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
setupTable(document.querySelector('#table'))
setupChart(document.querySelector('#chart'))
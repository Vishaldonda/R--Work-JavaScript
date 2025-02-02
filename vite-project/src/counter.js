export function setupCounter(element) {
  let counter = 0
  // var unsed = 0;
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0) // initial state
}

// install the lodash plugin
// chart.js
// bar chart in students table
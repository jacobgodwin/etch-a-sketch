// variables
const body = document.querySelector('body');
const canvas = document.getElementById('canvas');
const clearButton = document.getElementById('clearBtn');
const radios = document.querySelectorAll('input[type=radio]');
let slider = document.getElementById('myRange');
let output = document.getElementById('sliderOutput');
let currentStyle = 'normal';
output.innerHTML = slider.value + ' x ' + slider.value;
let gridSize = slider.value;
let numBoxes = gridSize * gridSize;
let dimensions = 600 / gridSize + 'px';

// erases the grid
clearButton.addEventListener('click', eraseGrid);

// slider that creates the size of the grid
slider.oninput = function () {
  output.innerHTML = this.value + ' x ' + this.value;
  gridSize = this.value;
  numBoxes = gridSize * gridSize;
  dimensions = 600 / gridSize + 'px';
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
  createGrid();
  setStyle();
};

// clears the grid
function eraseGrid() {
  let boxes = document.getElementsByClassName('grid');
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.backgroundColor = '#d9d9d9';
    boxes[i].style.opacity = '1';
    boxes[i].count = 0;
  }
}

// creates the grid
function createGrid() {
  for (let i = 0; i < gridSize; i++) {
    let gridRow = document.createElement('div');
    gridRow.classList.add('gridRow');
    canvas.appendChild(gridRow);
    for (let i = 0; i < gridSize; i++) {
      let box = document.createElement('div');
      box.classList.add('grid');
      box.style.width = dimensions;
      box.style.height = dimensions;
      box.style.opacity = '1';
      gridRow.appendChild(box);
      box.count = 0;
    }
  }
  let boxes = document.getElementsByClassName('grid');
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('mouseover', changeColor);
  }
}

// function that handles what each style does
function changeColor(e) {
  if (currentStyle == 'normal') {
    e.target.style.backgroundColor = '#8c8c8c';
  } else if (currentStyle == 'rgb') {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    e.target.style.backgroundColor = `#${randomColor}`;
  } else if ((currentStyle = 'shade')) {
    e.target.style.backgroundColor = '#000000';
    e.target.count += 1;
    e.target.style.opacity = 0.2 * e.target.count;
  }
}

// function to set the style and clear the grid
function setStyle() {
  for (const radio of radios) {
    radio.onclick = function () {
      if (radio.value == 'normal') {
        currentStyle = 'normal';
        eraseGrid();
      } else if (radio.value == 'rgb') {
        currentStyle = 'rgb';
        eraseGrid();
      } else if ((radio.value = 'shade')) {
        currentStyle = 'shade';
        eraseGrid();
      }
    };
  }
}

// initial load behavior
window.onload = function () {
  createGrid();
  // sets default choice for grid as normal styling
  for (const radio of radios) {
    if (radio.value == 'normal') {
      radio.checked = true;
    }
  }
  setStyle();
};

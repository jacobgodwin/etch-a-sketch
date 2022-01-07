const body = document.querySelector('body');
const canvas = document.getElementById('canvas');
const clearButton = document.getElementById('clearBtn');
let slider = document.getElementById('myRange');
let output = document.getElementById('sliderOutput');

output.innerHTML = slider.value + ' x ' + slider.value;
let gridSize = slider.value;
let numBoxes = gridSize * gridSize;
let dimensions = 600 / gridSize + 'px';

slider.oninput = function () {
  output.innerHTML = this.value + ' x ' + this.value;
  gridSize = this.value;
  numBoxes = gridSize * gridSize;
  dimensions = 600 / gridSize + 'px';
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
  createGrid();
};

function eraseGrid() {
  let boxes = document.getElementsByClassName('grid');
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.backgroundColor = '#d9d9d9';
  }
}

clearButton.addEventListener('click', eraseGrid);

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
      gridRow.appendChild(box);
    }
  }
  let boxes = document.getElementsByClassName('grid');
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener(
      'mouseover',
      function () {
        boxes[i].style.backgroundColor = '#8c8c8c';
      },
      false
    );
  }
}

window.onload = createGrid();

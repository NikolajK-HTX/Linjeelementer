let coordinateSystemSize = 20;
let yCoordinateSize = 0;
let arrowDensity = 1;
let arrowStep = coordinateSystemSize/20 * (1 / arrowDensity);

document.querySelector('#coordinateSizeSlider').addEventListener('input', updateGUI);
document.querySelector('#densitySlider').addEventListener('input', updateGUI);

function setup() {
  let canvas = createCanvas(800, 600);
  let canvasHolder = document.querySelector('#canvas-holder');
  canvas.parent(canvasHolder);

  background(220);
  createNewLineElements();
}

function drawGrid() {
  push();
  stroke(0);
  strokeWeight(1);
  line(0, height / 2, width, height / 2);
  line(width / 2, 0, width / 2, height);
  text(coordinateSystemSize, width-15, height/2+12);
  text(coordinateSystemSize, 5, height/2+12);
  pop();
}

function drawArrows() {
  push();
  translate(width/2, height/2);
  yCoordinateSize = (height/width) * coordinateSystemSize;
  for (let x = -coordinateSystemSize; x <= coordinateSystemSize; x += arrowStep) {
    for (let y = -yCoordinateSize; y <= yCoordinateSize; y += arrowStep) {
      let inputFromUser = document.querySelector('#derivateInput').value;
      if (inputFromUser == "") inputFromUser = "x/y";
      let derivative = eval(inputFromUser);
      let newArrow = new Arrow(x, y, derivative);
      newArrow.display();
    }
  }
  pop();
}

function createNewLineElements() {
  background(220);

  readInput();
  
  drawGrid();
  drawArrows();
}

function readInput() {
  let coordinateSizeSlider = document.querySelector('#coordinateSizeSlider');
  coordinateSystemSize = coordinateSizeSlider.value;
  document.querySelector('#coorVal').innerHTML = coordinateSizeSlider.value;

  let densitySlider = document.querySelector('#densitySlider');
  arrowDensity = densitySlider.value/100;
  document.querySelector('#densVal').innerHTML = densitySlider.value;

  arrowStep = coordinateSystemSize/20 * (1 / arrowDensity);
}

function updateGUI() {
  let coordinateSizeSlider = document.querySelector('#coordinateSizeSlider');
  document.querySelector('#coorVal').innerHTML = coordinateSizeSlider.value;

  let densitySlider = document.querySelector('#densitySlider');
  document.querySelector('#densVal').innerHTML = densitySlider.value;

}

class Arrow {
  constructor(x, y, a) {
    this.x = x;
    this.y = y;
    this.a = a;
  }

  display() {
    push();
    translate(this.x * width/(coordinateSystemSize*2), -this.y * height/(yCoordinateSize*2));
    let angle = atan(-this.a);
    rotate(angle);
    rectMode(CENTER);
    fill(50);
    stroke(50);
    rect(0, 0, 8, 2);
    triangle(4, 3, 4, -3, 8, 0);
    pop();
  }
}
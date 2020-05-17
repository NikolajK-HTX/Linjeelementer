let coordinateSystemSize = 20;
let yCoordinateSize = 0;
let arrowDensity = 1;
let arrowStep = coordinateSystemSize / 20 * (1 / arrowDensity);

document.querySelector('#coordinateSizeSlider').addEventListener('input', updateGUI);
document.querySelector('#densitySlider').addEventListener('input', updateGUI);

function setup() {
  let canvas = createCanvas(800, 600);
  let canvasHolder = document.querySelector('#canvas-holder');
  canvas.parent(canvasHolder);

  background(220);
  createNewLineElements();
}

function mousePressed() {
  drawFunction();
}

function drawGrid() {
  push();
  stroke(0);
  strokeWeight(1);
  line(0, height / 2, width, height / 2);
  line(width / 2, 0, width / 2, height);
  text(coordinateSystemSize, width - 15, height / 2 + 12);
  text(coordinateSystemSize, 5, height / 2 + 12);
  pop();
}

function drawArrows() {
  push();
  translate(width / 2, height / 2);
  yCoordinateSize = (height / width) * coordinateSystemSize;
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
  arrowDensity = densitySlider.value / 100;
  document.querySelector('#densVal').innerHTML = densitySlider.value;

  arrowStep = coordinateSystemSize / 20 * (1 / arrowDensity);
}

function updateGUI() {
  let coordinateSizeSlider = document.querySelector('#coordinateSizeSlider');
  document.querySelector('#coorVal').innerHTML = coordinateSizeSlider.value;

  let densitySlider = document.querySelector('#densitySlider');
  document.querySelector('#densVal').innerHTML = densitySlider.value;

}

function drawFunction() {
  let fPoints = [];

  // calculate the points in the function
  // draw a line between all the points
  // draw the point at which is clicked
  push();
  strokeWeight(12);
  stroke(0, 120);
  point(mouseX, mouseY);

  stroke(random() * 255, random() * 255, random() * 255, 100);
  strokeWeight(10);
  point(mouseX, mouseY);
  
  strokeWeight(2);
  stroke(255);
  textAlign(CENTER);
  fill(0);
  // udregn hældning
  // dette er dumt lavet - hvis man ændrer differentialligningen og 
  // laver et punkt er det for den nye differentialligning, mens den
  // gamle stadig vises indtil man trykker INDLÆS igen
  let x = Math.round(((mouseX-width/2) * (coordinateSystemSize*2 / width))*100)/100;
  let y = Math.round(((height-mouseY)-height/2) * (yCoordinateSize*2 / height)*100)/100;
  let inputFromUser = document.querySelector('#derivateInput').value;
  if (inputFromUser == "") inputFromUser = "x/y";
  let haldning = eval(inputFromUser);
  haldning = Math.round(haldning*100)/100;
  text(`x: ${x}`, mouseX, mouseY-30);
  text(`y: ${y}`, mouseX, mouseY-20);
  text(`Hældning: ${haldning}`, mouseX, mouseY - 10);
  pop();

}

class Arrow {
  constructor(x, y, a) {
    this.x = x;
    this.y = y;
    this.a = a;
  }

  display() {
    push();
    translate(this.x * width / (coordinateSystemSize * 2), -this.y * height / (yCoordinateSize * 2));
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
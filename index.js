class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Circle {
  constructor(x, y, radius) {
    this.center = new Vector(x, y);
    this.radius = radius;
  }
}

const input = document.getElementById("sides");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const center = {
  x: canvas.width / 2,
  y: canvas.height / 2
};
const rotateAround = 3 * Math.PI / 2;

drawCanvas();

let reverse = false;
let sides = 0;
let radius = center.y * 0.8;
let shapes = [];

function reset() {
  context.rotate(-(3 * Math.PI / 2));
  context.translate(-center.y, -center.y);
  drawCanvas();
  context.translate(center.y, center.y);
  context.rotate(3 * Math.PI / 2);
}

function draw() {
  reset();
  if (reverse) {
    if (sides != 0) {
      sides -= 1;
    }
  } else {
    sides += 1;
  }
  document.getElementById('noSides').innerText = sides;
  if (sides > 0) {
    shapes = [];
    for (let i = 0; i < sides; i++) {
      shapes.push(new Circle(0, 0, 20));
    }

    for (let i = 0; i < shapes.length; i++) {
      let x1 = radius * Math.cos(Math.PI * (i / (shapes.length / 2)));
      let y1 = radius * Math.sin(Math.PI * (i / (shapes.length / 2)));

      shapes[i].center.x = x1;
      shapes[i].center.y = y1;
    }

    for (let i = 0; i < shapes.length; i++) {
      for (let j = i + 1; j < shapes.length; j++) {
        context.beginPath();
        context.lineWidth = 0.5;
        context.moveTo(shapes[i].center.x, shapes[i].center.y);
        context.lineTo(shapes[j].center.x, shapes[j].center.y);
        context.stroke();
        context.closePath();
      }
    }
  }
}

function drawCanvas() {
  context.fillStyle = "lightgrey";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

let interval;
let started = false;

function update() {
  context.translate(center.y, center.y);
  context.rotate(rotateAround);

  drawCanvas();
}

update();

document.getElementById('start').onclick = function() {
  if (started === false) {
  	started = true;
  	interval = setInterval(draw, 100);
  }
}

document.getElementById('stop').onclick = function() {
  clearInterval(interval);
  started = false;
}

document.getElementById('forward').onclick = function() {
  reverse = false;
}

document.getElementById('backward').onclick = function() {
  reverse = true;
}

document.getElementById('reset').onclick = function() {
	clearInterval(interval);
	reset();
	sides = 0;
}

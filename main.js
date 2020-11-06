let p1
let p2
let desiredX = 300

let clickRange = 60
let circleSize = 30

let boxSize = [100, 10]

let constraints


// Setup Function -----------------------------------------------------------------------------------------------
function setup()
{
  canvasX = windowWidth
  canvasY = windowHeight - 4

  sliderY = windowHeight - 60
  textY = sliderY - 10

  createCanvas(canvasX, canvasY)

  setupUI()


  print(constraints)

  p1 = createVector(5 * canvasX / 6, canvasY / 2)
  p2 = createVector(2 * canvasX / 6, canvasY / 2)
}


// Draw Function ------------------------------------------------------------------------------------------------
function draw()
{
  background('#003049')

  constraints = [constraintsSlider.value() * windowHeight / 10, (10 - constraintsSlider.value()) * windowHeight / 10]

  drawUI()

  fill('#eae2b7')
  ellipse(p1.x, p1.y, circleSize, circleSize);
  ellipse(p2.x, p2.y, circleSize, circleSize);

  stroke('#d62828')
  fill('#d62828')
  line(desiredXSlider.value(), constraints[0] - circleSize / 2 - boxSize[1] / 2, desiredXSlider.value(), constraints[1] + circleSize / 2 + boxSize[1] / 2)

  rectMode(CENTER);
  rect(desiredXSlider.value(), constraints[0] - circleSize / 2 - boxSize[1] / 2, boxSize[0], boxSize[1], 8)
  rect(desiredXSlider.value(), constraints[1] + circleSize / 2 + boxSize[1] / 2, boxSize[0], boxSize[1], 8)

  stroke('black')
  var desiredY = Intercepts(p1, p2, desiredXSlider.value())
  desiredY = constrain(desiredY, constraints[0], constraints[1]);

  let desiredPoint = createVector(desiredXSlider.value(), desiredY)

  fill('#fcbf49')
  ellipse(desiredPoint.x, desiredPoint.y, circleSize, circleSize);

  drawArrow(p1, p5.Vector.sub(desiredPoint, p1), '#f77f00')
}

// Handles mouse click ---------------------------------------------------------------------------------
function mouseDragged(event)
{
  if (mouseY < windowHeight - 60)
  {
    if (mouseY < windowHeight - 60)
    {
      if (dist(mouseX, mouseY, p1.x, p1.y) < clickRange)
      {
        p1.x = mouseX
        p1.y = mouseY
      }

      else if (dist(mouseX, mouseY, p2.x, p2.y) < clickRange)
      {
        p2.x = mouseX
        p2.y = mouseY
      }
    }
  }
}

function drawArrow(base, vec, myColor)
{
  push()
  stroke(myColor)
  fill(myColor)
  translate(base.x, base.y)
  line(0, 0, vec.x, vec.y)
  rotate(vec.heading())
  let arrowSize = 6
  translate(vec.mag() - arrowSize, 0)
  triangle(0, arrowSize / 2, 0, - arrowSize / 2, arrowSize, 0)
  pop()
}

function Intercepts(P1, P2, desiredX)
{
  let alpha;
  if (P1.x == P2.x)
  {
    alpha = Math.inf;
  }
  else
  {
    alpha = (P1.y - P2.y) / (P1.x - P2.x);
  }
  var b = P2.y - alpha * P2.x;
  return alpha * desiredX + b;
}

// Configure the position and apeareance of UI Elements ---------------------------------------------------------
function setupUI()
{
  textSize(12)
  constraintsSlider = createSlider(1, 4, 1, 0.1)
  constraintsSlider.style('width', '300px')
  constraintsSlider.position(50, sliderY)

  desiredXSlider = createSlider(100, 600, desiredX, 1)
  desiredXSlider.style('width', '300px')
  desiredXSlider.position(380, sliderY)
}

//Draw values from engine in UI ---------------------------------------------------------------------------------
function drawUI()
{
  fill(200)
  noStroke()
  text('Constraints: ' + round(map(constraintsSlider.value(), 1, 4, 10, 0), 2), 50, textY)

  fill(200)
  noStroke()
  text('Desired X: ' + desiredXSlider.value(), 380, textY)

}
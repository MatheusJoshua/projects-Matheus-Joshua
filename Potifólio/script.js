
/* Parallax Animation for Sun and Apresentation*/

var sol = document.getElementById('sol');
var comprimento = document.getElementById('apresentation');
var container = document.getElementById('container');

window.addEventListener('scroll', function () {
  var alturaComprimento = comprimento.offsetTop
  var value = window.scrollY;
  sol.style.top = value * 2.5 + 'px';
  comprimento.style.top = alturaComprimento + value + 'px';

})

/* Smoth scroll for internal links */

var link = document.querySelectorAll('.smoth');
const positions = [
  positionText = document.getElementById('text').offsetTop,
  positionProjects = document.getElementById('projects').offsetTop,
  positionContact = document.getElementById('pong').offsetTop,
  positionContact = document.getElementById('contacts').offsetTop,

];

const ids = [
  text = document.getElementById('text'),
  projects = document.getElementById('projects'),
  pong = document.getElementById('pong'),
  contacts = document.getElementById('contacts'),

]
window.addEventListener('click', positionOnClique);
function positionOnClique(element) {
  link.forEach(function (x, i) {
    if (element.target == link[i]) {
      window.scroll({
        top: positions[i] * 0.92,
        behavior: "smooth",

      })
    }
  })
}
function scrollText() {
  ids.forEach(function (section, i) {
    if (window.pageYOffset > positions[i] * 0.6) {
      ids[i].style.animation = "animacao 2s forwards"

    }
  })
}
window.addEventListener('scroll', scrollText);


/*______________PONG______________ */
/* Using MDN`s code*/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}
function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            alert("You, Rock It!");
            document.location.reload();
          }
        }
      }
    }
  }
}
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#4dffff";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#4dffff";
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#4dffff";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBricks();
  drawBall();
  drawPaddle();

  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  }
  else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      canvas.style.opacity = 0
      setTimeout(reposition, 500)
    }
  }
  function reposition() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 3;
    dy = -3;
    paddleX = (canvas.width - paddleWidth) / 2;
    canvas.style.opacity = 1

  }
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

var play = document.getElementById('play')
function pongPlay(element) {
  if (element.target == play) {
    draw()
    canvas.style.transition = '2s';
    canvas.style.opacity = 1;
    play.style.opacity = 0;
  }
}

window.addEventListener('click', pongPlay)

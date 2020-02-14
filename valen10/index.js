var GIFS = (function(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
})([
  "https://media.giphy.com/media/dG79iTcCx23Oo/giphy.gif",
  "https://media.giphy.com/media/7k3ThwwMXnHCE/giphy.gif",
  "https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif",
  "https://media.giphy.com/media/VNFJZ6mpsvfHO/giphy.gif",
  "https://media.giphy.com/media/o0QIJqoObOK1G/giphy.gif",
  "https://media.giphy.com/media/l4pTdcifPZLpDjL1e/giphy.gif",
  "https://media.giphy.com/media/5dUllWbKVlaqmMTvHb/giphy.gif",
  "https://media.giphy.com/media/oDzZcpDm6AYKI/giphy.gif",
  "https://media.giphy.com/media/l0Hek8mXSBY772iMo/giphy.gif",
  "https://media.giphy.com/media/xThtannt70SCAtcnSw/giphy.gif",
  "https://media.giphy.com/media/26xBzKsEllzJUcdgI/giphy.gif",
  "https://media.giphy.com/media/ZzquuaCvjrX8I/giphy.gif"
]);
var GIF_BG = "https://media.giphy.com/media/XbsB79zhtQB9eUsBaU/giphy.gif";

var gifi = 0;
function nextGif() {
  gifi++;
  gifi %= GIFS.length;
  $("#gif-img").attr("src", GIFS[gifi]);
}
$("#show-another").on("click", nextGif);
// $("#debug-gif").on("click", toggleGifs);

function makeGifyBg() {
  var bodyStyles = {
    backgroundImage: `url(
        "https://media.giphy.com/media/XbsB79zhtQB9eUsBaU/giphy.gif"
      )`,
    backgroundSize: "cover"
  };
  $("body").css(bodyStyles);
}

function toggleGifs() {
  nextGif();
  makeGifyBg();
  $("#game").hide();
  $("#gifs").show();
  stopGame();
}

// JavaScript code goes here
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var animationId;

var score = 0;
var MAX_LIVES = 3;
var lives = MAX_LIVES;

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, active: true };
  }
}
bricks[0][brickRowCount - 1].active = false;
bricks[brickColumnCount - 1][brickRowCount - 1].active = false;
score = 2;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleHalfWidth = paddleWidth / 2;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = Math.max(relativeX - paddleHalfWidth, 0);
    paddleX = Math.min(paddleX, canvas.width - paddleWidth);
  }
}

var heartWidth = 20;
var heartHeight = 20;
var heartHalfWidth = heartWidth / 2;
var heartHalfHeight = heartHeight / 2;
var heartHeightAdj = heartHalfHeight / 2;

function updateProgress() {
  var w = 100 * ((score - 2) / (brickColumnCount * brickRowCount - 2));
  $(".progress-bar").css("width", w + "%");
}

function drawHeart() {
  var h = "💙";
  ctx.font = heartWidth + "px";
  ctx.fillText(h, x - heartHalfWidth, y + heartHalfHeight);
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (!bricks[c][r].active) continue;

      var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
      var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }
}

function isColliding(bx, by) {
  var l = x - heartHalfWidth;
  var r = x + heartHalfWidth;
  var u = y - heartHalfWidth + heartHeightAdj;
  var d = y + heartHalfWidth;

  if (r < bx || l > bx + brickWidth) {
    return false;
  }
  if (by > d || by + brickHeight < u) {
    return false;
  }
  if (u) return true;
}

function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.active) {
        if (isColliding(b.x, b.y)) {
          dy = -dy;
          b.active = false;
          score++;
          updateProgress();
          if (score == brickRowCount * brickColumnCount) {
            handleGameFinish();
          }
        }
      }
    }
  }
}

function handleGameFinish() {
  stopGame();
  setTimeout(toggleGifs, 500);
}

function drawLives() {
  var bh = "😭";
  var nbh = "🧡";

  var sx = canvas.width - 75;
  var sy = 20;
  var fontSize = 15;
  var padding = 8;

  ctx.font = fontSize + "px Arial";
  for (var i = 0; i < MAX_LIVES; i++) {
    var h = i + 1 > lives ? bh : nbh;
    ctx.fillText(h, sx, sy);
    sx += padding + fontSize;
  }
}

function resetPaddleAndBall() {
  paddleX = Math.random() * (canvas.width - paddleWidth);
  x = paddleX + paddleHalfWidth;
  y = canvas.height - 2 * paddleHeight;
  dx = 2;
  dy = -2;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawLives();
  drawHeart();

  x += dx;
  y += dy;
  if (x + dx > canvas.width - heartHalfWidth || x + dx < heartHalfWidth) {
    dx = -dx;
  }
  if (y + dy < heartHalfWidth) {
    dy = -dy;
  } else if (
    y < canvas.height - heartHalfWidth &&
    y + dy > canvas.height - heartHalfWidth - paddleHeight &&
    x > paddleX &&
    x < paddleX + paddleWidth
  ) {
    dy = -dy;
  } else if (y + dy > canvas.height + heartHalfWidth) {
    lives--;
    if (lives < 0) {
      stopGame();
      alert(
        "You broke all your Hearts. No worries! just refresh to get new Hearts :)"
      );
      document.location.reload();
    } else {
      resetPaddleAndBall();
    }
  }

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
}
animationId = setInterval(draw, 15);

function stopGame() {
  clearInterval(animationId);
}
draw();

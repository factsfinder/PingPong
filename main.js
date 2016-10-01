var canvas = document.getElementById("game-space");
var ctx = canvas.getContext("2d");


var w = canvas.width;
var h = canvas.height;
var x = w/6; //position of the ball on x axis
var y = h-10; // position of the ball on the y-axis
var dx = 2;
var dy = -2;

var ballRadius = 5; //radius of the ball
var pW = 70; //width of the paddle
var pH = 5; //height of the paddle
var pX = (w-pW)/2; //position of the paddle in the game

var brickRows = 4;
var brickCols = 6;
var brickWidth = 35;
var brickHeight = 8;
var brickPadding = 10;
var brickOffSetTop = 30;
var brickOffSetLeft = 30;

var score = 0;
var lives = 5;

var bricks = [];
for(c=0;c<brickCols; c++){
  bricks[c] = [];
  for(r=0;r<brickRows; r++){
    bricks[c][r] = {x: 0, y: 0, status: 1};
  }
}

var rightKey = false;
var leftKey = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false); 
document.addEventListener("mousemove", mouseMoveHandler, false);

//function that makes the mouse movement to move the paddle 
function mouseMoveHandler(e){
  mouseX = e.clientX - canvas.offsetLeft;
  if(mouseX > 0 && relativeX < canvas.width){
    pX = relativeX - pW/2;
  }
}
//key down handler function
function keyDownHandler(e){
  if(e.keyCode == 39){
    rightKey = true;
  }
  else if(e.keyCode == 37){
    leftKey = true;
  }
}

//key up handler function
function keyUpHandler(e){
  if(e.keyCode == 39){
    rightKey = false;
  }
  else if(e.keyCode == 37){
    leftKey = false; 
  }
}

//collision detection of ball and bricks
function collisionDetection(){
  for(c=0; c<brickCols; c++){
    for(r=0; r<brickRows; r++){
      var b = bricks[c][r];
      if(b.status == 1){
        if((x > b.x && x < b.x + brickWidth) && (y > b.y && y < b.y + brickHeight)){
          by = -dy;
          b.status = 0;
          score++;
          if(score == brickRows*brickCols){
            alert("You made it gum gum..! Well done :)");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore(){
  ctx.font = "12px Courier";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Score: "+score, 8, 15);
}

function drawLives(){
  ctx.font = "12px Courier";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Lives: "+lives, canvas.width-80, 15);
}

// drawing the ball
function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0000ff";
  ctx.fill();
  ctx.closePath();
}

//draw the paddle
function drawPaddle(){
  ctx.beginPath();
  ctx.rect(pX, h-pH, pW, pH);
  ctx.fillStyle = "#ff0000";
  ctx.fill();
  ctx.closePath();
}

//draw bricks on the game
function drawBricks(){
  for(c=0; c<brickCols; c++){
    for(r=0; r<brickRows; r++){
      if(bricks[c][r].status == 1){
        var brickX = (c*(brickWidth + brickPadding)) + brickOffSetLeft;
        var brickY = (r*(brickHeight + brickPadding)) + brickOffSetTop;
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
}


//draw
function draw(){
  ctx.clearRect(0, 0, w, h);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  
  // Making the ball bounce of the walls
  if((x+dx > w-ballRadius) ||(x+dx < ballRadius)){
    dx = -dx;
  }  // If the ball reaches the sides of the wall, then we will reverse the value of dx
 
  if(y+dy < ballRadius){
    dy = -dy;
  }  // If the ball reaches the bottom or the top, then we will reverse the value of dy
  
 else if(y+dy > h-ballRadius){
    if(x > pX && x < pX+pW ){
      dy = -dy;
   } // if the ball touches the paddle, then make the ball bounce
   else {
     lives--;
     if(lives == 0){
       alert("You lost gum gum !");
      document.location.reload();
     }
    else{
       x = canvas.width/2;
       y = canvas.height-30;
       dx = 4;
       dy = 2;
       pX = canvas.width/2;
     }
   }
   
  }
  // Moving the paddle
  if((rightKey) && (pX < w-pW)){
    pX += 7;
  }
  else if((leftKey) && (pX > 0)){
    pX -= 7;
  }
  
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();


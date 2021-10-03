const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const Ball = {
  x: 500,
  y: 275,
  radius: 10,
  speed: 3,
  angle: Math.random() * 2 * Math.PI
}

const Player1 = {
  x: 40,
  y: 225,
  width: 10,
  height: 100,
  score: 0,
  speed: 0
}

const Player2 = {
  x: 950,
  y: 225,
  width: 10,
  height: 100,
  score: 0,
  speed: 0
}

function paint() { 
  ctx.beginPath();
  ctx.fillStyle = "#FFFFFF";

  ctx.font = "50px Arial";
  ctx.fillText(Player1.score, 425, 70);
  ctx.fillText(Player2.score, 545, 70);

  ctx.arc(Ball.x, Ball.y, Ball.radius, 0, Math.PI * 2);
  ctx.fillRect(Player1.x, Player1.y, Player1.width, Player1.height);
  ctx.fillRect(Player2.x, Player2.y, Player2.width, Player2.height);
  ctx.fillRect(498,1,4,548);
  ctx.fill();


}

document.addEventListener('keydown', e => {
  if (e.key === 'w') {
    Player1.speed = -3;
  }
  if (e.key === 's') {
    Player1.speed = 3;
  }
  if (e.key === 'i') {
    Player2.speed = -3;
  }
  if (e.key === 'k') {
    Player2.speed = 3;
  }
})

document.addEventListener('keyup', e => {
  Player1.speed = 0;
  Player2.speed = 0;
})

function move() {
  if((Player1.y >= 0 && Player1.speed <= 0) || (Player1.y + Player1.height <= canvas.height && Player1.speed >= 0)){ 
    Player1.y += Player1.speed;
  }

  if((Player2.y >= 0 && Player2.speed <= 0) || (Player2.y + Player2.height <= canvas.height && Player2.speed >= 0)){ 
    Player2 .y += Player2.speed;
  }
}

function checkCollision(){
  //collision with top and bottom
  if(Ball.y + Ball.radius >= canvas.height || Ball.y - Ball.radius <= 0){
    Ball.angle = 2 * Math.PI - Ball.angle;
  }

  //collision with left and right
  if(Ball.x + Ball.radius >= canvas.width){
    Ball.x = 500;
    Ball.y = 275;
    Player2.score++;
  }

  if(Ball.x - Ball.radius <= 0){
    Ball.x = 500;
    Ball.y = 275;
    Player1.score++;
  }

  //collision with pedals
  if(Ball.x + Ball.radius <= Player2.x + Player2.width && Ball.x - Ball.radius >= Player1.x){
    Ball.speed = Ball.speed * 1.3;
    //collision with player1
    if(Ball.y >= Player1.y && Ball.y <= Player1.y + Player1.height){
      if(Ball.x - Ball.radius <= Player1.x + Player1.width){
        Ball.angle = Math.PI - Ball.angle;
      }
    }

    //collision with player2
    if(Ball.y >= Player2.y && Ball.y <= Player2.y + Player2.height){
      if(Ball.x + Ball.radius >= Player2.x){
        Ball.angle = Math.PI - Ball.angle;
      }
    }
 }

  if(Player1.y <= 0)
    Player1.speed = 0;

}

function checkWin() {
  if(Player1.score >= 11) {
    return "Player 1 Wins"
  }
  else if(Player2.score >= 11) {
    return "Player 2 Wins"
  }
  else {
    return "Continue"
  }
}

function update() {
  if(checkWin() == "Continue") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Ball.x += Ball.speed * Math.cos(Ball.angle);
    Ball.y += Ball.speed * Math.sin(Ball.angle);
  
    move();
    checkCollision();
    paint();
  
    requestAnimationFrame(update);
  }
  else {
    alert(checkWin());
  }
}

update();


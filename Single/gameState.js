const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ballSize = 10;
const pHeight = 100, pWidth = 50;

var player1X, player1Y;
var Player2X, player2Y;

const Ball = {
  x: 500,
  y: 275,
  radius: 10,
  speed: 10
}

const Player1 = {
  x: 40,
  y: 225,
  width: 10,
  height: 100
}

const Player2 = {
  x: 950,
  y: 225,
  width: 10,
  height: 100
}

function paint() { 
  ctx.beginPath();
  ctx.fillStyle = "#FFFFFF";
  ctx.arc(Ball.x, Ball.y, Ball.radius, 0, Math.PI * 2);
  ctx.fillRect(Player1.x, Player1.y, Player1.width, Player1.height);
  ctx.fillRect(Player2.x, Player2.y, Player2.width, Player2.height);
  ctx.fill();
}

document.addEventListener('keypress', event => {
  if (event.key === 'w') {
    Player1.y -= 10;
  }
  if (event.key === 's') {
    Player1.y += 10;
  }
  if (event.key === 'i') {
    Player2.y -= 10;
  }
  if (event.key === 'k') {
    Player2.y += 10;
  }
})

function checkCollision(){
  if(Ball.y + Ball.radius >= canvas.height || Ball.y - Ball.radius <= 0)
    Ball.y = -Ball.y;
  if(Ball.x + Ball.radius >= canvas.width || Ball.x - Ball.radius <= 0){
    Ball.x = 500;
    Ball.y = 275;
  }

}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  paint();

  requestAnimationFrame(update);
}

update();



class gameState {


}

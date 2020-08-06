const canvas = document.getElementById('pong')
const ctx = canvas.getContext('2d')


// draw cirlce for ball
function drawArc(x, y, r, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(300, 350, 100, 0, Math.PI*2, false)
    ctx.closePath()
    ctx.fill()
}

// draw rectangles for paddles
function drawRect(x, y, w, h, color) {    
    ctx.fillStyle = color
    ctx.fillRect(x,y,w,h) 
}

const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    speed: 7,
    color: 'WHITE'
}

// User Paddle
const user = {
    x: 0, // left side of canvas
    y: (canvas.height - 100)/2, // sets paddle below canvas
    width: 10,
    height: 100,
    score: 0,
    color: 'WHITE'
}

// Computer Paddle
const comp = {
    x: canvas.width - 10,
    y: (canvas.height - 100)/2,
    width: 10,
    height: 100,
    score: 0,
    color: 'WHITE'
}

// Net function
function drawNet() {
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y, net.width, net.height, net.color)
    }
}

// Text function
function drawText(text, x, y) {
    ctx.fillStyle = '#FFF'
    ctx.font = '75px fantasy'
    ctx.fillText(text, x, y)
}

// reset ball function
function resetBall() {
    ball.x = canvas.width/2
    ball.y = canvas.height/2
    ball.velocityX = -ball.velocityX // switches ball direction
    ball.speed = 7
}

// WIP Arrow key event listener
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
    // up arrow
    }
    else if (e.keyCode == '40') {
    // down arrow
    }
    else if (e.keyCode == '37') {
    // left arrow
    }
    else if (e.keyCode == '39') {
    // right arrow
    }

}

// collision detection
function collision(ball,paddle){
    paddle.top = paddle.y;
    paddle.bottom = paddle.y + paddle.height;
    paddle.left = paddle.x;
    paddle.right = paddle.x + paddle.width;
    
    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;
    
    return paddle.left < ball.right && paddle.top < ball.bottom && paddle.right > ball.left && paddle.bottom > ball.top;
}

// update function, does all calculations

function update() {

    //change score, reset ball if hits edge of canvas
    if (ball.x - ball.radius < 0){
        comp.score++
        resetBall()
    }
    else if (ball.x + ball.radius > canvas.width){
        user.score++
        resetBall()
    }

    // ball velocity
    ball.x += ball.velocityX
    ball.y += ball.velocityY

    // check for collision on paddles
    let player = (ball.x + ball.radius < canvas.width/2) ? user : com
}
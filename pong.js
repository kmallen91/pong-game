const canvas = document.getElementById('pong')
const ctx = canvas.getContext('2d')


// draw circle for ball
function drawArc(x, y, r, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI*2, false)
    ctx.closePath()
    ctx.fill()
}

const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    speed: 7,
    color: '#FFF'
}

// Net
const net = {
    x: (canvas.width - 2) / 2,
    y: 0,
    height: 10,
    width: 2,
    color: '#FFF'
}

// User Paddle
const user = {
    x: 0, // left side of canvas
    y: (canvas.height - 100)/2, // sets paddle below canvas
    width: 10,
    height: 100,
    score: 0,
    color: '#FFF'
}

// Computer Paddle
const comp = {
    x: canvas.width - 10,
    y: (canvas.height - 100)/2,
    width: 10,
    height: 100,
    score: 0,
    color: '#FFF'
}

// draw rectangles for paddles
function drawRect(x, y, w, h, color) {    
    ctx.fillStyle = color
    ctx.fillRect(x,y,w,h) 
}

// Net function
function drawNet() {
    for(let i = 0; i <= canvas.height; i += 15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color)
    }
}

// Text function
function drawText(text, x, y) {
    ctx.fillStyle = '#FFF'
    ctx.font = '65px fantasy'
    ctx.fillText(text, x, y)
}

// reset ball function
function resetBall() {
    ball.x = canvas.width/2
    ball.y = canvas.height/2
    ball.velocityX = -ball.velocityX// switches ball direction
    ball.speed = 6
}

// WIP Arrow key event listener
// document.onkeydown = checkKey;

// function checkKey(e) {

//     e = e || window.event;

//     if (e.keyCode == '38') {
//     // up arrow
//     }
//     else if (e.keyCode == '40') {
//     // down arrow
//     }
//     else if (e.keyCode == '37') {
//     // left arrow
//     }
//     else if (e.keyCode == '39') {
//     // right arrow
//     }

// }

// listening to the mouse
canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    
    user.y = evt.clientY - rect.top - user.height/2;
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
    if (ball.x + ball.radius > canvas.width){
        user.score+=1
        resetBall()
    }
    else if (ball.x - ball.radius < 0){
        comp.score+=1
        resetBall()
    }

    // ball velocity
    ball.x += ball.velocityX
    ball.y += ball.velocityY

    // Computer AI movement
    comp.y += ((ball.y - (comp.y + comp.height/2)))*0.065

    // when ball collides with bottom and top walls, inverse y velocity
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY
    }

    // check for collision on paddles
    let player = (ball.x + ball.radius < canvas.width/2) ? user : comp

    // paddle collision check
    if (collision(ball, player)) {
        
        // check where ball hits paddle
        let collidePoint = (ball.y - (player.y + player.height/2))

        // normalize the value of collidePoint from the set height to 1
        // -player.height/2 < collidePoint < player.height/2
        collidePoint = collidePoint / (player.height/2)

        // when the ball hits the top of a paddle, return a -45degees angle
        // when the ball hits the middle of a paddle, return a 0degees angle
        // when the ball hits the bottom of a paddle, return a 45degees angle
        // Math.PI/4 = 45degrees
        let angleRad = (Math.PI/4) * collidePoint

        // change the X and Y directional velocities
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1
        ball.velocityX = direction * ball.speed * Math.cos(angleRad)
        ball.velocityY = ball.speed * Math.sin(angleRad)

        // speed up ball every hit
        ball.speed += 0.5
    }
}

// render function, does the drawing
function render(){
    
    // clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    
    // draw the user score to the left
    drawText(user.score, canvas.width/4, canvas.height/5);
    
    // draw the COM score to the right
    drawText(comp.score, 3*canvas.width/4, canvas.height/5);
    
    // draw the net
    drawNet();
    
    // draw the user's paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
    
    // draw the COM's paddle
    drawRect(comp.x, comp.y, comp.width, comp.height, comp.color);
    
    // draw the ball
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}

function game(){
    update();
    render();
}

// number of frames per second
let framePerSecond = 50;

// call the game function 50 times every 1 Sec
let loop = setInterval(game, 1000/framePerSecond);
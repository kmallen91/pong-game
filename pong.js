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
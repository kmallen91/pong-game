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
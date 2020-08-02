const canvas = document.getElementById('pong')
const context = canvas.getContext('2d')

context.fillStyle = 'black'
context.fillRect(100, 200, 50, 75)

context.fillStyle = 'red'
context.beginPath()
context.arc(300, 350, 100, 0, Math.PI*2, false)
context.closePath()
context.fill

function drawRect(x, y, w, h, color) {
    
    ctx.fillStyle = color
    ctx.fillRect(x,y,w,h) 
}
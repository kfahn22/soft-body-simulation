let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', e => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
});

canvas.addEventListener('mousemove', e => {
  if (isDrawing) {
    const x = e.offsetX;
    const y = e.offsetY;
    ctx.lineTo(x, y);
    ctx.stroke();
    lastX = x;
    lastY = y;
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  ctx.closePath();
});

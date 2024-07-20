export const drawText = ({ctx, score, cords = { x: 0, y: 0 } }) => {
    ctx.font = '40px Pong-Font, sans-serif';
    ctx.fillStyle = 'white';

    if (score < 10) {
        score = '0' + score;
    }

    ctx.fillText(score, cords.x, cords.y);
}

export const resetBall = (ball, canvasWidth, canvasHeight) => {
    ball.position.x = canvasWidth / 2;
    ball.position.y = canvasHeight / 2;
    ball.velocity.x = -ball.velocity.x;
} 
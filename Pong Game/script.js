import { Ball } from "./Classes/Ball.js";
import { Player } from "./Classes/Player.js";
import { drawText, resetBall } from "./funcs.js";


const canvas = document.querySelector('#game-canvas');
const c = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 585;

const keys = {
    w: { pressed: false },
    s: { pressed: false },
    arrowUp: { pressed: false },
    arrowDown: { pressed: false }
}

const players = [
    // left Player
    new Player({ position: { x: 0 + Player.playerSpacing, y: canvas.height / 2 - Player.playerSpacing }, size: { width: 20, height: 100 } , yVelocity: 0, alpha: 1 }),
    // right Player
    new Player({ position: { x: canvas.width - Player.playerSpacing, y: canvas.height / 2 - Player.playerSpacing}, size: { width: 20, height: 100 } , yVelocity: 0 ,alpha: 1 })
];
const ball = new Ball({ position: { x: canvas.width / 2, y: canvas.height / 2 }, size: { width: 20, height: 20 }, velocity: { x: 5, y: 5 } });

let leftScore = 0;
let rightScore = 0;

const animate = () => {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.3)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    drawText({ ctx: c, score: leftScore, cords: { x: (canvas.width / 2) / 2, y: 50 } });
    drawText({ ctx: c, score: rightScore, cords: { x: (canvas.width / 2) + (canvas.width / 2) / 2, y: 50 } })
    // map lines
    for(let i = 0; i <= 10; i++) {
        c.beginPath();
        c.fillStyle = 'white';
        c.rect(canvas.width / 2, 60.5 * i, 10, 40);
        c.fill();
        c.stroke();
    }
    
    const topBottomSpacing = 10;

    if (keys.w.pressed && players[0].position.y >= topBottomSpacing) {
        players[0].yVelocity -= Player.playerSpeed;
    }

    if (keys.s.pressed && players[0].position.y + players[0].size.height <= canvas.height - topBottomSpacing ) {
        players[0].yVelocity += Player.playerSpeed;
    }

    if (keys.arrowUp.pressed && players[1].position.y >= topBottomSpacing) {
        players[1].yVelocity -= Player.playerSpeed;
    }  
    
    if (keys.arrowDown.pressed && players[1].position.y + players[0].size.height <= canvas.height - topBottomSpacing) {
        players[1].yVelocity += Player.playerSpeed;
    }

    
    players.forEach((player, index) => {
        player.update(c);
        player.yVelocity = 0;
        
        if (players[index].position.x + players[index].size.width >= ball.position.x && 
            players[index].position.x <= ball.position.x + ball.size.width && 
            players[index].position.y + players[index].size.height >= ball.position.y && 
            players[index].position.y <= ball.position.y + ball.size.height
        ) {
            ball.velocity.x = -ball.velocity.x; 

            index === 0 ? ball.position.x = player.position.x + player.size.width : ball.position.x = player.position.x - ball.size.width; 
        }
    })
    
    if (ball.position.x <= 0) {
        resetBall(ball, canvas.width, canvas.height)
        rightScore++
    } else if (ball.position.x + ball.size.width >= canvas.width) {
        resetBall(ball, canvas.width, canvas.height)
        leftScore++
    }

    ball.update(c, canvas.width, canvas.height);
}

animate();

window.addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'ArrowUp':
            keys.arrowUp.pressed = false;
            break;
        case 'ArrowDown':
            keys.arrowDown.pressed = false;
            break;
    }
})

window.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = true;
            break;
        case 's':
            keys.s.pressed = true;
            break;
        case 'ArrowUp':
            keys.arrowUp.pressed = true;
            break;
        case 'ArrowDown':
            keys.arrowDown.pressed = true;
            break;
    }
})
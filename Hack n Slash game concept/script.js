import { Enemy } from './Classes/Enemy.js';
import { Player } from './Classes/Player.js';
import { createImg, PLAYER_SPRITES_PATH, ENEMY_SPRITES_PATH, ENEMY_GOBLIN_PATH, ENEMY_FLYINGEYE_PATH, ENEMY_MUSHROOM_PATH } from './helpers.js';

const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext('2d');

setCanvasSize()

const player = new Player({ 
    position: { x: 100, y: 100 }, 
    velocity: { x: 0, y: 0 }, 
    image: createImg(`${PLAYER_SPRITES_PATH}idle.png`), 
    playerHealth: 100,
})
const enemies = [
    
]

const enemiesMap = {
    'Goblin': {
        'image': createImg(ENEMY_GOBLIN_PATH + 'Run.png'),
        'hitsToKill': 2,
        'pathToFile': ENEMY_GOBLIN_PATH,
        'spriteWidth': 150,  
        'speed': 3,
        'dmg': 3
    },
    'Mushroom': {
        'image': createImg(ENEMY_MUSHROOM_PATH + 'Run.png'),
        'hitsToKill': 5,
        'pathToFile': ENEMY_MUSHROOM_PATH,
        'spriteWidth': 150,
        'speed': 1.5,
        'dmg': 7
    },
    'Flying Eye': {
        'image': createImg(ENEMY_FLYINGEYE_PATH + 'Run.png'),
        'hitsToKill': 4,
        'pathToFile': ENEMY_FLYINGEYE_PATH,
        'spriteWidth': 150,
        'speed': 2,
        'dmg': 5
    }
}

const drawGridMap = () => {
    const cellSize = 80;
    const smallCellSize = 20;

    ctx.beginPath();
    ctx.strokeStyle = '#8B008B';

    for (let j = 0; j <= canvas.width; j += smallCellSize) {
        ctx.moveTo(j, 0);
        ctx.lineTo(j, canvas.height);

        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
    }

    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();

    for (let i = 0; i < canvas.width; i += cellSize) {
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)

        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)            
    }

    ctx.closePath();
    ctx.stroke();
}

const randomKey = Math.floor(Math.random() * Object.keys(enemiesMap).length)
const enemiesArray = Object.keys(enemiesMap)
const randomEnemy = enemiesMap[enemiesArray[randomKey]]

enemies.push(new Enemy({ 
    position: { x: Math.random() * canvas.width, y: Math.random() * canvas.height },
    velocity: { x: 5, y: 5 },
    player: player,
    spriteWidth: randomEnemy['spriteWidth'],
    image: randomEnemy['image'],
    hitsToKill: randomEnemy['hitsToKill'],
    ENEMY_PATH: randomEnemy['pathToFile'],
    enemySpeed: randomEnemy['speed'],
    dmg: randomEnemy['dmg']
}))


const gameLoop = () => {
    window.requestAnimationFrame(gameLoop);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    drawGridMap();

    player.update(ctx)
    player.enemies = enemies

    enemies.forEach(enemy => {
        enemy.update(ctx)  
        enemy.player = player
    })
}

function setCanvasSize() {
    const GAME_WIDTH = window.innerWidth;
    const GAME_HEIGHT = window.innerHeight;
    
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
}

gameLoop()

window.addEventListener('resize', setCanvasSize)
window.addEventListener('keydown', ({ key }) => player.keyPressed(key))
window.addEventListener('keyup', ({ key }) => player.keyReleased(key))
// user can`t scroll
document.addEventListener('wheel', (event) => event.preventDefault(), { passive: false })
document.addEventListener('gesturestart', (event) => event.preventDefault() )

console.clear()

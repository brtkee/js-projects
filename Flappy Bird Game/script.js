import { Bird } from "./Classes/Bird.js";
import { Pipe } from "./Classes/Pipelines.js";
import { createImg, randomIntFromRange, endGame } from "./functions.js";

const resetGameBtn = document.querySelector('#try-again');

const canvas = document.querySelector('#flappy-bird-game');
const c = canvas.getContext('2d');

canvas.width = 360;
canvas.height = 640;

let bgImg = createImg('flappybirdbg(2).png');
let bird = new Bird({ position: { x: 20, y: canvas.height / 2 }, velocity: { x: 0, y: 0 }, image: createImg('flappybird.png') });
let pipelines = [];

let frames = 0;
let score = 0;

const animate = () => {
    let animationId = window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    frames++
    
    c.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    c.font = '60px Silkscreen, sans-serif';
    c.fillStyle = 'white';
    c.fillText(score, 165, 100);

    bird.update(c);

    for (let i = pipelines.length - 1; i >= 0; i--) {
        const pipeline = pipelines[i];

        if (bird.position.x + bird.width >= pipeline.position.x &&
            bird.position.x <= pipeline.position.x + pipeline.width &&
            bird.position.y + bird.height >= pipeline.position.y &&
            bird.position.y <= pipeline.position.y + pipeline.height
        ) {
            endGame(animationId, score);
        }

        if (!pipeline.pipePassed && bird.position.x > pipeline.position.x + pipeline.width) {
            pipeline.pipePassed = true;
            score += 0.5;
        }

        pipeline.update(c);

        if (pipeline.position.x <= -70) {
            setTimeout(() => {
                pipelines.splice(i, 1);
            }, 0)
        }
    }

    if (frames % 100 === 0) {
        const randY = randomIntFromRange(0, 256);
        const gap = canvas.height / 4;

        const topPipe = new Pipe({ position: { x: canvas.width, y: -randY }, velocity: { x: 2, y: 2 }, image: createImg('toppipe.png') });
        const bottomPipe = new Pipe({ position: { x: canvas.width, y: topPipe.position.y + topPipe.height + gap }, velocity: { x: 2, y: 2 }, image: createImg('bottompipe.png') });

        pipelines.push(topPipe, bottomPipe);
    }

    if (bird.position.y >= canvas.height - bird.height) {
        endGame(animationId, score)
    }
}

canvas.addEventListener('click', () => {
    if (bird.position.y >= 0) {
        bird.velocity.y = -10;
    }
})

window.addEventListener('keyup', ({ key }) => {
    if (key === ' ' && bird.position.y >= 0) {
        bird.velocity.y = -10;
    }
})

resetGameBtn.addEventListener('click', () => {
    window.location.reload();  
})

animate();

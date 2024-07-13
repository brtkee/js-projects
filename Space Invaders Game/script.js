import { Player } from "./Classes/Player.js";
import { Projectile } from "./Classes/Projectile.js";
import { Grid } from "./Classes/Grid.js";
import { Particle } from "./Classes/Particles.js";
import { createImg, showLostFrame } from "./functions.js";

const canvas = document.querySelector('#main-game');
const c = canvas.getContext('2d');
const playBtn = document.querySelector('#play');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const PLAYER_SPEED = 5;
const PLAYER_ROTATION_SPEED = .65;
const SHOOT_INTERVAL = 200;

const keys = {
    a: { pressed: false },
    d: { pressed: false },
    space: { pressed: false },
};

const player = new Player({ position: { x: canvas.width / 2, y: canvas.height - 200 }, velocity: { x: 0, y: 0 }, image: createImg('player.png') });
const projectiles = [];
const grids = [];
const invaderProjectiles = [];
const particles = [];

let frames = 0;
let randomInterval = Math.floor(Math.random() * 500 + 500);
let score = 0;
let lastShotTime = 0;

for (let i = 0; i < 100; i++) {
    particles.push(new Particle({
        position: {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
        },
        velocity: {
            x: 0,
            y: -1
        },
        radius: Math.random() * 2,
        color: 'white',
    }));
}

const animate = () => {
    let animationID = requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.font = '40px Tiny5, sans-serif';
    c.fillStyle = 'white';
    c.fillText(`Score: ${score}`, 0, 40);
    c.fillText(`Best Score: ${localStorage.getItem('Score')}`, 250, 40)

    player.update(c);

    particles.forEach(particle => {
        particle.update(c);

        if (particle.position.y - particle.radius >= canvas.height) {
            particle.position.x = Math.random() * canvas.width;
            particle.position.y = -particle.radius;
        }
    })

    invaderProjectiles.forEach((invaderProjectile, index) => {
        invaderProjectile.update(c);

        if (invaderProjectile.position.y >= canvas.height) {
            setTimeout(() => {
                invaderProjectiles.splice(index, 1);
            }, 0)
        }

        if (invaderProjectile.position.x + invaderProjectile.width >= player.position.x &&
            invaderProjectile.position.x <= player.position.x + player.width &&
            invaderProjectile.position.y + invaderProjectile.height >= player.position.y &&
            invaderProjectile.position.y <= player.position.y + player.height
        ) {
            cancelAnimationFrame(animationID);

            if (localStorage.getItem('Score') < score) {
                localStorage.setItem('Score', score);
            }

            showLostFrame(score);
        }
    })

    grids.forEach((grid, gridIndex) => {
        grid.update(canvas.width);

        if (frames % 100 === 0 && grid.invaders.length > 0) {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles);
        }

        grid.invaders.forEach((invader, invaderIndex) => {
            invader.update({ velocity: grid.velocity, ctx: c })

            if (invader.position.y >= canvas.height) {
                cancelAnimationFrame(animationID);

                if (localStorage.getItem('Score') < score) {
                    localStorage.setItem('Score', score);
                }

                showLostFrame(score);
            }

            projectiles.forEach((projectile, projectileIndex) => {
                if (projectile.position.y - projectile.radius <= invader.position.y + invader.height &&
                    projectile.position.x + projectile.radius >= invader.position.x &&
                    projectile.position.x - projectile.radius <= invader.position.x + invader.width &&
                    projectile.position.y + projectile.radius >= invader.position.y
                ) {
                    setTimeout(() => {
                        score += 10;
                        const invaderFound = grid.invaders.find(invader2 => {
                            return invader2 === invader;
                        })

                        const projectileFound = projectiles.find(projectile2 => {
                            return projectile2 === projectile;
                        })

                        if (invaderFound && projectileFound) {
                            grid.invaders.splice(invaderIndex, 1);
                            projectiles.splice(projectileIndex, 1)

                            if (grid.invaders.length > 0) {
                                const firstInvader = grid.invaders[0];
                                const lastInvader = grid.invaders[grid.invaders.length - 1];

                                grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width;
                                grid.position.x = firstInvader.position.x;
                            } else {
                                grids.splice(gridIndex, 1);
                            }
                        }
                    }, 0)
                }
            })
        })
    })


    projectiles.forEach((projectile, index) => {
        if (projectile.position.y <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1);
            }, 0)
        } else {
            projectile.update(c);
        }
    })

    if (frames % randomInterval === 0) {
        grids.push(new Grid());
        randomInterval = Math.floor(Math.random() * 500 + 500);

        frames = 0;
    }


    frames++

    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -PLAYER_SPEED;
        player.rotate = -PLAYER_ROTATION_SPEED;
    } else if (keys.d.pressed && player.position.x <= canvas.width - player.width) {
        player.rotate = PLAYER_ROTATION_SPEED;
        player.velocity.x = PLAYER_SPEED;
    } else {
        player.velocity.x = 0;
    }

    if (keys.space.pressed) {
        const currentTime = Date.now();
        if (currentTime - lastShotTime >= SHOOT_INTERVAL) {
            projectiles.push(new Projectile({
                position: { x: player.position.x + (player.width / 2), y: player.position.y + (player.height / 2) },
                velocity: { x: 0, y: 10 }
            }));
            lastShotTime = currentTime;
        }
    }
}

window.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'ArrowRight':
        case 'd':
            keys.d.pressed = true;
            break;

        case 'ArrowLeft':
        case 'a':
            keys.a.pressed = true;
            break;

        case 'ArrowUp':
        case ' ':
            keys.space.pressed = true;
            break;
    }
})

window.addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'ArrowRight':
        case 'd':
            keys.d.pressed = false;
            break;

        case 'ArrowLeft':
        case 'a':
            keys.a.pressed = false;
            break;

        case 'ArrowUp':
        case ' ':
            keys.space.pressed = false;
            break;
    }
})

// animate()
playBtn.addEventListener('click', () => {
    animate()
    const removement = document.querySelector('.start-card');

    document.body.removeChild(removement);
});;
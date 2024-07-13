import { Invader } from "./Invader.js";
import { createImg, randomIntFromRange } from "../functions.js";

const INVADER_WIDTH = 50;
const JUMPING_SPEED = 40;

export class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        },
        this.velocity = {
            x: 3,
            y: 0,
        },

        this.invaders = []

        const randRow = randomIntFromRange(4, 20);
        const randCol = randomIntFromRange(2, 5);
        
        this.width = randRow * INVADER_WIDTH;
        
        for (let i = 0; i < randRow; i++) {
            for (let j = 0; j < randCol; j++) {
                const randImg = randomIntFromRange(1, 4);
                this.invaders.push(new Invader({
                    position: {
                        x: i * INVADER_WIDTH,
                        y: j * INVADER_WIDTH + 50,
                    },
                    velocity: {
                        x: 10,
                        y: 10,
                    },
                    image: createImg(`enemy${randImg}.png`) ,
                }));
            }
        }
    }

    update(canvasWidth) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.velocity.y = 0;

        if (this.position.x + this.width >= canvasWidth || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x;
            this.velocity.y += JUMPING_SPEED;
        }
    }
}

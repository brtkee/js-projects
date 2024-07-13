import { InvaderProjectile } from "./InvaderProjectile.js";

export class Invader {
    constructor({
        position = { x, y },
        velocity = { x, y },
        image
    }) {
        this.position = position;
        this.velocity = velocity;
        this.image = image;

        this.image.onload = () => {
            this.width = image.width;
            this.height = image.height;
        }
    }

    draw(c) {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update({ velocity, ctx }) {
        if (this.image) {
            this.draw(ctx);
            
            this.position.x += velocity.x;
            this.position.y += velocity.y;
        }
    }

    shoot(invadersProjectiles) {
        invadersProjectiles.push(new InvaderProjectile({
            position: { 
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height,
            },
            velocity: {
                x: 0,
                y: -5,
            }
        }))
    }
}
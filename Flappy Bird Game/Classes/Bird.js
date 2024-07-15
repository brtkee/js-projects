const FALLING_SPEED = 0.5;
const MAIN_ROTATION = 20;
const FALLING_VELOCITY = 5;

export class Bird {
    constructor({
        position = {
            x: 0,
            y: 0,
        }, 
        velocity = {
            x: 0,
            y: 0,
        },
        image
    }) {
        this.position = position;
        this.velocity = velocity;
        this.rotation = 0;
        this.image = image;

        this.image.onload = () => {
            this.width = 50;
            this.height = 40;
        }
    }

    draw(c) {
        c.save();
        c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
        c.rotate(this.rotation * Math.PI / 100);

        c.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2);

        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);        

        c.restore();
    }

    update(c) {
        this.velocity.y += FALLING_SPEED;
        this.position.y += this.velocity.y;
 
        if (this.velocity.y > FALLING_VELOCITY) {            
            this.velocity.y = FALLING_VELOCITY;
        }

        this.draw(c);

        if (this.velocity.y < 0) {
            this.rotation = -MAIN_ROTATION;
        } else {
            this.rotation = MAIN_ROTATION;
        }
    }
}

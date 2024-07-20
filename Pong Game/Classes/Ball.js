export class Ball {
    constructor({
        position = {
            x: 0,
            y: 0,
        },
        size = {
            width: 0,
            height: 0,
        },
        velocity = {
            x: 0,
            y: 0,
        }
    }) {
        this.position = position;
        this.size = size;
        this.velocity = velocity;
        this.color = 'white';
    }

    draw(c) {
        c.beginPath();
        this.fillStyle = this.color;
        c.rect(this.position.x, this.position.y, this.size.width, this.size.height);
        c.fill();
        c.stroke();
    }

    update(c, canvasWidth, canvasHeight) {
        this.draw(c);

        if (this.position.x + this.size.width >= canvasWidth || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.position.y <= 0 || this.position.y + this.size.height >= canvasHeight) {
            this.velocity.y = -this.velocity.y;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

export class Player {
    static playerSpacing = 50;
    static playerSpeed = 5;

    constructor({
        position = {
            x: 0,
            y: 0,
        },
        size = {
            width: 0,
            height: 0,
        },
        yVelocity = 0,
    }) {
        this.position = position;
        this.size = size;
        this.yVelocity = yVelocity;
        this.color = 'white';
    }

    draw(c) {
        c.beginPath();
        c.fillStyle = this.color;
        c.rect(this.position.x, this.position.y, this.size.width, this.size.height);
        c.fill();
        c.stroke();
    }

    update(c) {
        this.draw(c);

        this.position.y += this.yVelocity;
    }
}
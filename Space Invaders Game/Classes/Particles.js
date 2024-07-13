export class Particle {
    constructor({
        position = {
            x,
            y,
        }, 
        velocity = {
            x,
            y,
        },
        radius,
        color,
    }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.color = color;
    }

    draw(c) {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
        c.stroke();
    }

    update(c) {
        this.draw(c);

        this.position.y -= this.velocity.y; 
    }
}
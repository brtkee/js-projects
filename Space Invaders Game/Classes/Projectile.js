export class Projectile {
    constructor ({
        position = { x, y },
        velocity = { x, y }
    }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 3;
    }

    draw(c) {
        c.beginPath();  
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = 'white';
        c.fill();
        c.closePath();
    }

    update(c) {
        this.draw(c);
        
        this.position.x += this.velocity.x;
        this.position.y -= this.velocity.y;
    }
} 
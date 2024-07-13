export class InvaderProjectile {
    constructor ({
        position = { x, y },
        velocity = { x, y }
    }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 3;
        this.height = 10;
    }

    draw(c) {
        c.fillStyle = 'white';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        c.fill();
    }

    update(c) {
        this.draw(c);
        
        this.position.x += this.velocity.x;
        this.position.y -= this.velocity.y;
    }
} 
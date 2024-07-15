export class Pipe {
    constructor({
        position = {
            x: 0,
            y: 0
        },
        velocity = {
            x: 0,
            y: 0,
        },
        image,
    }) {
        this.position = position;
        this.velocity = velocity;
        this.image = image; 
        this.scale = 0.15;
        this.width = image.width * this.scale;
        this.height = image.height * this.scale;
        this.pipePassed = false;
    }

    draw(c) {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);    
    }

    update(c) {
        this.draw(c);

        this.position.x -= this.velocity.x;
    }
}

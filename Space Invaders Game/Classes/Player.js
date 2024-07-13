export class Player {
    constructor({
        position = { x, y },
        velocity = { x, y },
        image
    }) {
        this.position = position;
        this.velocity = velocity;
        this.image = image;
        this.rotate = 0;
        
        this.image.onload = () => {            
            this.width = image.width;
            this.height = image.height;
        }
    }

    draw(c) {
            c.save();
            c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
            c.rotate(this.rotate);            
            
            c.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2);            

            this.rotate = 0;
            
            c.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height,
            );
            c.restore();
    }

    update(c) {
        this.draw(c);

        this.position.x += this.velocity.x;
    }
}
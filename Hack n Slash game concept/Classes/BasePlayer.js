export class BasePlayer {
    constructor({
        position = { x: 0, y: 0 },
        velocity = { x: 0, y: 0},
        image,
        playerHealth
    }){
        this.position = position
        this.velocity = velocity
        this.playerSpeed = 4

        this.spritesCount = 8
        this.spriteWidth = 160
        
        this.currentFrame = 0
        this.frameSpeed = 6
        this.frameTimer = 0
        
        this.image = image
        this.imageWidth = 0;
        this.imageHeight = 0;

        this.playerHealth = playerHealth

        this.image.onload = () => {
            this.imageWidth = image.width / this.spritesCount
            this.imageHeight = image.height 
        }
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.currentFrame * this.spriteWidth, 
            0,
            this.spriteWidth,
            this.imageHeight,
            this.position.x,  
            this.position.y, 
            this.imageWidth,
            this.imageHeight
        );
    }
    
    update(ctx) {
        this.draw(ctx)

        this.updateSpritesAnimation() 
    }

    updateSpritesAnimation() {
        this.frameTimer++

        if (this.frameTimer >= this.frameSpeed) {
            this.frameTimer = 0
            this.currentFrame = (this.currentFrame + 1) % this.spritesCount
        }
    }
}

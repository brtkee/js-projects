import { BasePlayer } from "./BasePlayer.js";
import { createImg, PLAYER_SPRITES_PATH, ENEMY_GOBLIN_PATH } from "../helpers.js";

export class Player extends BasePlayer {
    constructor({
        position = { x: 0, y: 0 },
        velocity =   { x: 0, y: 0 },
        image,
        playerHealth,
        enemies
    }){
        super({ position, velocity, image, playerHealth})

        this.keyHoldDown = false
        this.keyHoldUp = false
        this.keyHoldRight = false
        this.keyHoldLeft = false

        this.isPlayerRunning = false
        this.isPlayerIdle = true

        this.playerHealth = playerHealth
        this.hpBarElement = document.querySelector('#health')

        this.lastKey;

        this.enemies = enemies
    }   

    draw(ctx) {
        ctx.save(); 

        ctx.translate(this.position.x + this.imageWidth, this.position.y + this.imageHeight);
        
        if ((this.keyHoldLeft && this.isPlayerRunning) || this.lastKey === 'a') {
            ctx.scale(-1, 1);
        }
    
        ctx.drawImage(
            this.image,
            this.currentFrame * this.spriteWidth, 
            0,
            this.spriteWidth,
            this.imageHeight,
            -this.imageWidth / 2,  
            -this.imageHeight / 2, 
            this.imageWidth,
            this.imageHeight
        );
    
        ctx.restore(); 

        // player`s nick
        ctx.save()

        ctx.font = '20px Medieval-Font'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.fillText(
            'Brtke',
            this.position.x + this.imageWidth,
            this.position.y + this.imageHeight - 20
        )
        ctx.restore()
    }

    update(ctx) {
        super.update(ctx)

        this.hpBarElement.value = this.playerHealth
        this.playerMovement()
    }

    keyPressed(eventKey) {    
        switch(eventKey) {
            case 'w':
                this.keyHoldUp = true
                this.lastKey = 'w'
                break
            case 'a':
                this.keyHoldLeft = true
                this.lastKey = 'a'
                break
            case 's':
                this.keyHoldDown = true
                this.lastKey = 's'
                break
            case 'd':
                this.keyHoldRight = true
                this.lastKey = 'd' 
                break
        }

        if (['w', 'a', 's', 'd'].includes(eventKey)) {
            this.isPlayerRunning = true
            this.isPlayerIdle = false
            this.spritesCount = 8
            this.image = createImg(`${PLAYER_SPRITES_PATH}Run.png`)
        }

        if (eventKey === ' ') {
            this.spritesCount = 4;
            this.image = createImg(`${PLAYER_SPRITES_PATH}Attack1.png`);

            this.attackEnemy()
        }
    }

    attackEnemy() {
        this.enemies.forEach(enemy => {
            if (this.isColliding(enemy)) {
                enemy.spritesCount = 4
                enemy.image = createImg(enemy.ENEMY_PATH + 'Take Hit.png')
                enemy.hitsToKill -= 1


                if (enemy.hitsToKill === 0) {
                    enemy.spritesCount = 4
                    enemy.image = createImg(enemy.ENEMY_PATH + 'Death.png')

                    setTimeout(() => {
                        this.enemies.splice(this.enemies.indexOf(enemy), 1)
                    }, 1050)
                }
            }
        });
    }

    isColliding(enemy) {
        return (
            this.position.x < enemy.position.x + enemy.imageWidth &&
            this.position.x + this.imageWidth > enemy.position.x && 
            this.position.y < enemy.position.y + enemy.imageHeight && 
            this.position.y + this.imageHeight > enemy.position.y
        )
    }

    keyReleased(eventKey) {
        switch(eventKey) {
            case 'w':
                this.keyHoldUp = false
                break
            case 'a':
                this.keyHoldLeft = false
                break
            case 's':
                this.keyHoldDown = false
                break
            case 'd':
                this.keyHoldRight = false
                break
        }

        if (!this.keyHoldUp && !this.keyHoldLeft && !this.keyHoldDown && !this.keyHoldRight) {
            this.isPlayerRunning = false
            this.isPlayerIdle = true
            this.spritesCount = 8
            this.image = createImg(`${PLAYER_SPRITES_PATH}idle.png`)
        }
    }

    playerMovement() {
        this.velocity.x = 0
        this.velocity.y = 0

        // directions on moving
        if (this.keyHoldUp) this.velocity.y = -this.playerSpeed;
        if (this.keyHoldLeft) this.velocity.x = -this.playerSpeed;
        if (this.keyHoldDown) this.velocity.y = this.playerSpeed;
        if (this.keyHoldRight) this.velocity.x = this.playerSpeed;

        // mirror movement
        if (this.position.y + this.imageHeight >= window.innerHeight) this.position.y = 0 - this.imageHeight;
        if (this.position.y + this.imageHeight < 0) this.position.y = window.innerHeight - this.imageHeight;
        if (this.position.x + this.imageWidth >= window.innerWidth) this.position.x = 0 - this.imageWidth
        if (this.position.x + this.imageWidth < 0) this.position.x = window.innerWidth - this.imageWidth
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}
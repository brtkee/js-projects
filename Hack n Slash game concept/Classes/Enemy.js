import { BasePlayer } from "./BasePlayer.js";
import { createImg, ENEMY_SPRITES_PATH, ENEMY_GOBLIN_PATH, PLAYER_SPRITES_PATH } from "../helpers.js";

export class Enemy extends BasePlayer {
    constructor({
        position = { x: 0, y: 0 },
        velocity =   { x: 0, y: 0 },
        player,
        spritesCount,
        spriteWidth,
        currentFrame,
        frameSpeed,
        frameTimer,
        image,
        hitsToKill,
        ENEMY_PATH,
        dmg,
        enemySpeed
    }){
        super({ position, velocity, image, spritesCount, spriteWidth, currentFrame, frameSpeed, frameTimer })
        this.dmg = dmg
        this.enemySpeed = enemySpeed
        this.hitsToKill = hitsToKill

        this.spriteWidth = spriteWidth

        this.isAttacking = false
        this.attackComplete = false

        this.player = player

        this.ENEMY_PATH = ENEMY_PATH
    }   

    draw(ctx) {
        ctx.save(); 

        ctx.translate(this.position.x + this.imageWidth, this.position.y + this.imageHeight);

        if (this.player.position.x <= this.position.x) {
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
    }

    update(ctx) {
        this.draw(ctx)

        this.enemyMovement()
        super.updateSpritesAnimation()
    }

    enemyMovement() {   
        let dx = this.player.position.x  - this.position.x;
        let dy = this.player.position.y - this.position.y;

        let normalizedDistance = Math.sqrt(dx * dx + dy * dy)

        if (normalizedDistance > 5) { 
            this.position.x += (dx / normalizedDistance) * this.enemySpeed
            this.position.y += (dy / normalizedDistance) * this.enemySpeed
            this.image = createImg(this.ENEMY_PATH + 'Run.png')
        } else {
            if (!this.isAttacking) {
                this.isAttacking = true;
                this.currentFrame = 0
            }
            
            this.image = createImg(this.ENEMY_PATH + 'Attack.png')
            this.handleAttackAnimation()
        }
    }

    handleAttackAnimation() {
        if (this.currentFrame === this.spritesCount - 1 && !this.attackComplete) {
            this.player.playerHealth -= this.dmg
            this.player.spritesCount = 4
            this.player.image = createImg(PLAYER_SPRITES_PATH + 'Take Hit.png')

            this.attackComplete = true
        }

        if (this.attackComplete && this.currentFrame === 0) {
            this.attackComplete = false
            this.isAttacking = false
        }

    }
}
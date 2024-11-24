// Folders names
export const PLAYER_SPRITES_PATH = '/Player Sprites/'
export const ENEMY_SPRITES_PATH = '/Enemies Sprites/'
export const ENEMY_GOBLIN_PATH = `${ENEMY_SPRITES_PATH}Goblin/`
export const ENEMY_SKELETON_PATH = `${ENEMY_SPRITES_PATH}Skeleton/`
export const ENEMY_FLYINGEYE_PATH = `${ENEMY_SPRITES_PATH}Flying eye/`
export const ENEMY_MUSHROOM_PATH = `${ENEMY_SPRITES_PATH}Mushroom/`

export const createImg = (src) => {
    const img = new Image()
    img.src = `./Assets/${src}`
        
    return img
}
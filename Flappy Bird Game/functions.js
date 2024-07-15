export const createImg = (src) => {
    const IMG_DIR = './images/';
    const image = new Image();

    image.src = IMG_DIR + src;

    return image; 
}

export const randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

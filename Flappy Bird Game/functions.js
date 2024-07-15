export const createImg = (src) => {
    const IMG_DIR = './images/';
    const image = new Image();

    image.src = IMG_DIR + src;

    return image; 
}

export const randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const endGame = (animationID, score) => {
    const tryAgainCard = document.querySelector('.try-again');
    const scoreEl = document.querySelector('#score');
    const bestScoreEl = document.querySelector('#best');
    
    window.cancelAnimationFrame(animationID);

    if (score >= localStorage.getItem('bestScore')) {
        localStorage.setItem('bestScore', score);
    }

    tryAgainCard.classList.add('active');
    scoreEl.innerText = score;
    bestScoreEl.innerText = localStorage.getItem('bestScore');
}

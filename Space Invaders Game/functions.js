export const createImg = (src) => {
    const img = new Image();
    img.src = `./Images/${src}`;

    return img;
}

export const randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const circleRectCollisionDetection = ({ circle, rectangle }) => {
    console.log(`CIRCLE: ${circle}`)
    console.log(`RECTANGLE: ${rectangle}`)

    return (
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
    );
}

export const showLostFrame = (score) => {
   const lostGameContainer = document.createElement('div');
   lostGameContainer.id = 'lost-game';
   
   const heading = document.createElement('h2');
   heading.className = 'heading';
   heading.innerText = 'Game Over';
   lostGameContainer.append(heading);

   const scoreEl = document.createElement('span');
   scoreEl.className = 'score';
   scoreEl.innerText = `Score: ${score}`;
   lostGameContainer.append(scoreEl);

   const highScore = document.createElement('span');
   highScore.className = 'high-score';
   highScore.innerText = `High Score: ${localStorage.getItem('Score')}`;
   lostGameContainer.append(highScore);

   const restartBtn = document.createElement('button');
   restartBtn.id = 'restart';
   restartBtn.innerText = 'Restart';
   lostGameContainer.append(restartBtn);

   restartBtn.addEventListener('click', () => window.location.reload());

   document.body.append(lostGameContainer);
}



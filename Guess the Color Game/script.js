// get all dom elements
const randColorTextElem = document.getElementById("rgb-rand-color");
const tabsElems = document.querySelectorAll("li");
const gameContainerAppend = document.querySelector(".colors-grid");
const notificationElem = document.querySelector(".notification");

// initialize functions and current mode
generateRandomColors(JSON.parse(localStorage.getItem('mode')))


// make the changing modes 
tabsElems.forEach((tab) => {
    tab.addEventListener('click', (event) => {
        tabsElems.forEach((tab) => {
            tab.classList.remove("active");
        });

        // clear the table
        gameContainerAppend.innerHTML = "";

        if (event.target.textContent === "HARD") {
            generateRandomColors(6);
            localStorage.setItem('mode', 6)
        } else if (event.target.textContent === "EASY") {
            generateRandomColors(3);
            localStorage.setItem('mode', 3)
        }

        event.target.classList.add("active");

        // initialize the game
        checkIfCorrect()
    })
})

function generateRandomColors(numOfElements) {
    for(let i = 1; i <= numOfElements; i++){
        // create 3 diffrent random Colors
        const randColor1 = Math.floor(Math.random()*255);
        const randColor2 = Math.floor(Math.random()*255);
        const randColor3 = Math.floor(Math.random()*255);
        // create div 
        const div = document.createElement('div');
        div.className = "color-box";
        div.style.backgroundColor = `rgba(${randColor1}, ${randColor2}, ${randColor3})`;
        // apppend it
        gameContainerAppend.append(div);
    }
}

function checkIfCorrect(){
    const boxes = document.querySelectorAll('.color-box');
    // make the random pick of box elems
    boxes.forEach((box) => {
        const randomBoxColor = Math.floor(Math.random() * boxes.length);
        randColorTextElem.textContent = boxes[randomBoxColor].style.backgroundColor;

        // give the box listener and check if they match with correct value
        const handleClick = (event) => {
            if(event.target.style.backgroundColor !== randColorTextElem.innerText){
                notificationElem.textContent = "Try again!";
                event.target.classList.add('hidden');
                notificationElem.style.backgroundColor = "red";
            } else{
                notificationElem.textContent = "Correct!";
                notificationElem.style.backgroundColor = "green";

                box.style.pointerEvents = "none"

                // make the click again unavaible
                boxes.forEach((box) => box.removeEventListener("click", handleClick))

                // reset the game
                setTimeout(() => {
                    // clear the table and notification
                    gameContainerAppend.innerHTML = "";
                    notificationElem.textContent = ""

                    generateRandomColors(JSON.parse(localStorage.getItem('mode')))
                }, 3000)
            }
        }
        boxes.forEach((box) => box.addEventListener('click', handleClick))
    })
}

checkIfCorrect()

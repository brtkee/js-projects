// get all dom elements
const currentCategoryEl = document.querySelector("#current-category");
const gameWordEl = document.querySelector("#game-word");
const alphabetContainerEl = document.querySelector("#alphabet-container");
const currentLivesEl = document.querySelector("#current-live")

// make the array with category and word for them
const categoryAndWords = [
    {
    "Cities": [
        "Lisbona",
        "Warsaw",
        "Lauterbrunnen",
        "Tumbler Ridge",
        "Dushanbe",
        "Berlin",
        "Washington"
    ]},
    {
    "Countries": [
        "Poland",
        "Ukraine",
        "America",
        "Belgium",
        "Zimbabwe",
        "China",
        "Japan",
        "Romania",
        "Turkey"
    ]},
    {
    "Colors": [
        "Black",
        "Orange",
        "Purple",
        "Yellow",
        "Green",
        "Purple",
        "Lavender"
    ]},
    {
    "Films": [
        "The Shawshank Redemption",
        "Star Wars: A New Hope",
        "The Lord of the Rings: The Fellowship of the Ring",
        "Forrest Gump",
        "Fight Club",
        "The Matrix",
        "The Silence of the Lambs",
        "Gladiator"
    ]},
    {
    "Foods": [
        "Lasagna",
        "Pizza",
        "Burgers",
        "Ice Cream",
        "Pancakes",
        "Pancakes",
        "Falafel",
        "Kebab"
    ]}
]
// make the lives variable
let lives = 10;

// create an array with all the letters needed and append them to alphabetContainerEl
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

alphabet.forEach(letter => {
    const div = document.createElement('div');
    div.className = "box";
    div.textContent = letter.toLowerCase();

    alphabetContainerEl.append(div)
}) 

// initialize all the needed functions
init()

// make the func to get random category and random word from it
function randomCategoryAndWord(){
    // create index and name from categoryAndWords object
    const randomCategoryIndex = Math.floor(Math.random() * categoryAndWords.length);
    const randomCategoryName = Object.keys(categoryAndWords[randomCategoryIndex]).join("");

    // create random array and word from random categoryIndex
    const ArrayFromCategory = Object.values(categoryAndWords[randomCategoryIndex]).flat();
    const randomWordFromCategory = ArrayFromCategory[Math.floor(Math.random() * ArrayFromCategory.length)];

    // set the random category, word to html element
    currentCategoryEl.textContent = randomCategoryName;
    gameWordEl.textContent = randomWordFromCategory
}

// hash the word function
function hashWord(){
    const wordWithoutHash = gameWordEl.textContent;
    const wordWithHash = wordWithoutHash.replace(/[a-z]/gi, "_")
    
    // give hashed and not hashed word to handleClick func
    handleClick(wordWithoutHash, wordWithHash)
    // set the hashed word
    gameWordEl.textContent = wordWithHash
}

// function that checks if clicked letter is in word
function handleClick(word, hashedWord) {
    const alphabetBoxes = document.querySelectorAll(".box");
    let displayedWord = hashedWord.split("");

    alphabetBoxes.forEach((box) => {
        box.addEventListener("click", (event) => {
            // make variables to store the values of arguments
            const clickedLetter = event.target.textContent.toLowerCase();
            const pass = word.toLowerCase();

            // check if the clicked letter is in the password
            if (pass.includes(clickedLetter)) {
                for (let i = 0; i < pass.length; i++) {
                    if (pass[i] === clickedLetter && displayedWord[i] !== clickedLetter) {
                        displayedWord[i] = clickedLetter;
                    }
                }
                // give the correct letter classlist prepared in CSS
                box.classList.add('correct-letter')
            } else {
                // update the lives
                lives--;
                currentLivesEl.textContent = lives;
                // give the incorrect letter classlist prepared in CSS
                box.classList.add('incorrect-letter')
            }

            // update the displayed word
            gameWordEl.textContent = displayedWord.join("");
            // give hashed and not hashed word to checkWin func
            checkWin(pass, displayedWord.join(""))
        });
    });
}

// function to handle if user won or lose
function checkWin(word, hashedWord){
    // create div to show that user won
    const modal = document.createElement('section');
    modal.id = "bg-modal";

    if(word === hashedWord){
        // make diffrent messages for won and lose
        modal.innerHTML = `
        <div class="popup-modal">
            <h2>You won!</h2>
            <p>Congratulaions!</p>
            <button id="reset-game" onclick="location.reload()">Reset</button>
        </div>
        `
        document.body.append(modal)
    } else if(lives === 0){
        modal.innerHTML = `
        <div class="popup-modal">
            <h2>You Lose!</h2>
            <p>The word was: <mark><span id="word">${word}</span></mark></p>
            <button id="reset-game" onclick="location.reload()">Reset</button>
        </div>
        `
        document.body.append(modal)
    }
}

// make function to initialize 
function init(){
    randomCategoryAndWord()
    hashWord()    
}

// make the keyboard pressing also possible
window.addEventListener("keyup", (event) => {
    const alphabetBoxes = document.querySelectorAll(".box");
    alphabetBoxes.forEach((box) => {
       if(box.textContent === event.key && lives > 0){
        box.click()
       }
    })
})

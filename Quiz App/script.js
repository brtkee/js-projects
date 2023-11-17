// take all the HTML DOM elements
const content = document.querySelector("#content")
const generateBtn = document.querySelector("#generate")

// fetch the data
async function getData(){
    const response = await fetch("https://opentdb.com/api.php?amount=50")
    const data = await response.json()
    if(!response.ok) {
        alert('Too many requests! please refresh the page')
    } else{
        generateQuestion(data.results)
    }
}

// shuffle array so they dont get in the same position all the time
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// generate question that appends questions to the content
function generateQuestion(data){
    let randomIndex = Math.floor(Math.random() * data.length)
    // iterate from incorrect answers
    const allAnswers = [...data[randomIndex].incorrect_answers, data[randomIndex].correct_answer]
    const currentCorrectAnswer = data[randomIndex].correct_answer
    shuffleArray(allAnswers)
    let answersHTML = allAnswers.map((answer, index) => {
        return `<div id="answer-${index}" class="answer-input">${answer}</div>`;
    }).join('');

    let HTML = `
    <div id="quiz-card">
            <nav id="quiz-nav">
                <p>Quiz App</p>
                <span id="difficult" class="${data[randomIndex].difficulty}">${data[randomIndex].difficulty}</span> 
            </nav> 
            <h1 id="question">${data[randomIndex].question}</h1>
            <div id="answers">
                ${answersHTML}
            </div>
            <div id="description">
                <p><span id="tags">#${data[randomIndex].category}</span></p>
            </div>
        </div>`
    content.innerHTML = HTML 
    checkAnswer(currentCorrectAnswer)
}

// check if the answer is true and false
function checkAnswer(correctAnswer){
    const inputsContainer = document.querySelector("#answers");
    let answered = false;

    inputsContainer.addEventListener('click', (e) => {
        if (!answered) {
            const clickedText = e.target.textContent.trim().toLowerCase();
            const correctAnswerFormatted = correctAnswer.trim().toLowerCase();

            if (clickedText === correctAnswerFormatted) {
                e.target.classList.add('correct');
                setTimeout(() => {
                    getData()
                }, 5000)
            } else {
                if (!e.target.classList.contains('correct')) {
                    e.target.classList.add('wrong');
                    const allAnswers = Array.from(inputsContainer.children);
                    const correctIndex = allAnswers.findIndex(answer => answer.textContent.trim().toLowerCase() === correctAnswerFormatted);
                    if (correctIndex !== -1) {
                        allAnswers[correctIndex].classList.add('correct');
                    }
                }
                setTimeout(() => {
                    getData()
                }, 3000)
            }

            answered = true;
        }
    });
}

// addEventListeners:
generateBtn.addEventListener('click', getData)

// initialize the functions
getData()

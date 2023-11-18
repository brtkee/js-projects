// get HTML DOM elements
const timer = document.querySelector("#timer")
const start = document.querySelector("#start")
const stop = document.querySelector("#stop")
const reset = document.querySelector("#reset")

// create variables to initialize hours seconds etc..
let hours = 0;
let minutes = 0;
let seconds = 0;
let ms = 0;

// addEventListener and function checking if seconds have less than 10 to add "0"
start.addEventListener('click', () => {
    setInterval(() => {
        ms++;
        switch(true) {
            case ms > 99:
                ms = 0;
                seconds++;
                break;
            case seconds > 59:
                seconds = 0;
                minutes++;
                break;
            case minutes > 59:
                minutes = 0;
                hours++;
                break;
        }
        timer.innerText = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds} : ${ms < 10 ? `0${ms}` : ms}`;
    }, 10);
});

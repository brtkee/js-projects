// get all HTML DOM elements
const resultElem = document.querySelector(".password-result");
const copyButtonElem = document.querySelector(".copy-to-clipboard");
const numberElem = document.querySelector(".number");
const rangeInputElem = document.querySelector("#range");
const allcheckboxes = document.querySelectorAll(".checkbox");
const createPasswordBtnElem = document.querySelector(".create-password"); 

// create variables to set alphabet numbers and symbols
let lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
let upperCaseLetters = lowerCaseLetters.toUpperCase();
let nums = "0123456789";
let symbols = `!@#$%^&*()-_=+[]{}|;:'",.<>/?~\`\\`;

// set the rangeInput value to 12 by default
rangeInputElem.value = 12

// createPassword function
const createPassword = () => {
    let password = ''
    const length = parseInt(rangeInputElem.value);
    let selectedChars = '';

    // check if every checkbox is not checked if true show message
    if (!document.getElementById('upperCase').checked &&
    !document.getElementById('lowerCase').checked &&
    !document.getElementById('numbers').checked &&
    !document.getElementById('symbols').checked) {
    return resultElem.innerHTML = 'Please select at least one option...';
    }

    // check if every one of checkbox is checked if yes add to selected chars
    document.getElementById('upperCase').checked ? selectedChars += upperCaseLetters : ''

    document.getElementById('lowerCase').checked ? selectedChars += lowerCaseLetters : ''

    document.getElementById('numbers').checked ? selectedChars += nums : ''

    document.getElementById('symbols').checked ? selectedChars += symbols : ''

    // generate the password by looping every element in selectedChars
    for(let i = 0; i < length; i++){
        let randomIndex = Math.floor(Math.random() * selectedChars.length);
        password += selectedChars[randomIndex];
    }

    return password
}

// get the input range value
rangeInputElem.addEventListener('input', () => {
    const value = parseInt(rangeInputElem.value);
    numberElem.innerText = value;
})

// we get password from createPassword() function and we checks if password is not undefined to add to the HTML as a text
createPasswordBtnElem.addEventListener('click', () => {
    const password = createPassword()
    if (password !== undefined) {
        resultElem.innerText = password;
    }
})

// to add click to the checkbox we generate password and we want to by default to all checkox to be unchecked!
allcheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.addEventListener('click', (e) => {
        const password = createPassword();
        if (password !== undefined) {
            resultElem.innerText = password;
        }

    })
})

// that code from chat-gpt because i dont know how to copy API
copyButtonElem.addEventListener('click', async () => {
    const copyText = document.querySelector('.password-result');
    const copyTextValue = copyText.tagName === 'INPUT' || copyText.tagName === 'TEXTAREA' ? copyText.value : copyText.textContent || copyText.innerText;

    if (copyTextValue.trim() === "") {
        resultElem.innerHTML = "There's nothing to copy!";
        return;
    }

    try {
        await navigator.clipboard.writeText(copyTextValue);
    } catch(err){
        console.log(err)
    }
});

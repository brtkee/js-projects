// get all HTML elements
const inputs = document.querySelectorAll(".text-input")
const checkboxInput = document.querySelector("#agree-terms")
const dateText = document.querySelector("#date")

// reg-ex patterns with error message
const regexPatterns = {
    "name": {
        pattern: /^[a-z\d]{10,20}$/i,
        errorMessage: "Name should contain 10 to 20 letters and don't have any special characters."
    } , 
    "surname": {
        pattern: /^[a-z\d]{10,20}$/i,
        errorMessage: "Surname should contain 10 to 20 letters and don't have any special characters."
    },
    "email": {
        pattern: /^([a-z\d.%+-]{5,12})\@([a-z\d.-]{3,12})\.([a-z]{2,})$/i,
        errorMessage: "Current email was not found!"
    },
    "password": {
        pattern: /^([a-z\d\w,.]{8,20})$/i,
        errorMessage: "Password should contain 8 to 20 letters"
    }
}

// add listeners to all of the inputs
inputs.forEach((input) => {
    input.addEventListener('input', (event) => {
        const inputValue = event.target.value;
        const targetID = event.target.id;

        // Remove any existing error message
        const existingPElem = input.parentElement.querySelector('.wrong-input-message');
        if(existingPElem) {
            existingPElem.remove();
        }

        // if regex is true we make border green, else we make input red
        if(regexPatterns[targetID].pattern.test(inputValue)){
            input.style.border = "2px solid var(--correct-input)"
        } else {
            input.style.border = "2px solid var(--wrong-input)"
            
            // we create p element just to show error message
            const pElement = document.createElement('p')
            pElement.className = "wrong-input-message"
            pElement.textContent = regexPatterns[targetID].errorMessage
            input.insertAdjacentElement("afterend", pElement)
        }
    })
})

// make the actual timer on card footer
setInterval(() => {
    let date = new Date()
    dateText.innerText = date.toLocaleTimeString() 
}, 1000)


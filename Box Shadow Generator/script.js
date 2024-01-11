// get all needed elems from HTML
const boxEl = document.querySelector(".box");
const offsetXInput = document.querySelector("#offset-X");
const offsetYInput = document.querySelector("#offset-Y");
const blurRadiusInput = document.querySelector("#blur-radius"); 
const spreadRadiusInput = document.querySelector("#spread-radius");
const colorInput = document.querySelector("#color");
const insetInput = document.querySelector("#inset");
const resetBtn = document.querySelector("#reset");
const textArea = document.querySelector(".result");
const copyBtn = document.querySelector("#copy");

// all needed funcs
const updateBoxShadow = () => {
    const result = `${offsetXInput.value}px ${offsetYInput.value}px ${blurRadiusInput.value}px ${spreadRadiusInput.value}px ${colorInput.value} ${insetInput.checked === true ? "inset" : ""}`;
    boxEl.style.boxShadow = result
    textArea.value = `box-shadow: ${result};`
}

[offsetXInput, offsetYInput, blurRadiusInput, spreadRadiusInput, insetInput].forEach((element) => {
    element.addEventListener('input', updateBoxShadow)
})

// make the reset function and gave all the inputs 50 value
const resetInputs = () => {
    [offsetXInput, offsetYInput, blurRadiusInput, spreadRadiusInput].forEach(element => {
        element.value = "50";
    })
    colorInput.value = "black";
    // just to change the color input
    updateBoxShadow()
}

// always reset the inputs
resetInputs()

// copy to clipboard function
const copyToClipboard = () => {
    const copyResultContainer = document.querySelector(".copy-result");

    textArea.select();
    document.execCommand('copy');

    const existingPopup = document.querySelector('.pop-up');

    if (!existingPopup) {
        const div = document.createElement('div');
        div.className = 'pop-up';
        div.textContent = 'Copied to clipboard!';
        
        copyResultContainer.appendChild(div);

        setTimeout(() => {
            copyResultContainer.removeChild(div);
        }, 2000);
    }
}

// event listeners
colorInput.addEventListener('change', updateBoxShadow)
copyBtn.addEventListener('click', copyToClipboard)
resetBtn.addEventListener('click', resetInputs)


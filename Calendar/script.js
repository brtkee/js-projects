// take HTML elements
const month = document.querySelector("#current-month")
const days = document.querySelector("#days")
const icons = document.querySelectorAll("ion-icon")

// create dates
let date = new Date()
let currentYear = date.getFullYear()
let currentMonth = date.getMonth()

// renderCallendar function
const renderCalendar = () => {
    const months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
    let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    let lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDay()
    let lastDayOfLastMonth = new Date(currentYear, currentMonth, 0).getDate()

    let liHTML = ""
    
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        liHTML += `<li class="unactive">${lastDayOfLastMonth - i}</li>`
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        liHTML += `<li>${i}</li>`
    }

    for (let i = lastDayOfMonth + 1; i < 7; i++) {
        liHTML += `<li class="unactive">${i - lastDayOfMonth}</li>`
    }

    days.innerHTML = liHTML
    month.innerText = `${months[currentMonth]} ${currentYear}`
}

renderCalendar()

//icons in loop
icons.forEach((icon) => {
    icon.addEventListener('click', (event) => {
        if (event.target.id == 'icon-forward') {
            currentMonth = (currentMonth + 1) % 12;
        } else if (event.target.id == 'icon-backward') {
            currentMonth = (currentMonth - 1 + 12) % 12;
        }
        renderCalendar();
    })
})

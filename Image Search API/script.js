// all HTML elements needed
const accessKey = 'zk3FGCQSvr-aXHc7cGV9_CAujxot1Wi6c16dQWaMXGw'
const inputQuery = document.querySelector("#search-query")
const submitBtn = document.querySelector("#search")
const cardsContainer = document.querySelector("#cards-container")
const content = document.querySelector("#content")

// page for unsplah api
let page = 1

// search function with fetch 
async function search(){
    let inputValue = inputQuery.value 
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputValue}&client_id=${accessKey}`

    const response = await fetch(url)
    const data = await response.json()
    if(inputValue == ''){
        showAlert('Your input is empty!')
        
    } else if(data.results = []){
        showAlert('Images not found!')
    }
    createCard(data.results)
}

// create HTML element with json data
function createCard(data) {
    let container = '' 
    data.map((element) => {
        let el = `
        <div class="card" style="background-image:url(${element.urls.raw});" loading="lazy">
            <div class="description">
                <p>${element.alt_description.length > 35 ? `${element.alt_description.slice(0, 35)}...` : element.alt_description}</p>
                <p id="tags">${element.tags.map(tag => `#${tag.title}`).join(', ')}</p>
            </div>
        </div>
        `
        container += el
    })
    inputQuery.value = ''
    cardsContainer.innerHTML = container
}

// show error messages if input value is null or images was not found in unsplash api
function showAlert(text){
    const exist = document.querySelector(".wrong")
    if(!exist){
        let div = document.createElement('div')
        div.className = 'wrong'
        div.innerText = text
        content.appendChild(div)
        setTimeout(() => {
            div.remove()
        }, 3000)
    }
}

// addEventListeners to HTML elements
submitBtn.addEventListener('click', search)
inputQuery.addEventListener('keyup', (e) => {
    e.key == 'Enter' ? search() : ''
})

// create variables to store API keys
const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// all HTML elements:
const inputSearchEl = document.querySelector("#search-by-query");
const buttonSearchEl = document.querySelector("#search-movie");
const mainContent = document.querySelector("#main-content");

// function that fetch data with provided url's
const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    showMovies(data.results);
}

// function that show's movie for each element in array(data.results from fetching)
const showMovies = (data) => {
    data.forEach((element) => {
        const {backdrop_path, original_title, vote_average, adult, relase_date, overview} = element
        const div = document.createElement('div');
        div.className = "card";
        div.innerHTML = `
        <img src="${IMAGE_PATH + backdrop_path}" alt="${original_title}" id="movie-image">
            <div id="content">
                <h1 class="title">${original_title}</h1>
                <span class="filter" id="rating"><ion-icon name="star-outline"></ion-icon>${vote_average}</span>
                <span class="filter" id="adult">${adult}</span>
                <span class="filter" id="release-date">${relase_date}</span>
                <p class="overview">${overview}</p>
            </div>
        `;

        mainContent.appendChild(div);
    })
}

// addEventListener that checks if input value is not whitespaces if it's not it will fetch with query from API
buttonSearchEl.addEventListener('click', () => {
    let inputValue = inputSearchEl.value;
    if(inputValue.trim() != 0){
        fetchData(SEARCH_API + inputValue)
    }else{
        console.log('error')
    }
})

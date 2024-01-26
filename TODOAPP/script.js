// get HTML dom elements
const input = document.querySelector("#value")
const btn = document.querySelector("#submit")
const people = document.querySelector("#tasks")

// set a global variable for easier to edit in functions
var arr = []

// function addTask() which gets localStorageItems and checks if locale storage in not empty
function addTask(){
    let getLocaleStorage = localStorage.getItem('tasks')
    if(getLocaleStorage == null){
        arr = []
    }else{
        arr = JSON.parse(getLocaleStorage)
    }
    const inputValue = input.value 
    if(input.value.trim() === ""){
        alert("Your input is empty")
    } else{
        arr.push(inputValue)
        localStorage.setItem('tasks', JSON.stringify(arr))
        showTasks()
        input.value = ''
    }
}

// function showTasks() which add li to people(ul) 
function showTasks() {
    let getLocaleStorage = localStorage.getItem('tasks')
    if(getLocaleStorage == null){
        arr = []
    }else{
        arr = JSON.parse(getLocaleStorage)
    }
    let li = ''
    arr.forEach((element, index) => {
        li += `<li>${element} <span class="delete" id="${index}" data-index = "${index}"><ion-icon name="trash-outline"></ion-icon></span></li>`
    })
    people.innerHTML = li

    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteTask);
    });
}
showTasks()

// function deleteTask() which deletes task with index in it
function deleteTask(index){
    arr.splice(index, 1)
    localStorage.setItem('tasks', JSON.stringify(arr))
    showTasks()
}

// add event listener to button
btn.addEventListener('click', addTask)

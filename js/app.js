let $ = document

let inputElemTodo = $.getElementById("inputElemTodo")
let divElemMain = $.getElementById('mainTodos')
let addTodoBtn = $.getElementById("addTodoBtn")
let clearTodoBtn = $.getElementById("clearTodoBtn")
let alert = $.getElementById('alert')

let todosArray = []


function addTodo() {

    if (inputElemTodo.value.length < 2) {
        alert.innerHTML = "Empety !"
        alert.className = 'text-danger'
    }
    else {

        alert.innerHTML = "Looks good! "
        alert.className = 'text-success'

        let valueInput = inputElemTodo.value

        let newTodoObj = {
            id: todosArray.length + 1,
            title: valueInput,
            complete: false
        }
        ///
        inputElemTodo.value = ''
        ///
        todosArray.push(newTodoObj)
        setLocalStorage(todosArray)
        todosGenerator(todosArray)
    }

}

function setLocalStorage(todosList) {
    localStorage.setItem('todos', JSON.stringify(todosList))
}

function todosGenerator(todosList) {
    ///bi bi-journal-check fs-4      bi bi-journal-x fs-4
    let newTodoTitle, newTodoCompleteBtn, newTodoDeleteBtn

    ///
    divElemMain.innerHTML = ''
    todosList.forEach(function (todo) {
        ///Btn Delet And Complete
        newTodoCompleteBtn = $.createElement('i')
        newTodoCompleteBtn.className = 'btn btn-outline-success '
        newTodoCompleteBtn.innerHTML = 'Complete'

        newTodoCompleteBtn.setAttribute('onclick', 'editTodo(' + todo.id + ')')
        //
        newTodoDeleteBtn = $.createElement('i')
        newTodoDeleteBtn.className = 'btn btn-outline-danger'
        newTodoDeleteBtn.innerHTML = 'Delete'

        newTodoDeleteBtn.setAttribute('onclick', "removeTodo(" + todo.id + ")")

        /// Div Buttons
        let divElemBtns = $.createElement('div')
        divElemBtns.className = 'btn-group'
        divElemBtns.append(newTodoCompleteBtn, newTodoDeleteBtn)

        /// Title Todo
        newTodoTitle = $.createElement('p')
        newTodoTitle.className = 'card-title text-light h5 mb-0 bg-dark py-2 px-3 me-3 rounded overflow-auto fst-italic'
        newTodoTitle.innerHTML = todo.title

        /// Div Card Hold  //Title Todo//  And  //Btn Delet//  And  //Btn Complete//
        let divCard = $.createElement('div')
        divCard.className = 'd-flex align-items-center justify-content-between'
        divCard.append(newTodoTitle, divElemBtns)

        /// Hold Div Card
        let sectionElem = $.createElement('section')
        sectionElem.className = 'card card-body bg-transparent border-success mt-2'
        sectionElem.append(divCard)

        if (todo.complete) {
            newTodoCompleteBtn.innerHTML = 'UnComplete'
            newTodoTitle.style.textDecoration = 'line-through'
        }

        /// Hold Main
        divElemMain.append(sectionElem)
    })
}

//editTodos
function editTodo(todoId) {

    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    todosArray.forEach(function (todo) {
        if (todo.id === todoId) {
            todo.complete = !todo.complete
        }

    })

    setLocalStorage(todosArray)
    todosGenerator(todosArray)

}

//clearBtn
function removeTodo(todoId) {
    console.log(todoId);

    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    let mainTodoIndex = localStorageTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    console.log(mainTodoIndex);

    todosArray.splice(mainTodoIndex, 1)

    setLocalStorage(todosArray)

    todosGenerator(todosArray)
}


function getLocalStorage() {

    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    if (localStorageTodos) {
        todosArray = localStorageTodos
    } else {
        todosArray = []
    }
    todosGenerator(todosArray)

}

function clearTodos() {
    todosArray = []
    todosGenerator(todosArray)
    localStorage.removeItem('todos')

}

//|||||||||||||||||||  Events  |||||||||||||||||||\\
window.addEventListener('load', getLocalStorage)
addTodoBtn.addEventListener('click', addTodo)
clearTodoBtn.addEventListener('click', clearTodos)
inputElemTodo.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        addTodo()
    }
})
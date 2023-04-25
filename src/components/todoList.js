const todoList = () => {
// Model

let todos;

const getData = () => {
    const loadData = JSON.parse(localStorage.getItem('todos'))
    if(Array.isArray(loadData)){
        return todos = loadData
    }else {
        return todos = []
    }
}

getData();

const createTodoData = (title) => {
    const id = Math.floor(Math.random() * 100000000)

    todos.push({
        title: title,
        id: id,
        completed: false,
    })
}

const removeTodoData = (todoId) => {

    const todoIndex = todos.findIndex((obj) => obj.id === todoId )

    return todoIndex > -1 ? todos.splice(todoIndex, 1) : todos

}

const saveTodoData = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))

}

// Controller

const openForm = () => {
    document.getElementById('form_popup').style.display = "block"
    console.log('clicked')
}

const closeForm = () => {
    document.getElementById('form_popup').style.display = "none"

}

const addTodoData = () => {
    const todo_input = document.getElementById('todo_input_text')
    if (todo_input.value === ''){
        alert('Please enter a value')
    }else {
        createTodoData(todo_input.value)
        saveTodoData(todos)
        render()
    }
    
}

const deleteTodo = (e) => {
   const todoId = e.target.id
   
   removeTodoData(parseInt(todoId))
   saveTodoData(todos)
   render();

}

// Event Listener for todo input

document.getElementById('todo_input_text').addEventListener('keydown', (e) => {
    e.key === 'Enter' ? addTodoData() : false
})

// View

const render = () => {
    
    const open_btn = document.getElementById('open_btn')
    open_btn.onclick = openForm;

    const close_btn = document.getElementById('close_btn')
    close_btn.onclick = closeForm;

    // event listener for todo input enter

    const add_btn = document.getElementById('add_btn')
    add_btn.onclick = addTodoData

    

    document.getElementById('todo_display').innerHTML = ''

    todos.map(todo => {
        const element = document.getElementById('todo_display')
        const todo_container = document.createElement('div')
        todo_container.id = 'todo_container'
        element.appendChild(todo_container)

        const title = document.createElement('div');
        title.innerHTML = todo.title;
        title.id = 'todo_title'
        todo_container.appendChild(title);

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.id = 'todo_checkbox'
        title.prepend(checkbox)
        
        const deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'Delete'
        deleteBtn.className = 'delete_btn'
        deleteBtn.id = todo.id
        deleteBtn.onclick = deleteTodo;
        todo_container.appendChild(deleteBtn)
        


    })
}

render();
}

export default todoList
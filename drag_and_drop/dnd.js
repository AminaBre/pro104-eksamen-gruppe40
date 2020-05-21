//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');




//Event Listeners
todoButton.addEventListener('click', addTodo);

//Functions
function addTodo(event) {
    //prevents the form from submitting
    event.preventDefault();

    // to-do DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //create list item
    const newTodo = document.createElement('li');
    newTodo.innerText = 'hey';
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //completed/checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerText = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerText = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to-do list
    todoList.appendChild(todoDiv);
}
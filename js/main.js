let token = localStorage.getItem('token');

if (!token) {
    location.replace('index.html');
}

let logOutBtn = document.querySelector('.site-header__logout');

logOutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    location.reload();
})

let todoForm = document.querySelector('.todos__form');
let elTodoVal = document.querySelector('.todo-input');
let elList = document.querySelector('.todos__list');
let todos = [];

function renderTodos(array) {
    elList.innerHTML = '';
    array.forEach(el => {
        let newItem = document.createElement('li');
        newItem.innerHTML =
            `
            <li class="todos__item">
                <span class="todos__value">${el.todo_value}</span>
                <button class="todos__edit" data-todo-id="${el.id}"></button>
                <button class="todos__delete" data-todo-id="${el.id}"></button>
            </li>
            `;
        elList.appendChild(newItem);
    });
    elTodoVal.value = '';
}

async function getTodos() {
    const res = await fetch('http://localhost:5000/todo', {
        headers: {
            Authorization: token,
        }
    });
    const data = await res.json();
    renderTodos(data);
}
getTodos();


todoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    function postTodos() {
        if(elTodoVal.value == '') {
            return 0;
        }
        fetch('http://localhost:5000/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({
                text: elTodoVal.value,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if(data) {
                todos.push(data);
                renderTodos(todos)
            }
        })
        .catch(err => console.log(err))
    }
    postTodos();
    location.reload();
})

function deleteTodo(id) {
    fetch(`http://localhost:5000/todo/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: token,
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if(data) {
            getTodos(todos)
        }
    })
    .catch(err => console.log(err))
}

function editTodo(id) {
    const newEditedTodo = prompt('Enter new todo', elTodoVal.value)
    fetch(`http://localhost:5000/todo/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify(
            {
                text: newEditedTodo,
            }
        )
    })
    .then((res) => res.json())
    .then((data) => {
        if(data) {
            getTodos(todos)
        }
    })
    .catch(err => console.log(err))
}

elList.addEventListener('click', (evt) => {
    if (evt.target.matches('.todos__delete')) {
        const todoId = evt.target.dataset.todoId;
        deleteTodo(todoId);
    }
    if (evt.target.matches('.todos__edit')) {
        const todoId = evt.target.dataset.todoId;
        editTodo(todoId);
    }
})
let token = localStorage.getItem('token');

if (token) {
    location.replace('todo.html');
}

let loginBtn = document.querySelector('.hero__login');
let registerBtn = document.querySelector('.hero__register');

loginBtn.addEventListener('click', () => {
    location.replace('login.html')
})

registerBtn.addEventListener('click', () => {
    location.replace('register.html')
})
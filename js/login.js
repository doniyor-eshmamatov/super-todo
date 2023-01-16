let elPassInput = document.querySelector('.js-password');
let elEmailnput = document.querySelector('.js-email')
let elForm = document.querySelector('.login-form');
let showPassword = document.querySelector('.js-hide');

showPassword.addEventListener('click', () => {
    if (elPassInput.type == 'password') {
        elPassInput.type = 'text';
        showPassword.src = '../images/hide.png';
    }
    else {
        elPassInput.type = 'password';
        showPassword.src = '../images/show.png';
    }
})






elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: elEmailnput.value,
            password: elPassInput.value
        })
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            location.replace('todo.html')
        }
        else {
            location.reload();
        }
    })
})


let back = document.querySelector('.back');
back.addEventListener('click', () => {
    location.replace('index.html');
})
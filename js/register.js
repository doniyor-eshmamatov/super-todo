let elForm = document.querySelector('.register-form');
let elNameInput = document.querySelector('.js-name');
let elPhoneInput = document.querySelector('.js-phone');
let elEmailInput = document.querySelector('.js-email');
let elPasswordInput = document.querySelector('.js-password');

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    function fetched() {
        fetch('http://localhost:5000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: elNameInput.value,
                phone: elPhoneInput.value,
                email: elEmailInput.value,
                password: elPasswordInput.value
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    location.replace('index.html')
                }
            })
    }
    fetched();
})

let back = document.querySelector('.back');
back.addEventListener('click', () => {
    location.replace('index.html');
})
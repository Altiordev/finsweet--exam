const validationInfo = document.querySelector('.validation'),
    form = document.querySelector('.form'),
    inputs = document.querySelectorAll('.input'),
    firstName = document.querySelector('.firstName'),
    lastName = document.querySelector('.lastName'),
    username = document.querySelector('.username'),
    password = document.querySelector('.password'),
    confPassword = document.querySelector('.confPassword');

const name_regex = /\w{3,16}/

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (firstName.value == "" || lastName.value == "" || username.value == "" || password.value == "" || confPassword.value == "") {
        validationInfo.textContent = "All fields are required!";
    } else if (!name_regex.test(firstName.value)) {
        validationInfo.textContent = "name invalid!";
    } else if (password.value == confPassword.value) {
        validationInfo.textContent = "";
    } else {
        validationInfo.textContent = "passwords don't match!";
    }

    form.reset();
})
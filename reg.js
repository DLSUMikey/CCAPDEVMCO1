const form = document.getElementById('register');
const email = document.getElementById('regemail');
const password = document.getElementById('password1');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateInputs()){
        window.location.href = 'main.html';
    }

});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isEmailValid = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@dlsu\.edu\.ph$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const emailValue = email.value.trim();
    const password1Value = password1.value.trim();
    const password2Value = password2.value.trim();
    let isValid = true;
    if(emailValue === ''){
        setError(email, 'DLSU Email is required')
        isValid=false;
    }
    else if(!isEmailValid(emailValue)){
        setError(email, 'Provide a DLSU email address');
        isValid=false;
    }
    else{
        setSuccess(email);
    }

    if(password1Value === ''){
        setError(password, 'Password is required')
        isValid=false;
    }
    else if (password1Value.length < 8){
        setError(password, 'Password must be at least 8 characters.');
        isValid=false;
    }
    else{
        setSuccess(password);
    }

    if(password2Value === ''){
        setError(password2,'Please confirm your password');
        isValid=false;
    }
    else if(password2Value !== password1Value){
        setError(password2,'Passwords does not match');
        isValid=false;
    }
    else{
        setSuccess(password2);
    }
    return isValid;
};


const loginForm = document.getElementById('login');
const logEmail = document.getElementById('logemail');
const logPassword = document.getElementById('logpass');

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    if (validateLogin()) {
        window.location.href = 'main.html';
    }
});

const validateLogin = () => {
    const logEmailValue = logEmail.value.trim();
    const logPasswordValue = logPassword.value.trim();
    let isValid = true;

    if(logEmailValue === '') {
        setError(logEmail, 'Email is required');
        isValid = false;
    } else if (!isEmailValid(logEmailValue)) {
        setError(logEmail, 'Provide a valid email address');
        isValid = false;
    } else {
        setSuccess(logEmail);
    }

    if(logPasswordValue === '') {
        setError(logPassword, 'Password is required');
        isValid = false;
    } else if (logPasswordValue.length < 8) {
        setError(logPassword, 'Password must be at least 8 characters');
        isValid = false;
    } else {
        setSuccess(logPassword);
    }

    return isValid;
};







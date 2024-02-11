const form = document.getElementById('register');
const email = document.getElementById('regemail');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.success');

    errorDisplay.innertext = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innertext = message;
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isEmailValid = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@dlsu\.edu\.ph$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const emailValue = email.value.trim();
    const password = password.value.trim();
    const password2 = password2.value.trim();

    if(emailValue === ''){
        setError(email, 'DLSU Email is required')
    }
    else if(!isEmailValid(emailValue)){
        setError(email, 'Provide a DLSU email address');
    }
    else{
        setSuccess(email);
    }

    if(passwordValue === ''){
        setError(password, 'Password is required')
    }
    else if (passwordValue.length < 8){
        setError(password, 'Password must be at least 8 characters.');
    }
    else{
        setSuccess(password);
    }

    if(password2Value === ''){
        setError(password2,'Please confirm your password');
    }
    else if(password2Value !== passwordValue){
        setError(password2,'Passwords does not match');
    }
    else{
        setSuccess(password2);
    }
}


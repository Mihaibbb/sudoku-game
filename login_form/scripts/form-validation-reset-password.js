const form = document.querySelector('form');
const emailInput = form.querySelector('input');
const sendButton = form.querySelector('button');
const errorsField = document.querySelector('.errors');

sendButton.addEventListener('click', e => {
    let errors = [];
    if (emailInput.value === "") errors.push("All fields must not be empty!")
    if (errors.length !== 0) e.preventDefault();
    if (!checkValidEmail() && errors.length === 0) {
        errors.push("Email must be correct!");
        e.preventDefault();
    } 
    errorsField.innerHTML = '';

    errors.forEach((error) => {
        const errMessage = document.createElement('div');
        errMessage.classList.add('err');
        errMessage.innerText = error;
        errorsField.appendChild(errMessage);
    });
    
});

const checkValidEmail = () => {
    const email = emailInput.value;
    if (email.length < 8) return false;     
    if (!email.includes('@')) return false;

    return true;
}
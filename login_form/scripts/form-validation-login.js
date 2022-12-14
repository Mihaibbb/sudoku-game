class FormValidationLogin {

   constructor(form, inputs, button) {
       this.form = form;
       this.inputs = inputs;
       this.button = button;
   }

   emptyFields() {
       return [...this.inputs].every(input => {
           return input.value !== "";
       });
   }

   emptyFieldsErr() {
       return "All fields must not be empty!";
   }

}

const formLogin = document.querySelector('form.login-form');
const inputsLogin = formLogin.querySelectorAll('input:not(.check-box)');
const buttonLogin = formLogin.querySelector('button');
const errMessagesContentLogin = document.querySelector('.errors');

const validatorLogin = new FormValidationLogin(formLogin, inputsLogin, buttonLogin);

buttonLogin.addEventListener('click', e => {
    const prevErrorMessages = document.querySelectorAll('.err');
    if (prevErrorMessages !== undefined) prevErrorMessages.forEach(prevErrorMessage => prevErrorMessage.remove());

    let errors = [];

    const valid = validatorLogin.emptyFields();

    if (!valid) errors.push(validatorLogin.emptyFieldsErr());

    if (errors.length !== 0) e.preventDefault();
    

    errors.forEach(error => {   
        const errMessage = document.createElement('div');
        errMessage.classList.add('err');
        errMessage.innerText = error;
        errMessagesContentLogin.appendChild(errMessage);
    });
});

// Input pressing enter and switching to the next one


inputsLogin.forEach((input, index) => {
    input.addEventListener('keydown', e => {
        

        if (e.key !== 'Enter' && e.key !== 'Backspace') return;

        if (e.key === 'Enter') {
            if (inputsLogin[index + 1] === undefined) return;
            e.preventDefault();
            inputsLogin[index + 1].focus();
            return;
        }
        
        if (inputsLogin[index - 1] === undefined) return;

        if (input.value.length === 0) {
            inputsLogin[index - 1].focus();  
        }
    });
});




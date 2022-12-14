class FormValidation {

    constructor(form, inputs, button) {
        this.form = form;
        this.inputs = inputs;
        this.button = button;
    }

    checkEmptyFields() {
        return [...this.inputs].every(input => {
            return input.value !== "";
        }); 
    }

    checkValidEmail() {
        const email = this.form.querySelector('.email').value;
        if (email.length < 8) return false;
        let numberOfArounds = 0;

        for (let i = 0; i < email.length; i++) {
            if (email[i] === "@") numberOfArounds++;
        }     
        
        if (numberOfArounds !== 1) return false;

        return true;
    }

    checkPasswordsLength() {
        this.password = this.form.querySelector('.password1').value;
        if (this.password.length < 8) return false;
        return true;
    }

    checkPasswordsAreTheSame() {
        this.password = this.form.querySelector('.password1').value;
        this.repeatPassword = this.form.querySelector('.password2').value;
        if (this.password !== this.repeatPassword) return false;
        return true;
    }

    // Errors function

    emptyFieldsErr() {
        return "All fields must not be empty!";
    }

    emailValidErr() {
        return 'Email must be valid!';
    }

    passwordLengthErr() {
        return "The password must contain at least 8 characters!";
    }

    passwordRepeatErr() {
        return "The passwords are not the same!";
    }
}



const form = document.querySelector('form.signup-form');
const inputs = form.querySelectorAll('input');
const button = form.querySelector('button');
const errMessagesContent = document.querySelector('.errors');

const validator = new FormValidation(form, inputs, button);

// Button click event
button.addEventListener('click', e => {

    const prevErrorMessages = document.querySelectorAll('.err');
    if (prevErrorMessages !== undefined) prevErrorMessages.forEach(prevErrorMessage => prevErrorMessage.remove());

    let errors = [];

    // for submitting we need to be sure of some stuff
    const valid = validator.checkEmptyFields();
    const validEmail = validator.checkValidEmail();
    const passwordsLength = validator.checkPasswordsLength();
    const correctPasswords = validator.checkPasswordsAreTheSame();

    if (!valid) errors.push(validator.emptyFieldsErr());
    else {
        if (!validEmail) errors.push(validator.emailValidErr());
        if (!passwordsLength) errors.push(validator.passwordLengthErr());
        if (!correctPasswords) errors.push(validator.passwordRepeatErr());
    }
   

    if (errors.length !== 0) e.preventDefault();

    errors.forEach(error => {
        const errMessage = document.createElement('div');
        errMessage.classList.add('err');
        errMessage.innerText = error;
        errMessagesContent.appendChild(errMessage);
    });
});

// Input pressing enter and switching to the next one
inputs.forEach((input, index) => {
    input.addEventListener('keydown', e => {
        
        if (e.key !== 'Enter' && e.key !== 'Backspace' && e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        if (e.key === 'Enter' || e.key === 'ArrowDown') {
            if (inputs[index + 1] === undefined) return;
            e.preventDefault();
            inputs[index + 1].focus();
            return;
        }
        
        if (inputs[index - 1] === undefined) return;
        if (input.value.length === 0) inputs[index - 1].focus();

    });
});

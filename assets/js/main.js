class FormValid {
    constructor() {
        this.form = document.querySelector('.form');

        this.events()
    }

    events() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const validFields = this.fieldIsValid();
        const validPasswords = this.passwordIsValid();

        if(validFields && validPasswords) {
            alert('Formulário enviado.')
            this.form.submit();
        }
    }

    fieldIsValid() {
        let valid = true;

        for (let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for (let field of this.form.querySelectorAll('.validate')){
            const label = field.previousElementSibling.innerText;
            if(!field.value) {
                this.createError(field, `Campo "${label}" não pode estar em branco.`)
                valid = false;
            }

            if(field.classList.contains('cpf')) {
                if(!this.validateCPF(field)) valid = false;
            }

            if(field.classList.contains('user')) {
                if(!this.validateUser(field)) valid = false;
            }
        }

        return valid;
    }

    validateCPF(field) {
        const cpf = new ValidateCPF(field.value);

        if(!cpf.validate()) {
            this.createError(field, 'CPF inválido.');
            return false;
        }
        return true;
    }

    validateUser(field) {
        const user = field.value;
        let valid = true;

        if(user.length < 3 || user.length > 12) {
            this.createError(field, 'Usuário precisa ter entre 3 e 12 caracteres.');
            valid = false;
        }

        if(!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(field, 'Nome de usuário precisa conter apenas letras e/ou números.');
            valid = false;
        }

        return valid; 
    }

    passwordIsValid() {
        let valid = true;
        const password = this.form.querySelector('.password');
        const repeatPassword = this.form.querySelector('.repeat-password');
        if(password.value != repeatPassword.value) {
            valid = false;
            this.createError(password, 'Campos senha e repetir senha precisam ser iguais.')
            this.createError(repeatPassword, 'Campos senha e repetir senha precisam ser iguais.')
        }
        if(password.value.length < 6 || password.value.length > 12) {
            valid = false;
            this.createError(password, 'A senha precisa possuir entre 6 e 12 caracteres.')

        }
        return valid;
    }

    createError(field, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }
}

const valid = new FormValid();

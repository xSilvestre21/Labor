

class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.validFields();
        const senhasValidas = this.validPasswords()

        if(camposValidos && senhasValidas) {
            this.formulario.submit();
        }
    }

    validPasswords() {
        let valid = true 
        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');

        if(senha.value !== repetirSenha.value) {
            valid = false;
            this.createError(senha, 'Campos senha e repetir senha precisam ser iguais.');
            this.createError(repetirSenha, 'Campos senha e repetir senha precisam ser iguais.');
        }

        if(senha.value.lenght < 6 || senha.value.lenght > 12) {
            valid = false;
            this.createError(senha, 'Senha precisa conter de 6 a 12 caracteres');
        }
        return valid;
    }

    validFields() {
        let valid = true;
    
        for(let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerText;
            if(!campo.value) {
                this.createError(campo, `Campo "${label}" não pode estar em branco`);
                valid = false;
            }

            if(campo.classList.contains('cpf')) {
                if(!this.validaCPF(campo)) valid = false;
            }

            if(campo.classList.contains('usuario')) {
                if(!this.validaUsuario(campo)) valid = false;
            }
        }

        return valid;
    }

    validaUsuario(campo) {
        const usuario = campo.value;
        let valid = true;

        if(usuario.length < 3 || usuario.length > 12) {
            this.createError(campo, 'Usuário precisa ter entre 3 e 12 caracteres' )
        }

        if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(campo, 'Nome de usuário precisa conter apenas letras e/ou números');
        }




        return valid;
    }

    validaCPF(campo) {
        const cpf = new ValidaCpf(campo.value);
        if(!cpf.valida()) {
            this.createError(campo, 'CPF inválido');
            return false;
        }



        return true;
    }

    createError(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);

    } 
}

const valida = new ValidaFormulario();
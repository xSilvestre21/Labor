class ValidaCpf {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    ehSequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    geraNovoCpf() {
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCpf.geraDigito(cpfSemDigitos);
        const digito2 = ValidaCpf.geraDigito(cpfSemDigitos + digito1);
        this.novoCPF = cpfSemDigitos + digito1 + digito2;

    }

    static geraDigito(cpfSemDigitos) {
        let total = 0;
        let reverso = cpfSemDigitos.length + 1;

        for(let stringNumerica of cpfSemDigitos) {
            //console.log(stringNumerica, reverso);
            total += reverso * Number(stringNumerica);
            reverso--;
        }
        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }

    valida() {
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.ehSequencia()) return false;
        this.geraNovoCpf();

        return this.novoCPF == this.cpfLimpo;
    }
}

// let validaCpf = new ValidaCpf('489.581.638.95');
// // validaCpf = new ValidaCpf('999.999.999-99');
// if(validaCpf.valida()) {
//     console.log('CPF válido');
// } else {
//     console.log('CPF inválido');
// }
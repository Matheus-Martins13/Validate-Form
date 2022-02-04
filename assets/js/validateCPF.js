class ValidateCPF {
    constructor(cpfSent) {
        Object.defineProperty(this, 'cpfClear', {
            writable: false,
            enumerable: false, 
            configurable: false,
            value: cpfSent.replace(/\D+/g, '')
        });
    }

    isSequence() {
        return this.cpfClear.charAt(0).repeat(this.cpfClear.length) === this.cpfClear;
    }

    generateNewCpfCpf() {
        const cpfNoDigits = this.cpfClear.slice(0, -2);
        const digit1 = ValidateCPF.generateDigit(cpfNoDigits);
        const digit2 = ValidateCPF.generateDigit(cpfNoDigits + digit1);
        this.newCPF = cpfNoDigits + digit1 + digit2;
    }

    static generateDigit(cpfNoDigits) {
        let total = 0;
        let reverse = cpfNoDigits.length + 1;
        
        for(let numericString of cpfNoDigits) {
            total += reverse * Number(numericString);
            reverse--;
        }

        const digit = 11 - (total % 11);
        return digit > 9 ? '0' : String(digit);
    }

    validate() {
        if(!this.cpfClear) return false;
        if(typeof this.cpfClear !== 'string') return false;
        if(this.cpfClear.length !== 11) return false;
        if(this.isSequence()) return false;
        this.generateNewCpfCpf();

        return this.newCPF === this.cpfClear;
    }
}

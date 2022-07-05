export class Pcard {

    constructor(el) {
        this.data = {
            number: {
                value: '',
                valueFormatted: '',
                isValid: false
            },
            name: {
                value: '',
                isValid: false
            },
            month: {
                value: '',
                isValid: false
            },
            year: {
                value: '',
                isValid: false
            },
            cvv: {
                value: '',
                isValid: false
            }
        };

        // Form elements
        this.$el = document.querySelector(el);
        this.$number = this.$el.querySelector("[name='number']");
        this.$name = this.$el.querySelector("[name='name']");
        this.$month = this.$el.querySelector("[name='month']");
        this.$year = this.$el.querySelector("[name='year']");
        this.$cvv = this.$el.querySelector("[name='cvv']");
        this.$button = this.$el.querySelector('button');

        // Placeholders
        this.$number.placeholder = "0000 0000 0000 0000";
        this.$month.placeholder = "ММ";
        this.$year.placeholder = "ГГ";
        this.$name.placeholder = "Имя и фамилия";
        this.$cvv.placeholder = "###";

        this.onInput = this.onInput.bind(this);
        this.$el.addEventListener('input', this.onInput);
    }

    onInput(event) {
        let target = event.target;

        switch (target.dataset.el) {

            case 'number':
                let number = this.getNumber(target.value);
                let maskedNumber = this.maskNumber(number)
                target.value = maskedNumber;

                this.data['number']['value'] = '';
                this.data['number']['valueFormatted'] = '';
                this.data['number']['isValid'] = false;

                if (this.validNumber(number)) {
                    this.data['number']['value'] = number;
                    this.data['number']['valueFormatted'] = maskedNumber;
                    this.data['number']['isValid'] = true;
                    target.classList.add('success');
                }

                break;

            case 'month':
                let month = target.value.replace(/\D/, '');
                target.value = month;

                this.data['month']['value'] = '';
                this.data['month']['isValid'] = false;
                target.classList.remove('error');
                target.classList.remove('success');

                if (month.length == 2) {
                    if (this.validMonth(month)) {
                        this.data['month']['value'] = month;
                        this.data['month']['isValid'] = true;
                        target.classList.add('success');
                    } else {
                        target.classList.add('error');
                    }
                }

                break;

            case 'year':
                let year = target.value.replace(/\D/, '');
                target.value = year;

                this.data['year']['value'] = '';
                this.data['year']['isValid'] = false;
                target.classList.remove('error');
                target.classList.remove('success');

                if (year.length == 2) {
                    if (this.validYear(year)) {
                        this.data['year']['value'] = year;
                        this.data['year']['isValid'] = true;
                        target.classList.add('success');
                    } else {
                        target.classList.add('error');
                    }
                }

                break;

            case 'name':
                let name = target.value;
                target.value = name;

                this.data['name']['value'] = '';
                this.data['name']['isValid'] = false;
                target.classList.remove('error');
                target.classList.remove('success');

                if (this.validName(name)) {
                    this.data['name']['value'] = name;
                    this.data['name']['isValid'] = true;
                    target.classList.add('success');
                } else {
                    target.classList.add('error');
                }

                break;

            case 'cvv':
                let cvv = target.value.slice(0, 3).replace(/\D/, '');
                target.value = cvv;

                this.data['cvv']['value'] = '';
                this.data['cvv']['isValid'] = false;
                target.classList.remove('success');

                if (cvv.length == 3 && this.validCvv(cvv)) {
                    this.data['cvv']['value'] = cvv;
                    this.data['cvv']['isValid'] = true;
                    target.classList.add('success');
                }

                break;
        }

        this.validCard();
        this.setButtonState();
    }

    getNumber(number) {
        return `${number}`.replace(/\s|\D/g, '').slice(0, 16);
    }

    maskNumber(value) {
        let number = value.replace(/\D/, '');
        let output = [];
        for (let i = 0; i < number.length; i++) {
            if (i !== 0 && i % 4 === 0) {
                output.push(' ');
            }
            output.push(number[i]);
        }

        return output.join("");
    }

    validNumber(number) {
        return (`${number}`.length == 16) ? true : false;
    }

    validMonth(month) {
        return /^([0][1-9])|([1][0-2])$/.test(month.slice(0, 2))
    }

    validYear(year) {
        let yearNow = `${new Date().getFullYear()}`.slice(-2);
        let yearExpir = `${year}`.slice(-2);

        return (+yearExpir < +yearNow) ? false : true;
    }

    validName(name) {
        return /^[a-z\s.-]+$/i.test(name)
    }

    validCvv(cvv) {
        return /^\d{3}$/i.test(cvv)
    }

    validCard() {
        for (let key in this.data) {
            if (this.data[key]['isValid'] == false) {
                return false;
            }
        }

        return true;
    }

    setButtonState() {
        this.$button.disabled = (this.validCard()) ? false : true
    }

    get getData() {
        return this.data;
    }

}


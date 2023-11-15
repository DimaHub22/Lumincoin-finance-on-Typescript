import {CustomHttp} from "../services/custom-http";
import {Auth} from "../services/auth";
import config from "../config/config";
import {FormFieldType} from "../types/form-field.type";
import {DefaultResponseType} from "../types/default-response.type";
import {FormSignupType} from "../types/form-signup.type";
import {FormLoginType} from "../types/form-login.type";

export class Form {
    readonly page: 'login' | 'signup';
    private password: string | null ;
    private passwordRepeat: string | null ;
    readonly processElement: HTMLElement | null;
    private fields: FormFieldType[];
    private email: string

    constructor(page: 'login' | 'signup') {
        this.password = null;
        this.passwordRepeat = null;
        this.processElement = document.getElementById('btn-login')
        this.page = page;
        this.email = '';

        this.fields = [
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false
            },


        ];
        if (this.page === 'signup') {
            this.fields.unshift(
                {
                    name: 'fullName',
                    id: "fullName",
                    element: null,
                    regex: /^[А-ЯЁ][а-яё]* [А-ЯЁ][а-яё]* [А-ЯЁ][а-яё]*$/,
                    valid: false

                });
            this.fields.push({
                name: 'passwordRepeat',
                id: 'passwordRepeat',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false
            });

        }

        let that: Form = this
        this.fields.forEach((item: FormFieldType) => {
            item.element = document.getElementById(item.id) as HTMLInputElement

            if (item.element) {
                item.element.oninput = function () {
                    that.validateField.call(that, item, (this as HTMLInputElement));
                }
            }

        });
        if (this.processElement) {
            this.processElement.onclick = function () {
                that.processForm()
            }
        }

    }


    private validateField(field: FormFieldType, element: HTMLInputElement): void {

        if (!element.value || !element.value.match(field.regex)) {
            element.classList.add('is-invalid')
            field.valid = false

        } else {
            element.classList.remove('is-invalid')
            field.valid = true

        }

        if (this.page === 'signup') {
            let getPassword = this.fields.find(item => item.name === 'password');
            if (getPassword !== undefined && getPassword.element) {
                this.password = getPassword.element.value;
            }
            const getPasswordRepeat = this.fields.find(item => item.name === 'passwordRepeat');
            if (getPasswordRepeat !== undefined && getPasswordRepeat.element) {
                this.passwordRepeat = getPasswordRepeat.element.value;
            }
            this.validatePassword()
        }

        this.validateForm()

    }

   private validatePassword(): void {

        let passwordElement: HTMLElement | null = document.getElementById('password');
        let passwordRepeatElement: HTMLElement | null = document.getElementById('passwordRepeat');

        const getPasswordRepeat: FormFieldType | undefined = this.fields.find(item => item.name === 'passwordRepeat')
        // if (this.fields.find(item => item.name === 'passwordRepeat').element.value) {
        if (getPasswordRepeat !== undefined && getPasswordRepeat.element) {
            if (getPasswordRepeat.element.value) {
                if (this.password !== this.passwordRepeat) {

                    if (passwordElement) {
                        passwordElement.classList.add('is-invalid')
                    }
                    if (passwordRepeatElement) {
                        passwordRepeatElement.classList.add('is-invalid')
                    }

                    const password: HTMLElement | null = document.querySelector('.password')
                    if (password) {
                        password.innerHTML = 'Пароли не совпадают'
                    }

                    const passwordRepeat: HTMLElement | null = document.querySelector('.passwordRepeat')
                    if (passwordRepeat) {
                        passwordRepeat.innerHTML = 'Пароли не совпадают'
                    }


                } else {
                    if (passwordElement) {
                        passwordElement.classList.remove('is-invalid')
                    }
                    if (passwordRepeatElement) {
                        passwordRepeatElement.classList.remove('is-invalid')
                    }

                }
            }
        }

        // }

    }

    private validateForm(): boolean {

        const validForm: boolean = this.fields.every(item => item.valid)

        if (this.processElement) {
            if (validForm && this.password === this.passwordRepeat) {
                this.processElement.removeAttribute('disabled')
            } else {
                this.processElement.setAttribute('disabled', 'disabled')
            }
        }
        return validForm
    }


    private splitFullName(): string[] | undefined {
        if (this.page === 'signup') {
            let fullName: FormFieldType | undefined = this.fields.find(item => item.name === 'fullName');
            if (fullName !== undefined && fullName.element) {
                const name = fullName.element.value
                let newName = name.split(' ');
                return newName;
            }
        }
    }

    private async processForm(): Promise<void> {

        if (this.validateForm()) {
            this.splitFullName()

            const getEmail: FormFieldType | undefined = this.fields.find(item => item.name === 'email');

            if (getEmail !== undefined && getEmail.element) {

                const email = getEmail.element.value
                const getPassword: FormFieldType | undefined = this.fields.find(item => item.name === 'password');

                if (getPassword !== undefined && getPassword.element) {

                    const password = getPassword.element.value
                    const passwordRepeat = this.passwordRepeat

                    if (this.page === 'signup') {

                        const getName = this.splitFullName()

                        if (getName !== undefined) {

                            const name = getName[1];
                            const getLastName = this.splitFullName()

                            if (getLastName !== undefined) {
                                const lastName = getLastName[0]

                                try {
                                    const result: FormSignupType | DefaultResponseType = await CustomHttp.request(config.host + '/signup', 'POST', {
                                        name: name,
                                        lastName: lastName,
                                        email: email,
                                        password: password,
                                        passwordRepeat: passwordRepeat,
                                    })
                                    if (result) {
                                        if ((result as DefaultResponseType).error !== undefined || !(result as FormSignupType).user) {
                                            throw new Error((result as DefaultResponseType).message);
                                        }

                                    }
                                } catch (error) {
                                    return console.log(error)
                                }
                            }
                        }
                    }

                    try {

                        const result: FormLoginType | DefaultResponseType = await CustomHttp.request(config.host + '/login', 'POST', {
                            email: email,
                            password: password,
                            rememberMe: false,

                        })

                        if (result) {
                            if ((result as DefaultResponseType).error !== undefined || !(result as FormLoginType).tokens.accessToken || !(result as FormLoginType).tokens.refreshToken
                                || !(result as FormLoginType).user.lastName || !(result as FormLoginType).user.id) {
                                throw new Error((result as DefaultResponseType).message);
                            }

                            Auth.setTokens((result as FormLoginType).tokens.accessToken, (result as FormLoginType).tokens.refreshToken);
                            Auth.setUserInfo({
                                name: (result as FormLoginType).user.name ,
                                lastName: (result as FormLoginType).user.lastName,
                                userId: (result as FormLoginType).user.id,
                                email: email

                            })
                            location.href = '#/main'


                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        }
    }

}
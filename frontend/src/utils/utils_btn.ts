import {Auth} from "../services/auth";


export class Utils_btn {
    readonly page:  '#/main' | '#/income_and_expenses' | '#/income' | '#/expenses' | '#/create-income'
        | '#/create-expense' | '#/edit-income' | '#/edit-expense' | '#/edit-income-expense' | '#/create-income-option'
        | '#/create-expense-option';

    readonly btnMain: HTMLElement | null;
    readonly btnIncomeOutcome: HTMLElement | null;
    readonly btnCategory: HTMLElement | null;
    readonly ordersCollapse: HTMLElement | null;
    readonly btnIncome: HTMLElement | null;
    readonly btnExpenses: HTMLElement | null;
    readonly btnLogout: HTMLElement | null;

    constructor(page: '#/main' | '#/income_and_expenses' | '#/income' | '#/expenses' | '#/create-income'
    | '#/create-expense' | '#/edit-income' | '#/edit-expense' | '#/edit-income-expense' | '#/create-income-option'
    | '#/create-expense-option') {

        this.page = page;
        this.btnMain = document.getElementById('btnMain');
        this.btnIncomeOutcome = document.getElementById('income_outcome');
        this.btnCategory = document.getElementById('category');
        this.ordersCollapse = document.getElementById('orders-collapse');
        this.btnIncome = document.getElementById('income');
        this.btnExpenses = document.getElementById('expenses')
        this.btnLogout = document.getElementById('logout');


        this.processBtn()
        this.processLogout()

        if (this.btnMain) {
            this.btnMain.addEventListener('click', function () {
                window.location.href = '#/main'
                window.location.reload()
            })
        }
    }

    private processBtn(): void {
        if (this.btnCategory) {
            this.btnCategory.addEventListener('click', () => {
                if (this.btnCategory) {
                    this.btnCategory.classList.add('active');
                }
                if (this.btnMain) {
                    this.btnMain.classList.remove('active');
                }
                if (this.btnIncomeOutcome) {
                    this.btnIncomeOutcome.classList.remove('active');
                }
            })
        }


        if (this.page === '#/main') {
            if (this.btnMain) {
                this.btnMain.classList.add('active');
            }
            if (this.ordersCollapse) {
                this.ordersCollapse.classList.remove('show')
            }
            if (this.btnCategory) {
                this.btnCategory.classList.remove('active');
            }
            if (this.btnCategory) {
                this.btnCategory.setAttribute('aria-expanded', 'false')
            }

        } else {
            if (this.btnMain) {
                this.btnMain.classList.remove('active');
            }
        }
        if (this.page === '#/income_and_expenses') {
            if (this.btnIncomeOutcome) {
                this.btnIncomeOutcome.classList.add('active');
            }
            if (this.ordersCollapse) {
                this.ordersCollapse.classList.remove('show')
            }
            if (this.btnCategory) {
                this.btnCategory.classList.remove('active');
            }
            if (this.btnCategory) {
                this.btnCategory.setAttribute('aria-expanded', 'false')
            }

        } else {
            if (this.btnIncomeOutcome) {
                this.btnIncomeOutcome.classList.remove('active');
            }
        }
        if (this.page === '#/income' || this.page === '#/create-income') {
            if (this.btnIncome) {
                this.btnIncome.classList.add('active')
            }

            if (this.btnCategory) {
                this.btnCategory.classList.add('active');
            }
            if (this.btnCategory) {
                this.btnCategory.setAttribute('aria-expanded', 'true')
            }

            if (this.ordersCollapse) {
                this.ordersCollapse.classList.add('show')
            }
            if (this.btnIncome) {
                this.btnIncome.style.color = 'white'
            }
        } else {
            if (this.btnIncome) {
                this.btnIncome.classList.remove('active')
            }
        }
        if (this.page === '#/expenses' || this.page === '#/create-expense') {
            if (this.btnExpenses) {
                this.btnExpenses.classList.add('active')
            }
            if (this.btnCategory) {
                this.btnCategory.classList.add('active');
            }
            if (this.btnCategory) {
                this.btnCategory.setAttribute('aria-expanded', 'true')
            }
            if (this.ordersCollapse) {
                this.ordersCollapse.classList.add('show')
            }

        } else {
            if (this.btnExpenses) {
                this.btnExpenses.classList.remove('active')
            }
        }
    }

   private processLogout(): void {
        if (this.btnLogout) {
            this.btnLogout.onclick = function () {
                window.location.href = '#/'
                Auth.logout()
            }
        }
    }

}
import {CustomHttp} from "../services/custom-http";
import config from "../config/config";
import {DefaultResponseType} from "../types/default-response.type";

export class CreateIncome {

    readonly page: '#/create-expense' | '#/create-income';
    readonly titlePage: HTMLElement | null;
    readonly btnСancel: HTMLElement | null;
    private categoriesRequest: string | null;
    private location: string | null;

    constructor(page: '#/create-expense' | '#/create-income') {
        this.page = page
        this.titlePage = document.getElementById('title-page')
        this.btnСancel = document.getElementById('cancelIncome');
        this.categoriesRequest = null
        this.location = null


        if (this.page === '#/create-income') {
            this.categoriesRequest = '/categories/income';
            this.location = '#/income'
        } else {
            if (this.titlePage && this.btnСancel) {
                this.titlePage.innerText = 'Создание категории расходов'
                this.categoriesRequest = '/categories/expense';
                this.location = '#/expenses'
                this.btnСancel.setAttribute('href', '#/expenses')
            }
        }

        this.createIncome()

    }

    private async createIncome(): Promise<void> {
        const that: CreateIncome = this;
        const createIncome: HTMLElement | null = document.getElementById('createIncome');
        if (createIncome) {
            createIncome.addEventListener('click', async function () {
                let valueIncome = document.getElementById('new-create-income') as HTMLInputElement;
                if (valueIncome) {
                    if (valueIncome.value) {
                        try {
                            const result: Response | DefaultResponseType = await CustomHttp.request(config.host + that.categoriesRequest, 'POST', {
                                title: valueIncome.value,
                            })
                            if (result) {
                                if ((result as DefaultResponseType).error !== undefined) {
                                    throw new Error((result as DefaultResponseType).message);
                                }
                                location.href = that.location as string;
                            }

                        } catch (error) {
                            return console.log(error)
                        }
                    } else {
                        valueIncome.classList.add('is-invalid')
                    }
                }

            })
        }

    }

}

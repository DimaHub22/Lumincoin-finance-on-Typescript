import {CustomHttp} from "../services/custom-http";
import config from "../config/config";
import {DefaultResponseType} from "../types/default-response.type";
import {UpdateCategoryType} from "../types/update-category.type";

export class EditIncome {
    readonly page: '#/edit-income' | '#/edit-expense';
    readonly idIncome: string | null;
    readonly elem: HTMLInputElement | null;
    readonly titlePage: HTMLElement | null;
    readonly categoriesRequestPut: string
    private location: string

    constructor(page: '#/edit-income' | '#/edit-expense') {
        this.idIncome = localStorage.getItem('idIncome');
        this.elem = document.getElementById('edit-income') as HTMLInputElement;
        this.titlePage = document.getElementById('title-page');
        this.page = page

        if (this.page === '#/edit-income') {
            this.categoriesRequestPut = '/categories/income/'
            this.location = '#/income'
        } else {
            if (this.titlePage) {
                this.titlePage.innerText = "Редактирование категории расходов"
            }
            this.categoriesRequestPut = '/categories/expense/'
            this.location = '#/expenses'
        }

        this.getCategory();

    }

    private async getCategory(): Promise<void> {

        try {
            const result: DefaultResponseType | UpdateCategoryType = await CustomHttp.request(config.host + this.categoriesRequestPut + this.idIncome, 'GET')
            if (result) {
                if ((result as DefaultResponseType).error !== undefined) {
                    throw new Error((result as DefaultResponseType).message);
                }
                if (this.elem) {
                    this.elem.value = (result as UpdateCategoryType).title;
                    this.getValueIncome();
                }

            }
        } catch (error) {
            console.log(error)
        }

    }

    private getValueIncome(): void {
        const that: EditIncome = this;
        const saveIncome: HTMLElement | null = document.getElementById('saveIncome');

        if (saveIncome) {
            saveIncome.onclick = async function () {
                if (that.elem) {
                    if (that.elem.value) {

                        try {
                            const result: Response | DefaultResponseType = await CustomHttp.request(config.host + that.categoriesRequestPut + that.idIncome, 'PUT', {
                                title: that.elem.value,
                            })
                            if (result) {
                                if ((result as DefaultResponseType).error !== undefined) {
                                    throw new Error((result as DefaultResponseType).message);
                                }
                                location.href = that.location;
                            }

                        } catch (error) {
                            return console.log(error)
                        }
                    } else {
                        that.elem.classList.add('is-invalid')
                    }
                }

            }
        }

    }
}
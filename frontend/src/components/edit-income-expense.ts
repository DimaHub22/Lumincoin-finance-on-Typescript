import {CustomHttp} from "../services/custom-http";
import config from "../config/config";
import AirDatepicker from 'air-datepicker';
import {ResultDataType} from "../types/result-data.type";
import {DefaultResponseType} from "../types/default-response.type";
import {ParamsType} from "../types/params.type";
import {ResponseCategoriesType} from "../types/response-categories.type";

export class EditIncomeExpense {
    readonly page: '#/edit-income' | '#/edit-expense' | '#/edit-income-expense' | '#/create-income-option' | '#/create-expense-option';
    readonly idOptions: number;
    readonly optionType: HTMLInputElement | null;
    readonly optionsChoice: HTMLSelectElement | null;
    readonly createOptions: HTMLElement | null;
    readonly saveBtn: HTMLElement | null;

    readonly optionSum: HTMLInputElement | null;
    readonly optionDate: HTMLInputElement | null;
    readonly optionComment: HTMLInputElement | null;

    private valueSelect: ResultDataType | null;
    private method: string;
    private queryParam: string;

    private optionCategory: string | null;
    private choiceSelect: string | null;

    constructor(page: '#/edit-income' | '#/edit-expense' | '#/edit-income-expense' | '#/create-income-option' | '#/create-expense-option') {
        this.page = page;
        this.idOptions = Number(sessionStorage.getItem('idOptions'));
        this.optionType = document.getElementById('options') as HTMLInputElement;
        this.optionsChoice = document.getElementById('optionsChoice') as HTMLSelectElement;
        this.createOptions = document.getElementById('createOptions');
        this.saveBtn = document.getElementById('saveIncome');

        this.optionSum = document.getElementById('optionSum') as HTMLInputElement;
        this.optionDate = document.getElementById('optionDate') as HTMLInputElement;
        this.optionComment = document.getElementById('optionComment') as HTMLInputElement;

        this.valueSelect = null;
        this.method = 'PUT';
        this.queryParam = '/operations/' + this.idOptions;
        this.optionCategory = null
        this.choiceSelect = null

        if (this.page === '#/create-income-option' || this.page === '#/create-expense-option') {
            this.method = 'POST';
            this.queryParam = '/operations';
        }

        this.getCategoryOperation()
        this.getCalendar()

    }

    private async getCategoryOperation(): Promise<void> {
        if (this.page !== '#/create-income-option' && this.page !== '#/create-expense-option') {
            try {
                const result:DefaultResponseType | ResultDataType = await CustomHttp.request(config.host + '/operations/' + this.idOptions, 'GET')
                if (result) {
                    if ((result as DefaultResponseType).error !== undefined) {
                        throw new Error((result as DefaultResponseType).message);
                    }

                    this.valueSelect = result as ResultDataType;
                    this.optionCategory = (result as ResultDataType).type;
                    this.choiceSelect = (result as ResultDataType).category;

                    if (this.valueSelect) {
                        if (this.optionType) {
                            this.valueSelect.type === 'income' ? this.optionType.value = 'income' : this.optionType.value = 'expense';
                        }
                    }
                    if (this.optionSum) {
                        this.optionSum.value = (result as ResultDataType).amount + ' $';
                    }
                    if (this.optionDate) {
                        this.optionDate.value = (result as ResultDataType).date;
                    }
                    if (this.optionComment) {
                        this.optionComment.value = (result as ResultDataType).comment;
                    }


                    this.getCategoriesRequest(this.optionCategory)

                }
            } catch (error) {
                console.log(error)
            }

        } else {
            if (this.createOptions) {
                this.createOptions.innerHTML = 'Создание дохода/расхода';
            }
            if (this.saveBtn) {
                this.saveBtn.innerHTML = 'Создать'
            }

            if (this.page === '#/create-income-option') {
                if (this.optionType) {
                    this.optionType.value = 'income';
                    this.getCategoriesRequest(this.optionType.value);
                }

            } else {
                if (this.optionType) {
                    this.optionType.value = 'expense';
                }
                if (this.optionType) {
                    this.getCategoriesRequest(this.optionType.value);
                }

            }

        }
        this.getCategories()
    }

   private async getCategories(): Promise<void> {

        const that: EditIncomeExpense = this
        if (this.optionType) {
            this.optionType.onchange = function () {
                that.getCategoriesRequest((this as HTMLInputElement).value)
            }
        }

        if (this.saveBtn) {
            this.saveBtn.addEventListener('click', async function () {

                if(that.optionSum && that.optionComment){
                    !that.optionSum.value ? that.optionSum.classList.add('is-invalid') : that.optionSum.classList.remove('is-invalid');

                    !that.optionComment.value ? that.optionComment.classList.add('is-invalid') : that.optionComment.classList.remove('is-invalid');

                    if (that.optionComment.value && that.optionSum.value) {
                        that.updateOperation()
                    }
                }

            })
        }

    }

   private async updateOperation(): Promise<void> {
       const that: EditIncomeExpense = this

       if (that.optionSum && that.optionsChoice && that.optionType && that.optionDate && that.optionComment) {
           let amount: string[] = that.optionSum.value.split(' ')
           let idAttribute: number = Number(that.optionsChoice.options[that.optionsChoice.selectedIndex].dataset.id)

       try {

           const result: DefaultResponseType | ParamsType = await CustomHttp.request(config.host + that.queryParam, that.method, {
               type: that.optionType.value,
               amount: amount[0],
               date: that.optionDate.value,
               comment: that.optionComment.value,
               category_id: idAttribute

           })

           if (result) {
               if ((result as DefaultResponseType).error !== undefined) {
                   throw new Error((result as DefaultResponseType).message);
               }
               location.href = '#/income_and_expenses';
           }

       } catch (error) {
           return console.log(error)
       }
   }
    }

    private async getCategoriesRequest(value: string): Promise<void> {
        try {
            const result: DefaultResponseType | ResponseCategoriesType[] = await CustomHttp.request(config.host + '/categories/' + value, 'GET')
            if (result) {
                if ((result as DefaultResponseType).error !== undefined) {
                    throw new Error((result as DefaultResponseType).message);
                }

                if (this.optionsChoice) {
                    this.optionsChoice.innerHTML = ''
                }

                (result as ResponseCategoriesType[]).forEach(item => {
                    const categories: HTMLOptionElement | null = document.createElement('option')
                    if (item.title === this.choiceSelect) {
                        categories.setAttribute("selected", "selected")
                    }
                    categories.innerHTML = item.title
                    categories.setAttribute('data-id', item.id.toString())

                    if(this.optionsChoice){
                        this.optionsChoice.appendChild(categories)
                    }

                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    public getCalendar(): void {
        new AirDatepicker('#optionDate', {
            selectedDates: [new Date()],
            position: 'bottom left',
            buttons: ['clear'],
            dateFormat: "yyyy-MM-dd",
            autoClose: true,
        });
    }
}
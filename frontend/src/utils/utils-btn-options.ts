import {CustomHttp} from "../services/custom-http";
import config from "../config/config";
import {Income_and_expenses} from "../components/income_and_expenses";
import AirDatepicker from "air-datepicker";
import {Main} from "../components/main";
import {DataFormType} from "../types/data-form.type";
import {ResultDataType} from "../types/result-data.type";
import {ArtType} from "../types/art.type";
import {DefaultResponseType} from "../types/default-response.type";


export class UtilsBtnOptions {
    readonly btnTab: NodeListOf<HTMLElement> | null;
    readonly inputFrom: HTMLInputElement | null;
    readonly inputTo: HTMLInputElement | null;
    readonly page:  '#/main' | '#/income_and_expenses';

    constructor(page: '#/main' | '#/income_and_expenses') {
        this.btnTab = document.querySelectorAll('.tab');
        this.inputFrom = document.getElementById('inputFrom') as HTMLInputElement | null;
        this.inputTo = document.getElementById('inputTo') as HTMLInputElement | null;
        this.page = page

        this.getBtnOptions()

    }


    private getBtnOptions(): void {

        const that: UtilsBtnOptions = this
        if (this.btnTab) {
            this.btnTab.forEach(item => {

                if (item.innerHTML.trim() === 'Сегодня') {
                    that.getIncome_Expense.call('day', that)
                }

                item.onclick = function () {
                    that.getIncome_Expense.call(item.getAttribute('data-btn'), that)

                    if (that.btnTab) {
                        that.btnTab.forEach(item => {
                            return item.classList.remove('btn-secondary', 'text-white');
                        })
                    }

                    return item.classList.add('btn-secondary', 'text-white');
                }

            })
        }

    }

    private async getIncome_Expense(that: UtilsBtnOptions): Promise<void> {

        if ((this as unknown) !== 'interval') {
            if (that.inputFrom) {
                that.inputFrom.value = "";
            }
            if (that.inputTo) {
                that.inputTo.value = "";
            }


            try {
                const result: ResultDataType[] | DefaultResponseType = await CustomHttp.request(config.host + '/operations' + '?period=' + this, 'GET')

                if (result) {
                    if ((result as DefaultResponseType).error) {
                        throw new Error((result as DefaultResponseType).message);
                    }


                    if (that.page === '#/main') {
                        Main.chart((result as ResultDataType[]).sort((a:ResultDataType, b:ResultDataType) => a.id - b.id), (that as ArtType))
                    }


                    if (that.page === '#/income_and_expenses') {
                        Income_and_expenses.showIncome_Expense((result as ResultDataType[]).sort((a:ResultDataType, b:ResultDataType) => a.id - b.id))
                    }

                }
            } catch (error) {
                console.log(error)
            }
        } else {
            that.getCalendar()

        }

    }


    public getCalendar(): void {
        const that: UtilsBtnOptions = this
        if (this.inputFrom) {
            this.inputFrom.focus()
        }

        let days: DataFormType = {dateFrom: '',dateTo: ''}
        new AirDatepicker((this.inputFrom as HTMLInputElement), {
            visible: true,
            dateFormat: "yyyy-MM-dd",
            buttons: ['clear'],
            onSelect: function (fd) {
                if (that.inputTo) {
                    that.inputTo.focus();
                }

                days.dateFrom = fd.formattedDate
            }
        })


        new AirDatepicker((this.inputTo as HTMLInputElement), {
            autoClose: true,
            dateFormat: "yyyy-MM-dd",
            buttons: ['clear'],
            position: 'bottom right',
            onSelect: function (fd) {
                days.dateTo = fd.formattedDate
                that.datesResult(days)
            }
        })

    }

    private async datesResult(data: DataFormType): Promise<void> {
        try {
            const result: ResultDataType[] | DefaultResponseType = await CustomHttp.request(config.host + '/operations' + '?period=interval' + '&dateFrom=' + data.dateFrom + '&dateTo=' + data.dateTo, 'GET')
            if (result) {
                if ((result as DefaultResponseType).error !== undefined) {
                    throw new Error((result as DefaultResponseType).message);
                }
                if (this.page === '#/main') {
                    Main.intervalDate((result as ResultDataType[]))
                }

                if (this.page === '#/income_and_expenses') {
                    Income_and_expenses.showIncome_Expense((result as ResultDataType[]).sort((a:ResultDataType, b:ResultDataType) => a.id - b.id))
                }

            }
        } catch (error) {
            console.log(error)
        }
    }

}
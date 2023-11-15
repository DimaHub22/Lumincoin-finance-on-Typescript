import Chart from 'chart.js/auto';
import {ChartConfiguration} from "chart.js";
import {ConfigChartType} from "../types/config-chart.type";
import {ArtType} from "../types/art.type";
import {ResultDataType} from "../types/result-data.type";


export class Main {
    readonly tabs: HTMLElement | null;
    private chartExpense: Chart | null;
    private chartIncome: Chart | null;

    constructor() {
        this.tabs = document.querySelector('.tabs')
        this.chartExpense = null
        this.chartIncome = null

        if (this.tabs) {
            this.tabs.style.marginTop = '60px'
        }

    }


    static chart(result: ResultDataType[], art: ArtType) {
        if (art.btnTab) {
            art.btnTab.forEach(item => {
                if (item) {
                    if (item.innerHTML.trim() === 'Сегодня') {
                        this.prototype.getExpenses(result)
                    }
                }
            })

            this.prototype.getExpenses(result)
        }
    }

    static intervalDate(data: ResultDataType[]) {

        this.prototype.getExpenses(data)
    }

    getExpenses(result: ResultDataType[]) {

        const ctxExpense = document.getElementById('myChart-expenses') as HTMLCanvasElement;
        const ctxIncome = document.getElementById('myChart-income') as HTMLCanvasElement;

        let resExpense: number[] = [];
        let resExpenseCategory: string[] = [];
        let resIncome: number[] = [];
        let resIncomeCategory: string[] = [];


        let configExpense: ConfigChartType = {
            type: "pie",
            data: {
                labels: [],
                datasets: [{
                    label: '',
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderColor: 'white',
                    borderWidth: 1,
                    data: [],

                    fill: true
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Расходы',
                        font: {
                            family: 'Roboto,sans-serif',
                            size: 32,
                            weight: '500',

                        },
                        color: 'rgba(41, 6, 97, 1)',
                    }
                }

            }
        };
        let configIncome: ConfigChartType = {
            type: "pie",
            data: {
                labels: [],
                datasets: [{
                    label: '',
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderColor: 'white',
                    borderWidth: 1,
                    data: [],

                    fill: true
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Доходы',
                        font: {
                            family: 'Roboto,sans-serif',
                            size: 32,
                            weight: '500',
                        },
                        color: 'rgba(41, 6, 97, 1)',
                    }
                }

            }
        };

        if (result && result.length > 0) {
            result.forEach(item => {
                if (item.type === 'expense') {
                    resExpense.push(item.amount)
                    resExpenseCategory.push(item.category)
                } else {
                    resIncome.push(item.amount)
                    resIncomeCategory.push(item.category)
                }

                if (this.chartExpense && this.chartIncome) {

                    this.chartExpense.config.data.datasets.forEach(item => {
                        item.data = resExpense
                        item.label = "Расход"
                        if(this.chartExpense){
                            this.chartExpense.config.data.labels = resExpenseCategory
                            this.chartExpense.update();
                        }
                    })

                    this.chartIncome.config.data.datasets.forEach(item => {
                        item.data = resIncome
                        item.label = "Доход"
                        if(this.chartIncome){
                            this.chartIncome.config.data.labels = resIncomeCategory
                        }

                    })
                    this.chartExpense.update();
                    this.chartIncome.update();

                } else {
                    this.chartExpense = new Chart(ctxExpense, (configExpense as ChartConfiguration));
                    this.chartIncome = new Chart(ctxIncome, (configIncome as ChartConfiguration))
                }

            })
        } else {

            if (this.chartExpense && this.chartIncome) {
                this.chartExpense.clear();
                this.chartIncome.clear();
            }

        }

    }

}

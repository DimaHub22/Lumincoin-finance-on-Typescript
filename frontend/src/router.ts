import {Utils_btn} from "./utils/utils_btn";
import {Form} from "./components/form";
import {Sidebar} from "./components/sidebar";
import {Main} from "./components/main";
import {Income} from "./components/income";
import {CreateIncome} from "./components/create-income";
import {EditIncome} from "./components/edit-income";
import {Income_and_expenses} from "./components/income_and_expenses";
import {UtilsBtnOptions} from "./utils/utils-btn-options";
import {EditIncomeExpense} from "./components/edit-income-expense";
import {RouterItem, RouterMain, RouteType} from "./types/route.type";


export class Router {
    readonly containerElement: HTMLElement | null;
    readonly titleElement: HTMLElement | null;
    readonly styleElement: HTMLElement | null;

    private routes: (RouteType | RouterMain)[];


    constructor() {
        this.containerElement = document.getElementById('container');
        this.titleElement = document.getElementById('title');
        this.styleElement = document.getElementById('styles');


        this.routes = [
            {
                route: '#/',
                title: 'Вход',
                template: 'templates/login.html',
                styles: 'styles/login.css',
                load: () => {
                    new Form('login')
                }
            },
            {
                route: '#/signup',
                title: 'Создать аккаунт',
                template: 'templates/signup.html',
                styles: 'styles/login.css',
                load: () => {
                    new Form('signup')
                }
            },
            {
                route: '#/sidebar',
                title: 'Главная',
                template: 'templates/sidebar.html',
                styles: 'styles/sidebar.css',
                load: () => {
                    // new Utils_btn()
                    new Sidebar()
                }
            },
            {
                routesMain: [
                    {
                        route: '#/main',
                        title: 'Главная',
                        template: 'templates/main.html',
                        styles: 'styles/main.css',
                        load: () => {
                            new Main()
                            new UtilsBtnOptions('#/main')
                            new Utils_btn('#/main')
                        }
                    },
                    {
                        route: '#/income_and_expenses',
                        title: 'Доходы & Расходы',
                        template: 'templates/income_and_expenses.html',
                        styles: 'styles/income_and_expenses.css',
                        load: () => {
                            new Income_and_expenses()
                            new UtilsBtnOptions('#/income_and_expenses')
                            new Utils_btn('#/income_and_expenses')
                        }
                    },
                    {
                        route: '#/income',
                        title: 'Доходы',
                        template: 'templates/income.html',
                        styles: 'styles/income.css',
                        load: () => {
                            new Income('#/income')
                            new Utils_btn('#/income')
                        }
                    },
                    {
                        route: '#/expenses',
                        title: 'Расходы',
                        template: 'templates/expenses.html',
                        styles: 'styles/expenses.css',
                        load: () => {
                            new Income('#/expenses')
                            new Utils_btn('#/expenses')
                        }
                    },

                    {
                        route: '#/create-income',
                        title: 'Создание доходы',
                        template: 'templates/create-income.html',
                        styles: 'styles/create-income.css',
                        load: () => {
                            new CreateIncome('#/create-income')
                            new Utils_btn('#/create-income')
                        }
                    },
                    {
                        route: '#/create-expense',
                        title: 'Создание расходы',
                        template: 'templates/create-income.html',
                        styles: 'styles/create-income.css',
                        load: () => {
                            new CreateIncome('#/create-expense')
                            new Utils_btn('#/create-expense')
                        }
                    },
                    {
                        route: '#/edit-income',
                        title: 'Редактирование',
                        template: 'templates/edit-income.html',
                        styles: 'styles/edit-income.css',
                        load: () => {
                            new EditIncome('#/edit-income')
                            new Utils_btn('#/edit-income')
                        }
                    },
                    {
                        route: '#/edit-expense',
                        title: 'Редактирование',
                        template: 'templates/edit-income.html',
                        styles: 'styles/edit-income.css',
                        load: () => {
                            new EditIncome('#/edit-expense')
                            new Utils_btn('#/edit-expense')
                        }
                    },
                    {
                        route: '#/edit-income-expense',
                        title: 'Редактирование',
                        template: 'templates/edit-income-expense.html',
                        styles: 'styles/edit-income-expense.css',
                        load: () => {
                            new EditIncomeExpense('#/edit-income-expense')
                            new Utils_btn('#/edit-income-expense')
                        }
                    },
                    {
                        route: '#/create-income-option',
                        title: 'Создать доход',
                        template: 'templates/edit-income-expense.html',
                        styles: 'styles/edit-income-expense.css',
                        load: () => {
                            new EditIncomeExpense('#/create-income-option')
                            new Utils_btn('#/create-income-option')
                        }
                    },
                    {
                        route: '#/create-expense-option',
                        title: 'Создать доход',
                        template: 'templates/edit-income-expense.html',
                        styles: 'styles/edit-income-expense.css',
                        load: () => {
                            new EditIncomeExpense('#/create-expense-option')
                            new Utils_btn('#/create-expense-option')
                        }
                    },

                ]
            }

        ]
    }

    private getRouteMain(): RouterItem[] {

        let routes: RouterItem[] = []
        this.routes.forEach(item => {
            routes  = (item as RouterMain).routesMain
        })
        return routes
    };

    public async openRoute(): Promise<void> {

        const urlRoute: string = window.location.hash.split('?')[0];

        const newRoure: RouteType | RouterMain | undefined = this.routes.find(item => {
            return (item as RouteType).route === urlRoute;
        });

        const newRoureIndex: RouteType | RouterMain | undefined = this.routes.find(item => {
            return (item as RouteType).route === '#/sidebar';
        });

        const newRoureElem: RouteType | RouterMain | undefined = this.getRouteMain().find((item: RouteType | RouterMain) => {
            return (item as RouteType).route === urlRoute
        });

        if (urlRoute === '#/signup' || urlRoute === '#/') {

            if (!newRoure) {
                window.location.href = '#/';
                return;
            }
            if (this.containerElement) {
                this.containerElement.innerHTML = await fetch((newRoure as RouteType).template).then(response => response.text());
                if (this.styleElement && this.titleElement) {
                    this.styleElement.setAttribute('href', (newRoure as RouteType).styles);
                    this.titleElement.innerText = (newRoure as RouteType).title;

                }
            }

            (newRoure as RouteType).load()

        } else {

            if (!newRoureIndex || !newRoureElem) {
                window.location.href = '#/';
                return;
            }

            if (this.containerElement) {
                this.containerElement.innerHTML =
                    await fetch((newRoureIndex as RouteType).template).then(response => response.text());
                if (this.styleElement && this.titleElement) {
                    this.styleElement.setAttribute('href', (newRoureIndex as RouteType).styles);
                    this.titleElement.innerText = (newRoureIndex as RouteType).title;
                }
            }


            const content: HTMLElement | null = document.getElementById('content')
            if (content && this.styleElement && this.titleElement) {
                content.innerHTML =
                    await fetch(newRoureElem.template).then(response => response.text())
                this.styleElement.setAttribute('href', newRoureElem.styles);
                this.titleElement.innerText = newRoureElem.title;
            }


            (newRoureIndex as RouteType).load()
            newRoureElem.load()
        }

    }

}
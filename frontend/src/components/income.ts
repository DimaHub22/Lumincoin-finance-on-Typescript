import {CustomHttp} from "../services/custom-http";
import config from "../config/config";
import {CategoriesTyp} from "../types/categories.typ";
import {DefaultResponseType} from "../types/default-response.type";

export class Income {
    readonly page: '#/income' | '#/expenses';
    private categorys: CategoriesTyp[] | null;
    readonly btnDelete: NodeListOf<Element>;

    readonly categoriesRequest: string;
    readonly categoriesRequestDelete: string;
    readonly editLocation: string;
    readonly location: string;

    constructor(page: '#/income' | '#/expenses') {
        this.page = page
        this.categorys = null
        this.btnDelete = document.querySelectorAll('.btn-delete')


        if (this.page === '#/income') {
            this.categoriesRequest = '/categories/income';
            this.categoriesRequestDelete = '/categories/income/'
            this.editLocation = '#/edit-income'
            this.location = '#/income'
        } else {
            this.categoriesRequest = '/categories/expense';
            this.categoriesRequestDelete = '/categories/expense/'
            this.location = '#/expenses'
            this.editLocation = '#/edit-expense'
        }


        this.getCategories()
    }

    private async getCategories(): Promise<void> {

        try {
            const result: DefaultResponseType | CategoriesTyp[] = await CustomHttp.request(config.host + this.categoriesRequest, 'GET')
            if (result) {

                if ((result as DefaultResponseType).error !== undefined) {
                    throw new Error((result as DefaultResponseType).message);
                }

                this.categorys = result as CategoriesTyp[];

            }
        } catch (error) {
            console.log(error)
        }

        this.showCategory()

        const body: HTMLElement | null = document.querySelector('body')
        if (body) {
            body.removeAttribute('style')
        }

    }

    private showCategory(): void {

        // if (this.page === '#/income' || this.page === '#/expense') {

        const blockCarts: HTMLElement | null = document.getElementById('blockCarts')

        if (this.categorys) {
            this.categorys.forEach(item => {

                const cartItem: HTMLElement | null = document.createElement('div');
                cartItem.className = 'card cart-item cart-items';

                const cardBody: HTMLElement | null = document.createElement('div');
                cardBody.className = 'card-body rounded-3';

                const titleCategory: HTMLElement | null = document.createElement('div');
                titleCategory.className = 'title-category';
                titleCategory.innerText = item.title;

                const action: HTMLElement | null = document.createElement('div');
                action.className = 'action mt-3';
                action.setAttribute('data-id', item.id.toString())

                const actionEdit: HTMLElement | null = document.createElement('a');
                actionEdit.setAttribute('href', this.editLocation);
                actionEdit.setAttribute('role', 'button');
                actionEdit.className = 'me-2 btn btn-primary';
                actionEdit.innerText = 'Редактировать';
                actionEdit.onclick = function () {
                    localStorage.setItem('idIncome', item.id.toString())
                }

                const actionDelete: HTMLElement | null = document.createElement('a');
                actionDelete.setAttribute('role', 'button');
                actionDelete.setAttribute('data-bs-toggle', 'modal');
                actionDelete.setAttribute('data-bs-target', '#staticBackdrop');
                actionDelete.className = 'btn btn-danger';
                actionDelete.innerText = 'Удалить';

                if (blockCarts) {
                    blockCarts.prepend(cartItem);
                    cartItem.appendChild(cardBody);
                    cardBody.appendChild(titleCategory);
                    cardBody.appendChild(action);
                    action.appendChild(actionEdit);
                    action.appendChild(actionDelete);

                }

                this.deleteCategory(actionDelete)
            });
        }

        // }
    }

    private deleteCategory(data: HTMLElement | null): void {

        let that: Income = this

        if (data) {
            data.onclick = function () {

                if (data.parentElement) {
                    let idElement: number = Number(data.parentElement.getAttribute('data-id'));

                    that.btnDelete.forEach(item => {

                        (item as HTMLElement).onclick = async function () {
                            try {
                                const result: CategoriesTyp | DefaultResponseType = await CustomHttp.request(config.host + that.categoriesRequestDelete + idElement, 'DELETE');

                                if (result) {
                                    // if ((result as DefaultResponseType).error !== true) {
                                    //     throw new Error((result as DefaultResponseType).message);
                                    // }
                                    !(result as DefaultResponseType).error

                                    const body: HTMLElement | null = document.querySelector('body');

                                    if (body) {
                                        body.classList.remove('modal-open');
                                    }
                                    const modalBackdrop: HTMLElement | null = document.querySelector('.modal-backdrop');

                                    if (modalBackdrop) {
                                        modalBackdrop.remove()
                                    }
                                    window.location.href = that.location

                                }
                            } catch (error) {
                                console.log(error)
                            }

                        }
                    })
                }
            }
        }

    }

}
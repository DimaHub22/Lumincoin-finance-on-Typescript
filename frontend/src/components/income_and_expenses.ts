import {CustomHttp} from "../services/custom-http";
import config from "../config/config";
import AirDatepicker from "air-datepicker";
import {ResultDataType} from "../types/result-data.type";
import {DefaultResponseType} from "../types/default-response.type";

export class Income_and_expenses {
    btnDelete: NodeListOf<HTMLElement> | null;
    constructor() {
        this.btnDelete = document.querySelectorAll('.btn-delete')

        this.deleteOption()

    }

    static showIncome_Expense(data: ResultDataType[]) {
        const tbodyOperations: HTMLElement | null = document.getElementById('tbodyOperations');

        if (tbodyOperations) {
            tbodyOperations.innerHTML = ""
        }

        if (data && data.length > 0) {
            data.forEach((item: ResultDataType, index: number) => {

                const tr: HTMLElement | null = document.createElement('tr');
                tr.className = 'text-center';
                tr.setAttribute('data-bs-toggle', 'tooltip')
                tr.setAttribute('data-bs-placement', 'top')
                tr.setAttribute('title', item.comment)

                const th: HTMLElement | null = document.createElement('th')
                th.innerHTML = (index + 1).toString();
                th.className = 'd-none d-md-block'

                const tdType: HTMLElement | null = document.createElement('td');
                if (item.type === "income") {
                    tdType.innerHTML = 'доходы';
                    tdType.className = "text-success";
                } else {
                    tdType.innerHTML = 'расходы';
                    tdType.className = "text-danger";
                }

                const tdCategory: HTMLElement | null = document.createElement('td');
                if (item.category) {
                    tdCategory.innerHTML = item.category;
                }

                const tdAmount: HTMLElement | null = document.createElement('td');
                tdAmount.innerHTML = item.amount + ' $';

                const tdDate: HTMLElement | null = document.createElement('td')
                tdDate.innerHTML = item.date;

                const tdComment: HTMLElement | null = document.createElement('td');
                tdComment.innerHTML = item.comment;
                tdComment.className = 'd-none d-md-block';

                const tdIcon: HTMLElement | null = document.createElement('td');
                tdIcon.className = 'text-end';

                const linkDelete: HTMLElement | null = document.createElement('a');
                linkDelete.setAttribute('href', '#/income_and_expenses');
                linkDelete.className = 'text-decoration-none px-2';
                linkDelete.setAttribute('data-bs-toggle', 'modal');
                linkDelete.setAttribute('data-bs-target', '#staticBackdrop');
                linkDelete.onclick = function () {
                    sessionStorage.setItem('idOptionDelete', (item.id).toString())
                }

                const svgDelete: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svgDelete.setAttributeNS(null, "viewBox", "0 0 14 15 ");
                svgDelete.setAttributeNS(null, "width", '14');
                svgDelete.setAttributeNS(null, "height", '15');
                svgDelete.setAttributeNS(null, "fill", 'none');

                const pathDelete1: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                pathDelete1.setAttributeNS(null, 'd', 'M4.5 5.5C4.77614 5.5 5 5.72386 5 6V12C5 12.2761 4.77614 12.5 4.5 12.5C4.22386 12.5 4 12.2761 4 12V6C4 5.72386 4.22386 5.5 4.5 5.5Z');
                pathDelete1.setAttributeNS(null, 'fill', 'black');

                const pathDelete2: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                pathDelete2.setAttributeNS(null, 'd', 'M7 5.5C7.27614 5.5 7.5 5.72386 7.5 6V12C7.5 12.2761 7.27614 12.5 7 12.5C6.72386 12.5 6.5 12.2761 6.5 12V6C6.5 5.72386 6.72386 5.5 7 5.5Z');
                pathDelete2.setAttributeNS(null, 'fill', 'black');

                const pathDelete3: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                pathDelete3.setAttributeNS(null, 'd', 'M10 6C10 5.72386 9.77614 5.5 9.5 5.5C9.22386 5.5 9 5.72386 9 6V12C9 12.2761 9.22386 12.5 9.5 12.5C9.77614 12.5 10 12.2761 10 12V6Z');
                pathDelete3.setAttributeNS(null, 'fill', 'black');

                const pathDelete4: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                pathDelete4.setAttributeNS(null, 'd', 'M13.5 3C13.5 3.55228 13.0523 4 12.5 4H12V13C12 14.1046 11.1046 15 10 15H4C2.89543 15 2 14.1046 2 13V4H1.5C0.947715 4 0.5 3.55228 0.5 3V2C0.5 1.44772 0.947715 1 1.5 1H5C5 0.447715 5.44772 0 6 0H8C8.55229 0 9 0.447715 9 1H12.5C13.0523 1 13.5 1.44772 13.5 2V3ZM3.11803 4L3 4.05902V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V4.05902L10.882 4H3.11803ZM1.5 3V2H12.5V3H1.5Z');
                pathDelete4.setAttributeNS(null, 'fill', 'black');
                pathDelete4.setAttributeNS(null, 'fill-rule', 'evenodd');
                pathDelete4.setAttributeNS(null, 'clip-rule', 'evenodd');

                const linkEdit: HTMLElement | null = document.createElement('a');
                linkEdit.setAttribute('href', '#/edit-income-expense');
                linkEdit.className = 'text-decoration-none';
                linkEdit.onclick = function () {
                    sessionStorage.setItem('idOptions', (item.id).toString())
                }

                const svgEdit: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svgEdit.setAttributeNS(null, "viewBox", "0 0 16 16");
                svgEdit.setAttributeNS(null, "width", '16');
                svgEdit.setAttributeNS(null, "height", '16');
                svgEdit.setAttributeNS(null, "fill", 'none');

                const pathEdit: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                pathEdit.setAttributeNS(null, 'd', 'M12.1465 0.146447C12.3417 -0.0488155 12.6583 -0.0488155 12.8536 0.146447L15.8536 3.14645C16.0488 3.34171 \n' +
                    ' 16.0488 3.65829 15.8536 3.85355L5.85357 13.8536C5.80569 13.9014 5.74858 13.9391 5.68571 13.9642L0.68571 15.9642C0.500001 \n' +
                    ' 16.0385 0.287892 15.995 0.146461 15.8536C0.00502989 15.7121 -0.0385071 15.5 0.0357762 15.3143L2.03578 10.3143C2.06092 \n' +
                    ' 10.2514 2.09858 10.1943 2.14646 10.1464L12.1465 0.146447ZM11.2071 2.5L13.5 4.79289L14.7929 3.5L12.5 1.20711L11.2071\n' +
                    ' 2.5ZM12.7929 5.5L10.5 3.20711L4.00001 9.70711V10H4.50001C4.77616 10 5.00001 10.2239 5.00001 10.5V11H5.50001C5.77616 \n' +
                    ' 11 6.00001 11.2239 6.00001 11.5V12H6.29291L12.7929 5.5ZM3.03167 10.6755L2.92614 10.781L1.39754 14.6025L5.21903\n' +
                    ' 13.0739L5.32456 12.9683C5.13496 12.8973 5.00001 12.7144 5.00001 12.5V12H4.50001C4.22387 12 4.00001 11.7761\n' +
                    ' 4.00001 11.5V11H3.50001C3.28561 11 3.10272 10.865 3.03167 10.6755Z');
                pathEdit.setAttributeNS(null, 'fill', 'black');

                if (tbodyOperations) {
                    tbodyOperations.appendChild(tr);
                }

                tr.appendChild(th);
                tr.appendChild(tdType);
                tr.appendChild(tdCategory);
                tr.appendChild(tdAmount);
                tr.appendChild(tdDate);
                tr.appendChild(tdComment);
                tr.appendChild(tdIcon);
                tdIcon.appendChild(linkDelete);
                tdIcon.appendChild(linkEdit);
                linkDelete.prepend(svgDelete);
                linkEdit.appendChild(svgEdit);

                svgDelete.appendChild(pathDelete1);
                svgDelete.appendChild(pathDelete2);
                svgDelete.appendChild(pathDelete3);
                svgDelete.appendChild(pathDelete4);

                svgEdit.appendChild(pathEdit);

            })
        }
    }

    public getCalendar(): void {

        new AirDatepicker('#optionDate', {
            selectedDates: [new Date()],
            position: 'bottom left',
            buttons: ['clear'],
            dateFormat: "yyyy-MM-dd",

        });

    }

    private deleteOption(): void {

        const body: HTMLElement | null = document.querySelector('body')

        if (body) {
            body.removeAttribute('style')
        }

        if (this.btnDelete) {
            this.btnDelete.forEach(item => {
                item.addEventListener('click', async function () {
                    let idOptionDelete: string | null = sessionStorage.getItem('idOptionDelete')

                    try {
                        const result: Response | DefaultResponseType = await CustomHttp.request(config.host + '/operations/' + idOptionDelete, 'DELETE')
                        if (result) {

                            !(result as DefaultResponseType).error

                            const body: HTMLElement | null = document.querySelector('body')
                            if (body) {
                                body.classList.remove('modal-open')
                            }

                            const modalBackdrop: HTMLElement | null = document.querySelector('.modal-backdrop');
                            if (modalBackdrop) {
                                modalBackdrop.remove()
                            }

                            window.location.href = '#/income_and_expenses'
                            // window.location.reload()

                        }
                    } catch (error) {
                        console.log(error)

                    }
                })
            })
        }

    }
}

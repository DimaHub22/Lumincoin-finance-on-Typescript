import {Auth} from "../services/auth";
import {CustomHttp} from "../services/custom-http";
import config from "../config/config";
import {BalanceType} from "../types/balance.type";
import {DefaultResponseType} from "../types/default-response.type";
import {UserInfoType} from "../types/user-info.type";

export class Sidebar {
    readonly balansElem: HTMLElement | null;
    readonly logo: HTMLElement | null;

    constructor() {
        this.balansElem = document.getElementById('balance') as HTMLElement |null
        this.logo = document.getElementById('logo')
        this.setName()
        this.getBalance()

        if (this.logo) {
            this.logo.addEventListener('click', function () {
                window.location.href = '#/main'
                window.location.reload()
            })
        }

    }

    private setName(): void {
        const userName: HTMLElement | null = document.getElementById('user-name');
        const userInfo: UserInfoType | null= Auth.getUserInfo()
        if(userName && userInfo){
            userName.innerHTML = userInfo.name + " " + userInfo.lastName;
        }
    }

   private async getBalance(): Promise<void> {
        try {
            const result:DefaultResponseType | BalanceType = await CustomHttp.request(config.host + '/balance', 'GET')
            if (result) {
                if ((result as DefaultResponseType).error !== undefined) {
                    throw new Error((result as DefaultResponseType).message);
                }
                const balance: HTMLElement | null = document.getElementById('balance');
                if(balance){
                    balance.innerHTML = (result as BalanceType).balance.toString();
                    // localStorage.setItem('balance',result.balance)
                }

            }
        } catch (error) {
            console.log(error)
        }
    }
}
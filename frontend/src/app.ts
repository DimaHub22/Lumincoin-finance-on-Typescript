import {Router} from "./router";
import 'air-datepicker/air-datepicker.css';
import * as bootstrap from 'bootstrap'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/offcanvas'
import 'bootstrap/dist/css/bootstrap.css';
import '../dist/styles/common.css';
import '../dist/styles/sidebar.css';
import '../dist/styles/login.css';
import '../dist/styles/main.css';



class App {

    private roter: Router;
    constructor() {
        this.roter = new Router()
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));
        window.addEventListener('popstate', this.handleRouteChanging.bind(this));
    }

   private handleRouteChanging(): void {
        this.roter.openRoute()

    }
}

(new App())
import { SignInDialog } from './../signIn/signIn.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';

import { AppService } from './app.service';

import { getValueFromCookie, deleteCookie } from '../common/cookieWorker';

@Component({
    selector: 'app',
    templateUrl: './app.html',
})
export class AppComponent implements OnInit {

    login = false;
    username: string;

    constructor(public signInDialog: MatDialog,
                public appService: AppService) {}

    ngOnInit() {
        this.updatePage();
    }

    openSignInDialog(): void {
        let dialog = this.signInDialog.open(SignInDialog, {
            width: '600px'
        });
        dialog.afterClosed().subscribe(result => {
            this.updatePage();
            location.reload();
        });
    }

    logOut(): void {
        this.appService.logOut();
        deleteCookie('username');
        this.updatePage();
    }

    updatePage(): void {
        let cookie = document.cookie;
        let value = getValueFromCookie(cookie, 'username');
        if (value !== '') {
            this.login = true;
            this.username = value;
        } else {
            this.login = false;
        }
    }
}


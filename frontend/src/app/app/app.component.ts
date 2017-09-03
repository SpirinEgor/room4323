import { LoginDialog } from './../login/login.component';
import { SignupDialog } from '../signup/signup.component';
import { Component } from '@angular/core';
import { MdDialog} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: './app.html',
})
export class AppComponent {

    constructor(public loginDialog: MdDialog, public signupDialog : MdDialog) {}

    openLoginDialog(): void {
        this.loginDialog.open(LoginDialog, {
            width: '600px'
        });
    }

    openSignupDialog(): void {
        this.signupDialog.open(SignupDialog, {
            width: '600px'
        });
    }
}


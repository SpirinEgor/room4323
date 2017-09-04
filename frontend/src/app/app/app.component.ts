import { SigninDialog } from './../signin/signin.component';
import { SignupDialog } from '../signup/signup.component';
import { Component } from '@angular/core';
import { MdDialog} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: './app.html',
})
export class AppComponent {

    constructor(public signinDialog: MdDialog) {}

    openSigninDialog(): void {
        this.signinDialog.open(SigninDialog, {
            width: '600px'
        });
    }
}


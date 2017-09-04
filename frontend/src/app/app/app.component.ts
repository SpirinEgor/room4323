import { SignInDialog } from './../signIn/signIn.component';
import { Component } from '@angular/core';
import { MdDialog} from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: './app.html',
})
export class AppComponent {

    constructor(public signInDialog: MdDialog) {}

    openSignInDialog(): void {
        this.signInDialog.open(SignInDialog, {
            width: '600px'
        });
    }
}


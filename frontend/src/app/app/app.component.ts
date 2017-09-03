import { LoginDialog } from './../login/login.component';
import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app',
    templateUrl: './app.html',
})
export class AppComponent {

    constructor(public dialog: MdDialog) {}

    openDialog(): void {
        let dialogRef = this.dialog.open(LoginDialog, {
            width: '600px'
        });
    }
}


import {Component, Inject} from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'login-dialog',
    templateUrl: './login.html',
})
export class LoginDialog {

    constructor(
        public dialogRef: MdDialogRef<LoginDialog>,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}

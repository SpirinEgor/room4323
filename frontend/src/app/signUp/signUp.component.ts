import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'signUp-dialog',
    templateUrl: './signUp.html',
})
export class SignUpDialog {
    // private firstName: string;
    // private secondName: string;
    // private email: string;
    // private password: string;
    // private repeatedPassword: string;

    constructor(
        private signUpDialogRef: MdDialogRef<SignUpDialog>,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.signUpDialogRef.close();
    }

}

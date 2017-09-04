import {Component, Inject} from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'signup-dialog',
    templateUrl: './signup.html',
})
export class SignupDialog {
    // private firstName: string;
    // private secondName: string;
    // private email: string;
    // private password: string;
    // private repeatedPassword: string;

    constructor(
        private signupDialogRef: MdDialogRef<SignupDialog>,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.signupDialogRef.close();
    }

}

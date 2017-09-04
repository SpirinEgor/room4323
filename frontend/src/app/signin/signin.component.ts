import { Component, Inject } from '@angular/core';
import { MdDialogRef, MdDialog,  MD_DIALOG_DATA } from '@angular/material';
import { SignupDialog } from '../signup/signup.component';

@Component({
    selector: 'signin-dialog',
    templateUrl: './signin.html',
})
export class SigninDialog {
    // private email: string;
    // private password: string;

    constructor(
        private signinDialogRef: MdDialogRef<SigninDialog>,
        private signupDialog: MdDialog,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.signinDialogRef.close();
    }

    onSignupClick(): void {
        this.signinDialogRef.close();
        this.signupDialog.open(SignupDialog, {
            width: '600px'
        });
    }
}

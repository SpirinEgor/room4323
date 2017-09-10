import { Component, Inject } from '@angular/core';
import { MdDialogRef, MdDialog, MD_DIALOG_DATA } from '@angular/material';
import { SignUpDialog } from '../signUp/signUp.component'
import { SignInService } from './signIn.service';

import * as Response from '../common/response';

@Component({
    selector: 'signIn-dialog',
    templateUrl: './signIn.html',
})
export class SignInDialog {
    private email: string;
    private password: string;

    constructor(
        private signInDialogRef: MdDialogRef<SignInDialog>,
        private signUpDialog: MdDialog,
        private signInService: SignInService,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.signInDialogRef.close();
    }

    onSignUpClick(): void {
        this.signInDialogRef.close();
        this.signUpDialog.open(SignUpDialog, {
            width: '600px'
        });
    }

    onSignInClick(): void {
        const result: Response.Body = this.signInService.login(this.email, this.password);
        if (result.status === Response.successful) {
            this.onNoClick();
        } else {
            if (result.errors.length === 0) {
                this.onNoClick();
            } else {
                for (let error of result.errors) {
                    const field = document.getElementById(error.field);
                    field.classList.add('is-invalid');
                    const errorField = document.getElementById(error.field + '-error');
                    errorField.innerHTML = error.error;
                }
            }
        }
    }

}

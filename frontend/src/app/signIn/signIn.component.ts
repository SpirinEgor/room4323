import { Component, Inject } from '@angular/core';
import { MdDialogRef, MdDialog, MD_DIALOG_DATA } from '@angular/material';
import { SignUpDialog } from '../signUp/signUp.component'
import { SignInService } from './signIn.service';
import { FormControl, Validators } from '@angular/forms';

import * as Response from '../common/response';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'signIn-dialog',
    templateUrl: './signIn.html',
})
export class SignInDialog {
    private email: string;
    private password: string;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]);

    passwordFormControl = new FormControl('', [
        Validators.required]);

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
        if (document.getElementById('error') == null) {
            const result: Response.Body = this.signInService.signIn(this.email, this.password);
            console.log(result.status)
            this.onNoClick();
        }
    }

}

import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { SignUpService} from './signUp.service';
import { FormControl, Validators } from '@angular/forms';

import * as Response from '../common/response';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'signUp-dialog',
    templateUrl: './signUp.html',
})
export class SignUpDialog {
    private firstName: string;
    private secondName: string;
    private email: string;
    private password: string;
    private repeatedPassword: string;
    private username: string;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]);

    passwordFormControl = new FormControl('', [
        Validators.required]);

    repeatedPasswordFormControl = new FormControl('', [
        Validators.required);

    firstNameFormControl = new FormControl('', [
        Validators.required]);

    secondNameFormControl = new FormControl('', [
        Validators.required]);

    usernameFormControl = new FormControl('', [
        Validators.required]);

    constructor(
        private signUpService: SignUpService,
        private signUpDialogRef: MdDialogRef<SignUpDialog>,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.signUpDialogRef.close();
    }

    onSignUpClick(): void {
        if (document.getElementById('error') == null) {
            const result: Response.Body = this.signUpService.signUp(this.firstName, this.secondName, this.username,
                                                             this.email, this.password, this.repeatedPassword);
            console.log(result.status);
            this.onNoClick();
        }
    }

}

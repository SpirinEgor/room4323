import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { SignUpService} from './signUp.service';
import { FormControl, Validators } from '@angular/forms';

import * as Response from '../common/response';
import { showErrorToast } from '../common/toast';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASSWORD_REGEX = /^(?=.*\d).{6,15}$/

@Component({
    selector: 'signUp-dialog',
    templateUrl: './signUp.html',
})
export class SignUpDialog {
    private firstName: string;
    private secondName: string;
    private email: string;
    private password = '';
    private repeatedPassword: string;
    private username: string;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]);

    passwordFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(PASSWORD_REGEX)]);

    repeatedPasswordFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(this.getPass())]);

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

    getPass(): string {
        let pass_node = document.getElementById('password');
        if (pass_node ===  null) {
            return '';
        } else {
            return pass_node.nodeValue;
        }
    }

    onSignUpClick(): void {
        let err_list = document.getElementsByTagName('error');
        let no_errors = true;
        for (let i = 0; i < err_list.length; i++) {
            if (err_list[i].innerHTML !== '') {
                no_errors = false
            }
        }

        if (no_errors) {
            const result: Response.Body = this.signUpService.signUp(this.firstName, this.secondName, this.username,
                this.email, this.password, this.repeatedPassword);
            if (result.status === Response.successful) {
                showErrorToast('incorrect field');
            } else {
                this.onNoClick();
            }
        }
    }

    clearMdHints() { // same KOSTYL repair it smn
        document.getElementById('repeatedPasswordError').innerHTML = '';
        document.getElementById('passwordError').innerHTML = '';
    }

}

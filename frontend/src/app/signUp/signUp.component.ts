import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { SignUpService} from './signUp.service';

import * as Response from '../common/response';

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

    constructor(
        private signUpService: SignUpService,
        private signUpDialogRef: MdDialogRef<SignUpDialog>,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.signUpDialogRef.close();
    }

    onSignUpClick(): void {
        const result: Response.Body = this.signUpService.signUp(this.firstName, this.secondName,
                                                            this.email, this.password, this.repeatedPassword);
        if (result.status === Response.successful) {
            this.onNoClick();
        } else {
            for (let error of result.errors) {
                const field = document.getElementById(error.field);
                field.classList.add('is-invalid');
                const errorField = document.getElementById(error.field + '-error');
                if (errorField !== undefined) {
                    errorField.innerHTML = error.error;
                }
            }
        }
    }

}

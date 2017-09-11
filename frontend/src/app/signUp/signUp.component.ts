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

    private fields: HTMLElement[] = [];

    constructor(
        private signUpService: SignUpService,
        private signUpDialogRef: MdDialogRef<SignUpDialog>,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.signUpDialogRef.close();
    }

    onSignUpClick(): void {
        this.fields.push(document.getElementById('email'));
        this.fields.push(document.getElementById('password'));
        this.fields.push(document.getElementById('repeatedPassword'));
        this.fields.push(document.getElementById('email-error'));
        this.fields.push(document.getElementById('password-error'));
        for ( let field of this.fields){
            if (field.classList.contains('is-invalid')) {
                field.classList.remove('is-invalid');
            }
            if (field.id.endsWith('-error')) {
                field.innerHTML = '';
            }
        }
        const result: Response.Body = this.signUpService.signUp(this.firstName, this.secondName,
                                                            this.email, this.password, this.repeatedPassword);
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
                    if (errorField !== undefined) {
                        errorField.innerHTML = error.error;
                    }
                }
            }
        }
    }

}

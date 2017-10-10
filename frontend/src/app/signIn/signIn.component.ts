import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { SignUpDialog } from '../signUp/signUp.component'
import { SignInService } from './signIn.service';
import { FormControl, Validators } from '@angular/forms';

import * as Response from '../common/response';
import { showErrorToast } from '../common/toast';


@Component({
    selector: 'signIn-dialog',
    templateUrl: './signIn.html',
})
export class SignInDialog {
    private username: string;
    private password: string;

    usernameFormControl = new FormControl('', [
        Validators.required]);

    passwordFormControl = new FormControl('', [
        Validators.required]);

    constructor(
        private signInDialogRef: MatDialogRef<SignInDialog>,
        private signUpDialog: MatDialog,
        private signInService: SignInService,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

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
            const result: Response.Body = this.signInService.signIn(this.username, this.password);
            if (result.status === Response.successful) {
                showErrorToast('incorrect field');
            } else {
                alert(document.cookie);
                this.onNoClick();
            }
        }
    }

}

import {Component, Inject} from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'signup-dialog',
    templateUrl: './signup.html',
})
export class SignupDialog {

    constructor(
        public dialogRef: MdDialogRef<SignupDialog>,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
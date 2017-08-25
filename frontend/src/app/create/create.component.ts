import { Component } from '@angular/core';

@Component({
    selector: 'create',
    templateUrl: `./create.html`,
})
export class CreateComponent {

    algorithm = '';
    rowCount = 20;

    constructor() { }

    update(value: string) {
        this.algorithm = value;
        this.rowCount = this.max(20, this.getRowCount(this.algorithm));
    }

    max(a: number, b: number) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }

    getRowCount(value: string) {
        let rowCount = 0;
        for (let char of value) {
            if (char === '\n') {
                ++rowCount;
            }
        }
        return rowCount + 1;
    }

}

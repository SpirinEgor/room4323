import { Component } from '@angular/core';
import { CreateAlgorithmService } from './create.service';

@Component({
    selector: 'create',
    templateUrl: `./create.html`,
})
export class CreateComponent {

    algorithm = '';
    rowCount = 20;

    constructor(private createAlgorithmService: CreateAlgorithmService) { }

    update(value: string) {
        let createdAlgorithm = document.getElementsByClassName('created-algorithm')[0];
        createdAlgorithm.innerHTML = value;
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, createdAlgorithm]);
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

    createAlgorithm(): void {
        this.createAlgorithmService.createAlgorithm(this.algorithm);
    }

}

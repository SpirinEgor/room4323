import { Component, OnInit } from '@angular/core';
import { OfferAlgorithmService } from './offer.service';

import { showInfoToast } from '../common/toast';

@Component({
    selector: 'offer',
    templateUrl: `./offer.html`,
})
export class OfferComponent implements OnInit {

    algorithm = '';
    rowCount = 5;
    categories: string[] = [''];
    title = '';
    category = '';

    constructor(private offerAlgorithmService: OfferAlgorithmService) { }

    ngOnInit() {
        this.getAllCategories();
    }

    getAllCategories() {
        this.offerAlgorithmService.getCategories().then(
            allCategories => {
                const categories = allCategories.allCategories;
                for (let key of categories) {
                    this.categories.push(key);
                }
            }
        )
    }

    update(value: string) {
        let offeredAlgorithm = document.getElementsByClassName('offered-algorithm')[0];
        offeredAlgorithm.innerHTML = value;
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, offeredAlgorithm]);
        this.algorithm = value
        this.rowCount = this.max(5, this.getRowCount(this.algorithm));
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

    offerAlgorithm(): void {
        if (this.title === '') {
            showInfoToast('Please, write title for your algorithm.');
        } else if (this.category === '') {
            showInfoToast('Please, choose or write category for your algorithm.');
        } else if (this.algorithm === '') {
            showInfoToast('You forget to write algorithm.');
        } else {
            this.offerAlgorithmService.offerAlgorithm(this.algorithm, this.title, this.category);
        }
    }

}

import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { SingleAlgorithmService}    from './singleAlgorithm.service';

import { SingleAlgorithm } from './singleAlgorithm';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'single-algorithm',
    templateUrl: './singleAlgorithm.html',
    providers: [SingleAlgorithmComponent],
})
export class SingleAlgorithmComponent implements OnInit {
    private algorithm: SingleAlgorithm;

    constructor(
        private service: SingleAlgorithmService,
        private route: ActivatedRoute,
        private location: Location
      ) {}


    ngOnInit(): void {
        this.route.paramMap
        .switchMap((params: ParamMap) => this.service.getAlgorithm(params.get('slug')))
        .subscribe(algorithm => {
            const singleAlgorithmJSON = algorithm;
            for (let key of Object.keys(singleAlgorithmJSON)){
                this.algorithm[key] = singleAlgorithmJSON[key];
            }

            let createdAlgorithm = document.getElementsByClassName('created-algorithm')[0];
            createdAlgorithm.innerHTML = this.algorithm.algorithm;
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, createdAlgorithm]);
        });
    }

}

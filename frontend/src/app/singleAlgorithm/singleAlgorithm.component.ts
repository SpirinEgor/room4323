import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { SingleAlgorithmService}    from './singleAlgorithm.service';

import { SingleAlgorithm } from './singleAlgorithm';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'single-algorithm',
    templateUrl: './singleAlgorithm.html',
    providers: [SingleAlgorithmComponent],
})
export class SingleAlgorithmComponent implements OnInit {
    private algorithm = new SingleAlgorithm();

    constructor(
        private service: SingleAlgorithmService,
        private route: ActivatedRoute
      ) {}

    ngOnInit(): void {
        this.route.paramMap
        .switchMap((params: ParamMap) => this.service.getAlgorithm(params.get('slug')))
        .subscribe(algorithm => {
            const singleAlgorithmJSON = algorithm;
            for (let key of Object.keys(singleAlgorithmJSON)){
                this.algorithm[key] = singleAlgorithmJSON[key];
            }

            let algorithmField = document.getElementsByClassName('algorithm')[0];
            algorithmField.innerHTML = this.algorithm.algorithm;
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, algorithmField]);
        });
    }

}

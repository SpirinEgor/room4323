import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { SingleAlgorithmService}    from './singleAlgorithm.service';

import { SingleAlgorithm } from './singleAlgorithm';

@Component({
    selector: 'single-algorithm',
    templateUrl: './singleAlgorithm.html',
    providers: [SingleAlgorithmComponent],
})
export class SingleAlgorithmComponent implements OnInit {
    private algorithm: SingleAlgorithm = new SingleAlgorithm();

    constructor(
        private algoService: SingleAlgorithmService,
        private route: ActivatedRoute,
        private location: Location
      ) {}


    ngOnInit(): void {
        this.route.paramMap
        .switchMap((params: ParamMap) => this.algoService.getAlgorithm(params.get('id')))
        .subscribe(algorithm => {
            const singleAlgorithmJSON = algorithm;
            for (let key of Object.keys(singleAlgorithmJSON)){
                this.algorithm[key] = singleAlgorithmJSON[key];
            }
        });
    }

    goBack(): void {
        this.location.back();
    }

}

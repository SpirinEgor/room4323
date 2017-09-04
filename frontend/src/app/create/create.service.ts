import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CreateAlgorithmService {

    constructor(private $http: Http) { }

    createAlgorithm(newAlgorithm: string) {
        const body = {
            'algorithm': newAlgorithm
        };
        this.$http.post('/api/createAlgorithm', body).subscribe();
    }

}

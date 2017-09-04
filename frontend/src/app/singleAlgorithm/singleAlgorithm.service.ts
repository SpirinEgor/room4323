import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SingleAlgorithmService {

    constructor(private $http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getAlgorithm(slug: string) {
        return this.$http.get(`http://localhost:8000/temporary_data/evklid.json`)
                        .toPromise()
                        .then(response => response.json())
                        .catch(this.handleError);
    }

}

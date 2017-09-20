import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AllAlgorithmsService {

    constructor(private $http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getAllAlgorithms() {
        return this.$http.get('./temporary_data/allAlgorithms.json')
                        .toPromise()
                        .then(response => response.json())
                        .catch(this.handleError);
    }

}

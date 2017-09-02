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
        slug = 'evklid';
        return this.$http.get(`http://localhost:3000/temporary_data/${slug}.json`)
                        .toPromise()
                        .then(response => response.json())
                        .catch(this.handleError);
    }

}

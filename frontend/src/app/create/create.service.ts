import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Toast from '../common/toast';
import { successful } from '../common/response';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CreateAlgorithmService {

    constructor(private $http: Http) { }

    private handleError(error: any) {
        Toast.showErrorToast(Toast.serverNotRespone);
    }

    getCategories() {
        return this.$http.get('http://localhost:8000/api/article/categories/all')
                    .toPromise()
                    .then(response => {
                        if (response.json().status !== successful) {
                            Toast.showErrorToast(Toast.serverNotRespone);
                        } else {
                            return response.json().allCategories;
                        }
                    })
                    .catch(this.handleError);
    }

    createAlgorithm(newAlgorithm: string) {
        const body = {
            'algorithm': newAlgorithm
        };
        this.$http.post('/api/createAlgorithm', body).subscribe();
    }

}

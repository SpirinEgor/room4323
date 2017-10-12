import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as Toast from '../common/toast';
import * as Response from '../common/response';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OfferAlgorithmService {

    constructor(private $http: Http) { }

    private handleError(error: any) {
        Toast.showErrorToast(Toast.serverNotRespone);
    }

    getCategories() {
        return this.$http.get('http://localhost:8000/api/article/categories/all')
                    .toPromise()
                    .then(response => {
                        if (response.json().status !== Response.successful) {
                            Toast.showErrorToast(Toast.serverNotRespone);
                        } else {
                            return response.json().result;
                        }
                    })
                    .catch(this.handleError);
    }

    offerAlgorithm(newAlgorithm: string, title: string, category: string) {
        const body = {
            'algorithm': newAlgorithm,
            'title': title,
            'category': category
        };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.$http.post('http://localhost:8000/api/article/create', body, options);
    }

}

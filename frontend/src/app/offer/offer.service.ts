import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

import * as Toast from '../common/toast';
import * as Response from '../common/response';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OfferAlgorithmService {

    constructor(private $http: Http,
                private router: Router) { }

    private handleError(error: any) {
        Toast.showErrorToast(Toast.serverNotRespone);
    }

    getCategories() {
        return this.$http.get('http://api.room4323.study/api/article/categories/all')
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
        let params = new URLSearchParams();
        params.append('algorithm', newAlgorithm);
        params.append('title', title);
        params.append('category', category);
        return this.$http.get('http://api.room4323.study/api/article/create', {params: params})
                    .toPromise()
                    .then(response => {
                        let status = response.json().status.toString();
                        if (status === Response.error) {
                            Toast.showErrorToast(response.json().message.toString());
                        } else {
                            Toast.showSuccToast('Your algorithm was successfuly offered. Wait for moderator to check it.');
                            this.router.navigate(['']);
                        }
                    })
                    .catch(this.handleError);
    }

}

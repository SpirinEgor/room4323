import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Toast from '../common/toast';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AllAlgorithmsService {

    constructor(private $http: Http) { }

    private handleError(error: any) {
        Toast.showErrorToast(Toast.serverNotRespone);
    }

    getAllAlgorithms() {
        return this.$http.get('http://localhost:8000/api/article/get/all')
                        .toPromise()
                        .then(
                            response => {
                                if (response.json().status !== 'ok') {
                                    Toast.showErrorToast(Toast.serverNotRespone);
                                } else {
                                    return response.json().result;
                                }
                            }
                        )
                        .catch(this.handleError);
    }

}

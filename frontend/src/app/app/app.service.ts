import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import * as Toast from '../common/toast';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {

    constructor(private $http: Http) { }

    private handleError(error: any) {
        Toast.showErrorToast(Toast.serverNotRespone);
    }

    logOut(): void {
        this.$http.get('http://localhost:8000/api/authentification/logout/')
                    .toPromise()
                    .then(
                        response => {
                            if (response.json().status !== 'ok') {
                                Toast.showErrorToast(Toast.serverNotRespone);
                            }
                        }
                    )
                    .catch(this.handleError);
    }

}


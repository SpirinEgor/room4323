import { successful } from './../common/response';
import { Http, RequestOptions, Headers } from '@angular/http';
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
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        this.$http.get('http://api.room4323.study/api/authentification/logout/', options)
                    .toPromise()
                    .then(
                        response => {
                            if (response.json().status !== successful) {
                                Toast.showErrorToast(Toast.serverNotRespone);
                            }
                        }
                    )
                    .catch(this.handleError);
    }

}


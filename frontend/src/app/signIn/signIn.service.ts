import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import * as Response from '../common/response'
import { showErrorToast, serverNotRespone } from '../common/toast';

@Injectable()
export class SignInService {

    constructor(private $http: Http) { }

    signIn(username: string, password: string): Response.Body {
        let response: Response.Body = new Response.Body();
        response = this.sendData(username, password);
        return response;
    }

    sendData(username: string, password: string): Response.Body {
        const body = {
            'username': username,
            'password': password
        };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let response = new Response.Body();
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        this.$http.post('http://localhost:8000/api/authentification/login/', body, options).subscribe(
            data => {
                data = data.json()
                response.status = data['status'].toString();
                if (response.status === Response.error) {
                    // TODO: catch error from server and set incorrect field
                }
            },
            err => {
                showErrorToast(serverNotRespone);
                response.status = Response.error;
            }
        );
        return response;
    }

}

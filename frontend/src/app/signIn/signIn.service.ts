import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import * as Response from '../common/response'
import { showErrorToast, serverNotRespone } from '../common/toast';

@Injectable()
export class SignInService {

    constructor(private $http: Http) { }

    signIn(email: string, password: string): Response.Body {
        let response: Response.Body = new Response.Body();
        response = this.sendData(email, password);
        return response;
    }

    sendData(email: string, password: string): Response.Body {
        const body = {
            'email': email,
            'password': password
        };
        let response = new Response.Body();
        this.$http.post('/api/login', body).subscribe(
            data => {
                response.status = data['result']['status'];
                if (response.status === Response.successful) {
                    return response;
                }
                // TODO: catch error from server and set incorrect field
            },
            err => {
                showErrorToast(serverNotRespone);
                response.status = Response.error;
            }
        );
        return response;
    }

}

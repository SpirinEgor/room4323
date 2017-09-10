import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import * as Response from '../common/response'
import { showErrorToast, serverNotRespone } from '../common/toast';

@Injectable()
export class SignInService {

    constructor(private $http: Http) { }

    login(email: string, password: string): Response.Body {
        let response: Response.Body = new Response.Body();
        if (!this.validateEmail(email)) {
            response.status = Response.error;
            response.errors.push({
                field: 'email',
                error: 'This is not a valid e-mail address'
            })
        } else {
            response = this.sendData(email, password);
        }
        return response;
    }

    validateEmail(email: string) {
        const regString =
            `^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))` +
            `@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`;
        const regExp = new RegExp(regString);
        return regExp.test(email);
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

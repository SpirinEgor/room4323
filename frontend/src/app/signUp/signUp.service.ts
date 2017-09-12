import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import * as Response from '../common/response'
import { showErrorToast, serverNotRespone } from '../common/toast';

@Injectable()
export class SignUpService {

    constructor(private $http: Http) { }

    signUp(firstName: string, secondName: string, username: string, email: string,
                password: string, repeatedPassword: string): Response.Body {
        let response: Response.Body = new Response.Body();
        response = this.sendData(firstName, secondName, username, email, password);
        return response;
    }

    sendData(firstName: string, secondName: string, username: string,
                email: string, password: string): Response.Body {
        const body = {
            'firstName': firstName,
            'secondName': secondName,
            'username': username,
            'email': email,
            'password': password,
        };
        let response = new Response.Body();
        this.$http.post('/api/signup', body).subscribe(
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

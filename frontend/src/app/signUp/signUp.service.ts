import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import * as Response from '../common/response'
import { showErrorToast, serverNotRespone } from '../common/toast';

@Injectable()
export class SignUpService {

    constructor(private $http: Http) { }

    signUp(firstName: string, secondName: string, email: string, password: string, repeatedPassword: string): Response.Body {
        let response: Response.Body = new Response.Body();
        let errorOccured = false;
        if (!this.validateEmail(email)) {
            response.status = Response.error;
            response.errors.push({
                field: 'email',
                error: 'This is not a valid e-mail address'
            })
            errorOccured = true;
        }
        if (!this.matchPasswords(password, repeatedPassword)) {
            response.status = Response.error;
            response.errors.push({
                field: 'password',
                error: 'Passwords do not match'
            })
            response.errors.push({
                field: 'repeatedPassword',
                error: ''
            })
            errorOccured = true;
        }
        if (!errorOccured) {
            response = this.sendData(firstName, secondName, email, password);
        }
        return response;
    }

    validateEmail(email: string) {
        const regExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$/;
        return regExp.test(email);
    }

    matchPasswords(password: string, repeatedPassword: string) {
        return password === repeatedPassword
    }

    sendData(firstName: string, secondName: string, email: string, password: string): Response.Body {
        const body = {
            'firstName': firstName,
            'secondName': secondName,
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

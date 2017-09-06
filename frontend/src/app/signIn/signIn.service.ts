// import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import * as Response from '../common/response'

@Injectable()
export class SignInService {

    // constructor(private $http: Http) { }

    login(email: string, password: string): Response.Body {
        let response: Response.Body = new Response.Body();
        if (!this.validateEmail(email)) {
            response.status = Response.error;
            response.errors.push({
                field: 'email',
                error: 'This is not a valid e-mail address'
            })
        }
        return response;
    }

    validateEmail(email: string) {
        const regExp = /^[\w]{1}[\w-\.]*@(ya\.ru|yandex\.ru|yandex\.ua|yandex\.by|yandex\.kz|yandex\.com)$/;
        return regExp.test(email);
    }

    sendData(email: string, password: string) {
        // const body = {
        //     'email': email,
        //     'password': password
        // };
        // const response = this.$http.post('/api/login', body).subscribe();
    }

}

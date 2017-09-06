// import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import * as Response from '../common/response'

@Injectable()
export class SignUpService {

    // constructor(private $http: Http) { }

    signUp(firstName: string, secondName: string, email: string, password: string, repeatedPassword: string): Response.Body {
        let response: Response.Body = new Response.Body();
        if (!this.validateEmail(email)) {
            response.status = Response.error;
            response.errors.push({
                field: 'email',
                error: 'This is not a valid e-mail address'
            })
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
        }
        return response;
    }

    validateEmail(email: string) {
        const regExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;
        return regExp.test(email);
    }

    matchPasswords(password: string, repeatedPassword: string) {
        return password === repeatedPassword
    }

    sendData(firstName: string, secondName: string, email: string, password: string) {
        // const body = {
        //     'firstName' : firstName,
        //     'secondName' : secondName,
        //     'email': email,
        //     'password': password,
        // };
        // const response = this.$http.post('/api/signup', body).subscribe();
    }

}

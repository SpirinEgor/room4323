import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SignUpService {

    constructor(private $http: Http) { }

    signUp(firstName: string, secondName: string, username: string, email: string,
                password: string, repeatedPassword: string) {
        return this.sendData(firstName, secondName, username, email, password);
    }

    sendData(firstName: string, secondName: string, username: string,
                email: string, password: string) {
        const body = {
            'first_name': firstName,
            'last_name': secondName,
            'username': username,
            'email': email,
            'password': password,
        };
        return this.$http.post('http://api.room4323.study/api/authentification/signup/', body);
    }

    passwordMatchCheck(password: string, repeatedPassword: string): boolean {
        return (password === repeatedPassword);
    }
}

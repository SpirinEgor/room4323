import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SignInService {

    constructor(private $http: Http) { }

    signIn(username: string, password: string) {
        return this.sendData(username, password);
    }

    sendData(username: string, password: string) {
        const body = {
            'username': username,
            'password': password
        };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.$http.post('http://localhost:8000/api/authentification/login/', body, options);
    }

}

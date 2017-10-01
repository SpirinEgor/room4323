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
        this.$http.post('http://localhost:8000/api/authentification/login/', body).subscribe(
            data => {
                data = data.json()
                alert(data['status']);
                response.status = data['status'].toString();
                if (response.status === Response.successful) {
                    alert('petux');
                    // return response;
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

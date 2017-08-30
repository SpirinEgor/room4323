import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CreateAlgorithmService {

    constructor(private $http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    createAlgorithm(newAlgorithm: string) {
        const body = {
            'algorithm': newAlgorithm
        };
        this.$http.post('/api/createAlgorithm', body).subscribe();
    }

}


import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserLogin, UserRegistration } from "../models/user.model";
import { Observable } from "rxjs";
import { CustomResponse } from "../models/custom-response.interface";


@Injectable()

export class AuthenticationService {
    private readonly apiUrl = 'http://localhost:8080/api/v1/auth';

    constructor(private http: HttpClient){}


    registerUser(user: UserRegistration): Observable<any>{
        return this.http.post<CustomResponse>(`${this.apiUrl}/register`, user);
    }

    loginUser(user: UserLogin): Observable<any> {
        return this.http.post<CustomResponse>(`${this.apiUrl}/login`, user);
    }
}
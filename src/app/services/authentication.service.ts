import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserLogin, UserRegistration } from "../models/user.model";
import { Observable } from "rxjs";
import { CustomResponse } from "../models/custom-response.interface";
import { environment } from "src/environments/environment";


@Injectable()

export class AuthenticationService {
    private readonly domain = environment.DOMAIN;
    private readonly endpoint = '/api/v1/auth'

    constructor(private http: HttpClient){}


    registerUser(user: UserRegistration): Observable<any>{
        return this.http.post<CustomResponse>(`${this.domain}${this.endpoint}/register`, user);
    }

    loginUser(user: UserLogin): Observable<any> {
        return this.http.post<CustomResponse>(`${this.domain}${this.endpoint}/login`, user);
    }
}
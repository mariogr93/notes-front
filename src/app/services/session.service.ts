import { Injectable } from "@angular/core";
import { UserInfo } from "../models/user.model";


@Injectable()
export class SessionService {

    private _userInfo: UserInfo | null = null;
    private _token: string = '';


    public getUserInfo(){
        return this._userInfo;
    }

    public get token(){
        return this._token;
    }

    public set userInfo(userInfo: UserInfo ){
        this._userInfo = userInfo;
    }

    public set token(token: string){
        this._token = token;
    }

    public getBoth(){
        return {user: this._userInfo, token: this._token}
    }
}
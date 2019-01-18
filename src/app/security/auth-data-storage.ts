import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { UserType } from '../shared/data-types/user-type.enum';

@Injectable({
    providedIn: 'root'
  })
export class AuthDataStorage {
    
    public setJwtToken(token: string): void {
        sessionStorage.setItem('token', token);
    }

    public getJwtToken(): string {
        return sessionStorage.getItem('token');
    }

    public clearAuthData() {
        sessionStorage.clear();
    }

    public isLoggedIn(): boolean{
        return this.getJwtToken()!=null;
    }
    
    public getUser(){
        var decoded = this.getDecodedAccessToken(this.getJwtToken());
        if(!decoded){
            return null;
        }
        return { Email: decoded.Email, UserType: decoded.UserType==="Provider"?UserType.Provider:UserType.Client};
    }

    getDecodedAccessToken(token: string): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
    }
}
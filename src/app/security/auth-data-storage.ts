import { Injectable } from '@angular/core';

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
        return this.getJwtToken() != "";
    }
}
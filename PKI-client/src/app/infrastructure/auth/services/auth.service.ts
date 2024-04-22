import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import { AuthResponse } from '../model/auth-response.model';
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from '../../../../env/env'


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private headers = new HttpHeaders({
      'Content-Type': 'application/json',
      skip: 'true',
    });
  
    user$ = new BehaviorSubject("");
    userState = this.user$.asObservable();
  
    constructor() {
      this.user$.next(this.getRole());
    }
  
    http = inject(HttpClient);
    login(auth: any): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(environment.apiHost + 'auth/login', auth, {
        headers: this.headers,
      });
    }
  
    logout(): Observable<string> {
      return this.http.get(environment.apiHost + 'auth/logout', {
        responseType: 'text',
      });
    }

    getRole(): any {
      if (this.isLoggedIn()) {
        console.log("usaooo")
        const accessToken: any = localStorage.getItem('user');
        const helper = new JwtHelperService();
        console.log(accessToken);
        return helper.decodeToken(accessToken).Authorities[0];
      }
      return null;
    }
    getId(): number{
      if (this.isLoggedIn()) {
        const accessToken: any = localStorage.getItem('user');
        const helper = new JwtHelperService();
        return helper.decodeToken(accessToken).id;
      }
      return 0;
    }

    getHostId(userId: number): Observable<number> {
      return this.http.get<number>(environment.apiHost + 'users/host/' + userId);
    }

    getEmail(): string{
      if (this.isLoggedIn()) {
        const accessToken: any = localStorage.getItem('user');
        const helper = new JwtHelperService();
        return helper.decodeToken(accessToken).sub;
      }
      return "";
    }

    isLoggedIn(): boolean {
      return localStorage.getItem('user') != null;
    }

    setUser(): void {
      this.user$.next(this.getRole());
    }

  }

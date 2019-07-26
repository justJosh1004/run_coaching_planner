import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';
import { AuthData } from './auth-data.model';
import * as fromRoot from '../app.reducer';
import * as Auth from './auth.actions';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

const BACKEND_URL = `${environment.apiUrl}users`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private userId: string;

  constructor(
    private store: Store<fromRoot.State>,
    private http: HttpClient,
    private router: Router
  ) {}

  getToken() {
    return this.token;
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    if (!token || !expirationDate) {
      return;
    }

    return { token, expirationDate: new Date(expirationDate), userId };
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    return this.http.post(`${BACKEND_URL}/signup`, authData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  login(authData: AuthData) {
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        `${BACKEND_URL}/login`,
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;

        if (token) {
          const expiresInDuration = response.expiresIn;
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );

          this.setAuthTimer(expiresInDuration);
          this.userId = response.userId;
          this.saveAuthData(token, expirationDate, this.userId);
          this.store.dispatch(new Auth.SetAuthenticated());
          this.router.navigate(['/']);
        }
      });
  }

  authLogin() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.store.dispatch(new Auth.SetAuthenticated());
    }
  }

  logout() {
    this.token = null;
    clearTimeout(this.tokenTimer);
    this.userId = null;
    this.clearAuthData();
    this.store.dispatch(new Auth.SetUnauthenticated());
  }
}

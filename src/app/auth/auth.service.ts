import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';
import { AuthData } from './auth-data.model';
import * as fromRoot from '../app.reducer';
import * as Auth from './auth.actions';

const BACKEND_URL = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private store: Store<fromRoot.State>,
    private http: HttpClient,
    private router: Router
  ) {}

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    return this.http.post(`${BACKEND_URL}/signup`, authData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  login(authData: AuthData) {
    this.store.dispatch(new Auth.SetAuthenticated());
  }

  logout() {
    this.store.dispatch(new Auth.SetUnauthenticated());
  }
}

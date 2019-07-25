import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { AuthData } from './auth-data.model';
import * as fromRoot from '../app.reducer';
import * as Auth from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store<fromRoot.State>) {}

  login(authData: AuthData) {
    this.store.dispatch(new Auth.SetAuthenticated());
  }

  logout() {
    this.store.dispatch(new Auth.SetUnauthenticated());
  }
}

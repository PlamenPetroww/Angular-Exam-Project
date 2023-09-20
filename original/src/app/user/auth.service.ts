import { Injectable } from '@angular/core';
import { concatMap, from, Observable, of, switchMap, tap } from 'rxjs';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  UserInfo,
} from '@firebase/auth';
import { Auth, authState } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this.auth);

  constructor(
    private auth: Auth,
    private fireAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private router: Router
  ) {
  }

  public isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  user$ = this.fireAuth.authState;

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login$(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout$(): Observable<any> {
    return from(this.auth.signOut());
  }
}

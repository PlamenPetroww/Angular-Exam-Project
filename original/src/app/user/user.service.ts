import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, filter, from, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../types/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User | null = null

  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  isLogged$ = this.isLoggedSubject.asObservable();

  constructor(private auth: AngularFireAuth, private firestore: Firestore,
    private authService: AuthService,) {
    this.auth.authState.subscribe((user) => {
      this.isLoggedSubject.next(!!user);
    });
  }

  get isLogged(): boolean {
    return this.isLoggedSubject.getValue();
  }

    get currentUser$(): Observable<User | null> {
      return this.authService.currentUser$.pipe(
        switchMap((user) => {
          if(!user?.uid) {
            return of(null)
          }

          const ref = doc(this.firestore, 'users', user?.uid);
          return docData(ref) as Observable<User>
        })
      )
    }

    addUser(user: User): Observable<void> {
      const ref = doc(this.firestore, 'users', user.uid);
      return from(setDoc(ref, user))
    }

}

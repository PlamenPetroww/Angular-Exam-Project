import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';
import { User } from '../../types/user';
import { MessageComponent } from 'src/app/core/message/message.component';


@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css'],
})
export class NewOfferComponent implements OnInit {


  userId: any;
  userEmail: any;
  user: User | null = null;

  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  isLogged$ = this.isLoggedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AngularFireAuth,
    private message: MessageComponent,
  ) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.isLoggedSubject.next(true);
        this.userId = user.uid;
        this.userEmail = user.email;
      } else {
        this.isLoggedSubject.next(false);
        this.userId = null;
        this.userEmail = null;
      }
    });
  }


  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    img: ['', [Validators.required, Validators.pattern('^https://.*$')]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    duration: [
      '',
      [Validators.required, Validators.max(15), Validators.min(2)],
    ],
    price: [
      '',
      [Validators.required, Validators.max(1000), Validators.min(50)],
    ],
  });

  ngOnInit(): void {
    this.userService.currentUser$
    .pipe(
      tap((user) => {
        if (user) {
          console.log(user.uid);
          console.log('this.user')
        }
      })
    )
    .subscribe();
  }

  create(): void {
    const subscribers: string[] = [];
    if (!this.userService.isLogged) {
      return;
    }
    if(this.form.invalid) {
      return;
    }
        const { title, img, description, duration, price } = this.form.value as {
      title: string;
      img: string;
      description: string;
      duration: string;
      price: string;
    };

    this.apiService
      .createLesson(this.userId, this.userEmail, title, img, description, duration, price)
      .subscribe(() => {
        this.message.showToastAfterSucesseffulLesson();
        this.router.navigate(['/lessons']);
      });
    }

  cancel() {
    alert('Are you suggesting that you want to give up?');
    this.message.showToastAfterCancel();
    this.router.navigate(['/lessons'])
  }

}

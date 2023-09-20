import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ApiService } from 'src/app/api.service';
import { Lesson } from 'src/app/types/lessons';
import { User } from '../../types/user';
import { AuthService } from 'src/app/user/auth.service';
import { MessageComponent } from 'src/app/core/message/message.component';

@Component({
  selector: 'app-load-offer',
  templateUrl: './load-offer.component.html',
  styleUrls: ['./load-offer.component.css'],
})
export class LoadOfferComponent implements OnInit {
  userId: any;
  userEmail: any;
  user: User | null = null;
  buttonText: string = 'Subscribe';
  isSubscribed: boolean = false;
  email: any;
  isAuth = false;
  private userSub?: Subscription;

  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  isLogged$ = this.isLoggedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private message: MessageComponent
  ) {}

  lesson: Lesson | undefined;

  ngOnInit(): void {
    this.userSub = this.authService.currentUser$.subscribe(user => {
      this.isAuth = !user ? false : true;
      this.email = user?.email;
    })
    this.showFullInfoLesson();
  }

  showFullInfoLesson(): void {
    const lessonId = this.activatedRoute.snapshot.params['lessonId'];
    this.apiService.getLesson(lessonId).subscribe((lesson) => {
      this.lesson = lesson;
    });
  }

  toggleSubscription() {
    if (!this.isSubscribed) {
      this.buttonText = 'Subscribed';
      this.message.showToastrAfterSubscribe();
      this.isSubscribed = true;
    }
  }

}

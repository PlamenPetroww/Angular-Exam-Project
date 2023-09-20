import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';

import { ApiService } from 'src/app/api.service';
import { Lesson } from 'src/app/types/lessons';
import { map, shareReplay, tap } from 'rxjs';

@Component({
  selector: 'app-current-offer',
  templateUrl: './current-offer.component.html',
  styleUrls: ['./current-offer.component.css'],
})
export class CurrentOfferComponent implements OnInit {

  authorEmail: any;
  id: any;
  lessonA: any;
  isLoading: boolean = true;
  subscriptions: any;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    duration: ['', [Validators.required, Validators.max(15), Validators.min(2)]],
    price: ['', [Validators.required, Validators.max(1000), Validators.min(50)]],
  });

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  lessonId!: string;

  lesson: Lesson | undefined;

  ngOnInit(): void {
    this.lessonId = this.activatedRoute.snapshot.params['lessonId'];
    this.fetchLesson();

    const lesson$ = this.apiService.getLesson(this.id).pipe(
      shareReplay(1),
      tap((lesson) => {
        this.isLoading = false;

        this.lesson = lesson;
        this.authorEmail = this.lesson?.userEmail;
        this.lessonA.id = this.id;
      })
    );

    /* const subs$ = this.apiService.getSubscribers().pipe(
      shareReplay(1),
      map((responseData) => {
        const subsArray = [];
        for(const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
            subsArray.push({ ...responseData[key], id: key})
          }
        }
        return subsArray;
      })
    ) */

    /* combineLatest([lesson$, subs$]).subscribe(([lesson, subs]) => {
      
      this.subscriptions = subs;
      this.lesson = lesson;

      
    }) */
  }

  fetchLesson(): void {
    this.apiService.getLesson(this.lessonId).subscribe((lesson) => {
      this.lesson = lesson;
    });
  }

  editSubmitHandler(): void {
    if(this.form.invalid) {
      return;
    }
    const {title, img, description, duration, price}= this.form.value as {
      title:string,
      img: string,
      description: string,
      duration: string,
      price: string,
    };

    this.apiService.editLesson(this.lessonId,title, img, description, duration, price).subscribe(() => {
      this.router.navigate(['/lessons'])
    })
  }
}

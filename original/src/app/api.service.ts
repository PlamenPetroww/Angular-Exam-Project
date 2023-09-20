

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Lesson } from './types/lessons';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private appUrl: string;
  private offerIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    this.appUrl = environment.appUrl;
  }

  subscribeForLesson(lessonId: string, subscriberId: string) {
    return this.http.post(`${this.appUrl}/subscribers.json`, {
      lessonId,
      subscriberId
    });
  }

  getSubscribers() {
    return this.http.get<Lesson[]>(`${this.appUrl}/subscribers.json`)
  }

  getOfferIdSubject() {
    return this.offerIdSubject.asObservable();
  }

  setOfferId(offerId: string | null) {
    this.offerIdSubject.next(offerId);
  }

  getLesson(lessonId: string) {
    return this.http.get<Lesson>(`${this.appUrl}/lessons/${lessonId}.json`);
  }

  getLessons() {
    return this.http.get<Lesson[]>(`${this.appUrl}/lessons.json`);
  }

  deleteLessonById(lessonId: string) {
    return this.http.delete<Lesson>(`${this.appUrl}/lessons/${lessonId}.json`);
  }

  createLesson(
    author: string,
    userEmail: string,
    title: string,
    img: string,
    description: string,
    duration: string,
    price: string,
    /* subscribers: string[] */
  ) {
    return this.http.post<Lesson>(`${this.appUrl}/lessons.json`, {
      author,
      userEmail,
      title,
      img,
      description,
      duration,
      price,
      /* subscribers */
    });
  }

  editLesson(
    lessonId: string,
    title: string,
    img: string,
    description: string,
    duration: string,
    price: string) {
      return this.http.patch<Lesson>(`${this.appUrl}/lessons/${lessonId}.json`, {
        lessonId,
        title,
        img,
        description,
        duration,
        price
      })
    }

    
  
}

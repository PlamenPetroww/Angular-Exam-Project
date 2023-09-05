import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { OfferModule } from './offer/offer.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {AuthGuard} from './core/guards/authAuthenticate'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './core/message/message.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LessonsListComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    UserModule,
    OfferModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    FontAwesomeModule,
  ],
  providers: [AuthGuard, MessageComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

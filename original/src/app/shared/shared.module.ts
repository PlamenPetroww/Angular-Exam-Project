import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EmailDirective } from './validators/email.directive';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    LoaderComponent,
    EmailDirective,
    NotFoundComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [LoaderComponent, EmailDirective]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';
import { SharedModule } from '../shared/shared.module';
import { MessageComponent } from './message/message.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    GlobalLoaderComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    GlobalLoaderComponent,
    MessageComponent
  ]
})
export class CoreModule { }

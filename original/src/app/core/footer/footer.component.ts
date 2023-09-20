import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private authService: AuthService){}

  email: any;
  isAuth = false;
  private userSub?: Subscription;

  ngOnInit(): void {
    this.userSub = this.authService.currentUser$.subscribe(user => {
      this.isAuth = !user ? false : true;
      this.email = user?.email;
    })
  }

}

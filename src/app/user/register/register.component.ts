import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';
import { AuthService } from '../auth.service';
import { Subject, catchError, takeUntil } from 'rxjs';
import { MessageComponent } from 'src/app/core/message/message.component';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faAt} from '@fortawesome/free-solid-svg-icons';
import {faKey} from '@fortawesome/free-solid-svg-icons';

export function passwordsMatchValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassord = control.get('confirmPassword')?.value;

    if (password && confirmPassord && password !== confirmPassord) {
      return { passwordDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  userIcon = faUser;
  emailIcon=faAt;
  passwordIcon=faKey;

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  },
  {validators:passwordsMatchValidator()}
  );

  emailDomains = DEFAULT_EMAIL_DOMAINS;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService,
    private fb: NonNullableFormBuilder,
    private message: MessageComponent
  ) {}

  ngOnInit(): void {}

  private destroy$ = new Subject<void>();

  get username() {
    return this.registerForm.get('username')
  }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }

  submit() {
    const {username, email, password} = this.registerForm.value;
  
  if(!this.registerForm.valid || !username || !password || !email) {
    return;
  }

  this.authService.signUp(email, password).pipe(
    catchError((error) => {
      this.message.showToastrAfterUnsuccess();
      return error;
    }),
    takeUntil(this.destroy$)
  )
  .subscribe(() => {
    this.message.showToastrAfterSuccess();
    this.router.navigate(['/']);
  });

}

ngOnDestroy() {
this.destroy$.next();
this.destroy$.complete();
}

showToastrAfterSuccessLogin() {
this.toast.success('You can surfing', 'Enjoy');
}

showToastrAfterUnsuccessLogin() {
this.toast.success('Something went wrong ...', 'Failed');
}
  
}

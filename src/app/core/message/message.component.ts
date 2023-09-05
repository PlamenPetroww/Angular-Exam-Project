import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  constructor(private toast: ToastrService) {}

  showToastrAfterSuccess() {
    this.toast.success('You can surfing', 'Enjoy');
  };

  showToastrAfterUnsuccess() {
    this.toast.error('Wrong email or password', 'Failed');
  };

  showToastrAfterLogout() {
    this.toast.info('Good bye', 'Logout')
  }

  showToastrDeleteItem() {
    this.toast.info('Lesson deleted', 'Successful!')
  }

  showToastrAfterSubscribe() {
    this.toast.success('You are subscribed', 'You did it');
  }

  showToastAfterCancel() {
    this.toast.info('Cancelled', 'Successful!')
  }

  showToastAfterSucesseffulLesson() {
    this.toast.success('Your lesson is created', 'Congratulations')
  }

}

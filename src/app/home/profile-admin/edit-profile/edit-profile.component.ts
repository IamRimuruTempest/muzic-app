import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Component,  EventEmitter, Output } from '@angular/core';
import { Account } from 'src/app/models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {

  @Output() dismissed = new EventEmitter();
  @Output() submitData = new EventEmitter();

  account: Account;
  constructor(private authService: AuthService) {
    this.authService.userAccount
      .pipe(first())
      .subscribe((acc) => (this.account = acc as Account));
  }


}

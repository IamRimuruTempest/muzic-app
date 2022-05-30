import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  @Output() submitted = new EventEmitter();
  @Output() dismissed = new EventEmitter();
  passwords = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  constructor() {}

  ngOnInit() {}
}

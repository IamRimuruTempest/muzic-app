import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Account } from 'src/app/models/user';
import { Data } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  subscription: Subscription;

//  userId: string;
 account: Array<Account> = [];


  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
  
  }

   ionViewDidEnter() {
    this.subscription = this.dataService.getAcount()
      .subscribe(
        (res) => {
          this.account = res as Account[];
          console.log(res)
        }
      );
  }

 

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Account } from 'src/app/models/user';

import { Pipe } from '@angular/core';

@Pipe({ 
  name: 'emailAsterisk',
 })

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})

export class UserDetailsPage implements OnInit {

  transform(value: string): string {
    return value 
      ? value.replace(/\B.+@/g, (c, ) => c.split('').slice(0, -1).map(v => '*').join('') + '@') 
      : value;
  }


   userId: string;
  account: Account = {
    userFirstname: '',
    userLastname: '',
    userAddress: '',
    userPhone: '',
    userEmail: '',
    userType: '',
    imageUrl: '',
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params.userId;
    console.log("User ID:", this.userId);
    this.dataService.getUser(this.userId).subscribe(account => {
      console.log(account);
      this.account = account as Account;
    });
  }




  

}

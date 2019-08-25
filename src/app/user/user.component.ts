import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private service: AppServiceService) {
    this.router.events.subscribe(events => {
      if(events as NavigationEnd) {
        if(events['url'] && events['url'] ==='/user') {
          this.router.navigateByUrl('user/dashboard');
        }
      }
    })
   }

  ngOnInit() {
  }

 

  logoutConfirm() {

    

  }

}

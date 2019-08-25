import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { 
    this.router.events.subscribe(events => {
      if(events as NavigationEnd) {
        if(events['url'] && events['url']==='/admin') {
          this.router.navigateByUrl('/admin/user-details');
        }
      }
    })
  }

  ngOnInit() {

  }

}

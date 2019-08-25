import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../app-service.service';
import { Router } from '../../../../node_modules/@angular/router';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {

  authToken: string;
  constructor(private service: AppServiceService, private router: Router, private toastr: ToastrService) { }


  ngOnInit() {
  }

  logoutConfirm() {

    this.authToken = localStorage.getItem('authToken');
    this.service.logout(this.authToken).subscribe(data => {
      //console.log('logout', data);
      let resData: any = data;
     $('#logoutButton').modal('hide');
      if(resData.error) {

      } else {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        this.toastr.info('', 'Logout Successfully');
        this.router.navigate(['/login']);

      }
    })
  }

  logout() {

    $('#logoutButton').modal('show');

  }

}

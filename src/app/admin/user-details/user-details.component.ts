import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../adminservice.service';
import { Router } from '@angular/router';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { AppServiceService } from '../../app-service.service';
declare var $: any;

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  tableData: any;
  data: any;
  isLoading: boolean;
  errorMsg: string;
authToken: string;
logoutData: any;
  constructor(private service: AdminserviceService,  
    private router: Router, private toastr: ToastrService,
  private appService: AppServiceService) {
      this.authToken = localStorage.getItem('authToken');
   }

  ngOnInit() {
    setTimeout(() => {
      
      this.getAllData();
    }, 2000);
    
  } // end of ngOnInit
  
  // navigateMethod() {

  //   this.appService.logout(this.authToken).subscribe(data => {
  //     this.logoutData = data;
  //     if(this.logoutData.error) {

  //     } else {
  //       localStorage.removeItem('authToken');
  //       localStorage.removeItem('userId');
  //       localStorage.removeItem('username');
  //       this.router.navigate(['/login']);
  //     }
  //   })
  // }
  
  getAllData() {
    if(this.authToken) {
      this.isLoading = true;

      this.service.getAllUserDetails().subscribe(data => {
        this.data = data;
       // console.log(this.data);
      this.isLoading =  false;
        if(this.data.error) {
         this.toastr.error(this.data.message, 'Error');
        //  this.navigateMethod();
      }
       else if (this.data.message === 'No Users Found') {
        this.toastr.info('','No Users Found');
       }
      
      else {
          this.tableData = this.data;
      }
    }, error => {
      this.isLoading =  false;
     //console.log(error);
    });
   } else {
      this.isLoading =  false;
      this.errorMsg = 'Some Error is Occured';
      this.toastr.info(this.errorMsg, 'Error');
     
   }
}

name(item) {
 this.router.navigate(['/admin/eventdetails', item]);
} // end of name

}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { AppServiceService } from '../app-service.service';
import { ToastrService } from '../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {

  verifyCodeDetails = {
    code: '',
    userId: '',
    changePassword:''
  }
  isLoading: boolean;
  constructor(private route: ActivatedRoute, 
    private service: AppServiceService, 
    private toastr: ToastrService, private router: Router) { 
    this.verifyCodeDetails.userId = route.snapshot.params.userId;
   // console.log(this.verifyCodeDetails.userId);
  }

  ngOnInit() {

  }

  onSubmit() {
    this.service.verifyCode(this.verifyCodeDetails).subscribe(data => {
     // console.log(data);

      let resData: any = data;

      if(resData.error) {
        this.toastr.error(resData.message,'Error')
      } else {
        this.toastr.success(resData.message, 'Success')
        this.router.navigate(['/login'])
      }
    })
  }

}

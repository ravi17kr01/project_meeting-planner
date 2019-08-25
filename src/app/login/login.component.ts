import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { Router } from '@angular/router';
import {forgotPassword} from './forgotpassword.model';

import { SocketService } from '../socket.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userDetails = {
    email: '',
    password: ''
  }
  
  forgotEmail: forgotPassword;
  forgotemail: string;
  data;
  authToken: string;
  loginData: any;
  isAdmin: boolean;
  isLoading: boolean;
  errorMsg: string;



  constructor(private service: AppServiceService, private router: Router, 
   private socket: SocketService, 
    private toastr: ToastrService) {

     }

  ngOnInit() {

  }
  
  onSubmit() {
    this.isLoading = true;
   this.service.login(this.userDetails).subscribe(data => {
     localStorage.removeItem('authToken');
     localStorage.removeItem('userId');
     localStorage.removeItem('username');
    this.isLoading = false;     
     this.loginData = data;
     if(this.loginData.error) {
      this.errorMsg = this.loginData.message;
      setTimeout(() => {
        $('#errorData').modal('show');
      }, 2000);
     } else {
        localStorage.setItem('authToken', this.loginData.data.authToken);
        localStorage.setItem('userId', this.loginData.data.userDetails.userId);
        localStorage.setItem('username', this.loginData.data.userDetails.userName);
       this.authToken = localStorage.getItem('authToken');
       this.isAdmin = this.loginData.data.userDetails.isAdmin;
       let details = {
        authToken: this.loginData.data.authToken,
        userId: this.loginData.data.userDetails.userId
      }
       setTimeout(() => {
        this.socket.getASocketCall(details).subscribe(data => {

        })
      }, 2000);

     }

     if(this.isAdmin) {
      this.router.navigateByUrl('/admin');
     } else {
      this.router.navigateByUrl('/user');
     }
     
   }, error => {
    this.isLoading = false;  
   this.toastr.error('Something Went Wrong', 'Error')  

   })
  }

  signup() {
    this.router.navigate(['signup']);
  }

  forgotpassword() {
      $('#regModal').modal('show');
       
  }

  sendEmail() {
    this.forgotEmail = {email: this.forgotemail};
    this.service.forgotPassword(this.forgotEmail).subscribe(data => {
      this.data = data;
      if(this.data.error) {
        this.errorMsg = this.data.message;
        $('#regModal').modal('hide');
      this.toastr.error('', 'Email is not Registered');
      } else {
        $('#regModal').modal('hide');
    this.toastr.success('Password sent to your email', 'Password Sent');
    this.router.navigateByUrl('/verifycode/' + this.data.data.userId);
      }
    });
  }

  cancel() {
    $('#regModal').modal('hide');
  }

}

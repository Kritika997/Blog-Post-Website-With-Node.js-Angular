import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogPostService } from 'src/app/services';
// import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  // abc:boolean = true
  
  loginform:any
  // successMessage:any
  constructor( private userService:BlogPostService,
    public router: Router, 
    private spinner: NgxSpinnerService, 
    private toastr: ToastrService,
    ) {}



  ngOnInit(): void {

    this.loginform = new FormGroup({
      user_email: new FormControl('',[Validators.required, Validators.email]),
      user_password: new FormControl('',[Validators.required]),
    });
  };
  


  login(){
    try{
      if(this.loginform.valid){
        // console.log(this.loginform.value)
        this.spinner.show();
        const data = this.userService.loginUser(this.loginform.value).subscribe(
          (result:any) => {
            this.spinner.hide();
            console.log("hfdhsfhsd",result.user_role)

            this.toastr.success('Success', result.message);
          
            localStorage.setItem ('usertoken', result.cookie);
            localStorage.setItem ('role', result.user_role);
            this.router.navigateByUrl('layout/homepage');
          },
          err => {
            this.spinner.hide();
            // console.log(err)
            this.toastr.error(err.error.message);
          }
        );
        
      }
    }
    catch (error:any) {
      this.spinner.hide();
      this.toastr.error(error);
      
      return;
    }
    
  };


};

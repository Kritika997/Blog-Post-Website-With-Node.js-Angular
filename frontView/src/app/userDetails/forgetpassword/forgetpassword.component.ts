import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogPostService } from 'src/app/services';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  passwordform: any
 

  constructor(private userService:BlogPostService,
     private router:Router, 
     private spinner: NgxSpinnerService,
     private toastr: ToastrService ) {}

  ngOnInit(): void {
    this.passwordform = new FormGroup({
      user_email: new FormControl('',[Validators.required,Validators.email]),
    });
    
  }
  

  forgetpassword(){
    
    try{
      if(this.passwordform.valid){
        this.spinner.show();
  
        this.userService.forgetPassword(this.passwordform.value).subscribe(
          (result:any) => {
            this.spinner.hide();
        this.toastr.success('Success', result.message);

            localStorage.setItem ('token', result.cookie);
            this.router.navigateByUrl('layout/otpverification');
          },
          err => {
            this.spinner.hide();
            
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

}


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogPostService } from 'src/app/services';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  passwordform: any

  constructor(private userService:BlogPostService, private router:Router ) {}

  ngOnInit(): void {
    this.passwordform = new FormGroup({
      user_email: new FormControl('',[Validators.required]),
    });
    
  }
  

  forgetpassword(){
    
    if(this.passwordform.valid){

      this.userService.forgetPassword(this.passwordform.value).subscribe((result:any) => {
        localStorage.setItem ('token', result.cookie);
        if({message:"OTP created successfully" }){
        
          this.router.navigateByUrl('/otpverification');
        }
        else{
          this.router.navigateByUrl('/forgetpassword');
        }
        
      })
      
    }
    
  };
    

}


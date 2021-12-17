import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  passwordform: any

  constructor(private http: HttpClient , public router : Router ) {}

  ngOnInit(): void {
    this.passwordform = new FormGroup({
      user_email: new FormControl('',[Validators.required]),
    });
    
  }
  

  forgetpassword(){
    
    if(this.passwordform.valid){
      this.http.post(`${baseUrl}/forgetpassword`,this.passwordform.value).subscribe((result:any) => {

        console.log(result);
        localStorage.setItem('token', result.cookie);
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


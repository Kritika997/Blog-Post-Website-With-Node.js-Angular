import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogPostService } from 'src/app/services';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  abc:boolean = true
  msg:any = ""
  loginform:any
  constructor(private userService:BlogPostService ) {}

  ngOnInit(): void {

    this.loginform = new FormGroup({
      user_email: new FormControl('',[Validators.required, Validators.email]),
      user_password: new FormControl('',[Validators.required]),
    });
    
  };

  login(){
    if(this.loginform.valid){

      const data = this.userService.loginUser(this.loginform.value)
      // msg= data.message
    }else{
      alert("enter a valid details");
    };
    
  };

};

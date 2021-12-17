import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { baseUrl } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginform:any
  constructor(private http: HttpClient , public router : Router, private cookieService: CookieService ) {}



// constructor( private cookieService: CookieService ) { }

// ngOnInit(): void {
//   this.cookieService.set( 'name', 'Test Cookie' ); // To Set Cookie
//   this.cookieValue = this.cookieService.get('name'); // To Get Cookie
// }

  ngOnInit(): void {

    this.loginform = new FormGroup({
      user_email: new FormControl('',[Validators.required, Validators.email]),
      user_password: new FormControl('',[Validators.required]),
    });
    
  };

  login(){
    if(this.loginform.valid){
      this.http.post(`${baseUrl}/login`,this.loginform.value).subscribe((result:any) => {
        console.log(result)
        localStorage.setItem ('usertoken', result.cookie);
        // console.log(localStorage.getItem('token'));

        if({message: "you login successfully...."}){
          this.router.navigateByUrl('/homepage')
          alert("Login Successfully");
        }
        else{
          alert("Try Agian..");
        };
        
      });
      
    }else{
      alert("enter a valid details");
    };
    
  };

};

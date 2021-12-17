import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { baseUrl } from 'src/environments/environment';


@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css']
})
export class OtpverificationComponent implements OnInit {

  otpform: any
  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
    this.otpform = new FormGroup({
      otp: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      reConfirm: new FormControl('', [Validators.required]),
    });

  }
  
  otpverification() {
    if (this.otpform.valid) {
      // console.log(this.otpform.value)

      this.http.post(`${baseUrl}/otpverification`, this.otpform.value,{headers: new HttpHeaders(
        { 'Authorization': `${localStorage.getItem("token")}`}
      )
      }).subscribe((result) => {

        console.log(result);
        if ({ message: "Your password has been changed successfully" }) {
          alert("Your Password Has Been Changed SUccessfully...");
          this.router.navigateByUrl('/login')
        }
        else {
          alert("try again..")
        }
      })
    }
  };
}

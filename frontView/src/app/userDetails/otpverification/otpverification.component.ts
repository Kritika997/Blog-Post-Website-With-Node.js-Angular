import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPostService } from 'src/app/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css']
})
export class OtpverificationComponent implements OnInit {

  otpform: any
  constructor(public router: Router, private userService: BlogPostService) { }

  ngOnInit(): void {
    this.otpform = new FormGroup({
      otp: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      reConfirm: new FormControl('', [Validators.required]),
    });

  }

  otpverification() {
    if (this.otpform.valid) {

      this.userService.otpVerificaton(this.otpform.value,).subscribe((result: any) => {
        if (result.error) {
          console.log(result)

        }
        else {
          this.router.navigateByUrl('/login');
        }

      })
    }
  };
}

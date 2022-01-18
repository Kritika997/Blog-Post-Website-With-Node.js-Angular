import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

// import { BlogPostService } from 'src/app/services';
import { BlogPostService } from 'src/app/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  dublicatEntry:Boolean = false
  errors:any
  file:any 
  selectGender:any = ["Select Gender","Male","Female","Other"];
  userRole:any=["Select Role","User","Admin"];
  cityName:any=["Select City","Mumbai",	"Delhi","Bangalore"	,"Hyderabad",
  "Ahmedabad","Chennai","Kolkata","Surat","Pune",	"Jaipur","Gurgaon"];    

  registerform:any
  tempImagePage:any  

  constructor(private userService: BlogPostService,
     public router: Router, 
     private spinner: NgxSpinnerService,
     private toastr: ToastrService) {}

  ngOnInit(): void {
    this.registerform = new FormGroup({
      user_name: new FormControl('',[Validators.required]),
      user_email: new FormControl('',[Validators.required, Validators.email]),
      user_gender: new FormControl('',[Validators.required]),
      role: new FormControl('',[Validators.required]),
      user_location: new FormControl('',[Validators.required]),
      user_profile : new FormControl('',[Validators.required]),
      user_password: new FormControl('',[Validators.required]),    
      confirm_password: new FormControl(false),
    });

  }

  readURL(event: any): void {

    this.tempImagePage = event.target.files[0]
    
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.file = reader.result;

        reader.readAsDataURL(file);

    }
}

  register(){
    try{
      if(this.registerform.valid){
        this.spinner.show();
        let user_data : FormData = new FormData();
        user_data.append("user_name",this.registerform.value.user_name)
        user_data.append("user_email",this.registerform.value.user_email)
        user_data.append("user_gender",this.registerform.value.user_gender)
        user_data.append("role",this.registerform.value.role)
        user_data.append("user_location",this.registerform.value.user_location)
        user_data.append("testimage",  this.tempImagePage)
        user_data.append("user_password",this.registerform.value.user_password)
        user_data.append("confirm_password",this.registerform.value.confirm_password)
  
        const user = this.userService.userRegister(user_data).subscribe(
          (data:any) => {
            this.spinner.hide();
            this.toastr.success('Success', data.message);

            this.router.navigateByUrl('/login');
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
      // this.toastr.error(messages.somethingWrong);
      return;
    }
  };

}

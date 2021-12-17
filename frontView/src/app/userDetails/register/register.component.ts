import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  file:any 
  constructor(private http: HttpClient , public router : Router ) {}
  registerform:any

  ngOnInit(): void {
    this.registerform = new FormGroup({
      user_name: new FormControl('',[Validators.required]),
      user_email: new FormControl('',[Validators.required, Validators.email]),
      user_gender: new FormControl('',[Validators.required]),
      user_profile : new FormControl('',[Validators.required]),
      user_location: new FormControl('',[Validators.required]),
      user_password: new FormControl('',[Validators.required]),    
      confirm_password: new FormControl(false),
    });

  }

  upload(event:any){
    this.file = event.target.files[0]

  }
  
  register(){
    if(this.registerform.valid){
      let user_data : FormData = new FormData();
      user_data.append("user_name",this.registerform.value.user_name)
      user_data.append("user_email",this.registerform.value.user_email)
      user_data.append("user_gender",this.registerform.value.user_gender)
      user_data.append("testimage",  this.file)
      user_data.append("user_location",this.registerform.value.user_location)
      user_data.append("user_password",this.registerform.value.user_password)
      user_data.append("confirm_password",this.registerform.value.confirm_password)

      console.log(user_data);
      
      this.http.post(`${baseUrl}/signup`,user_data).subscribe((result) => {

        console.log(result);
        
        if({message: 'Your account has created.....'}){
          alert("Your Account Has Created Successfully...");
          this.router.navigateByUrl('/login')
        }
        else{
          alert(
            "Please try again"
          ); 
          
        }
      })
    }
    
  };
    



}


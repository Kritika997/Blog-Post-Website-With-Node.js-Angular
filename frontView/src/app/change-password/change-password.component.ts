import { Component, OnInit } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { BlogPostService } from '../services';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  userList:any
  image: any = `${baseUrl}/`
  changePasswordForm:any
  userData:any=[];

  constructor(private userService:BlogPostService,
    private spinner: NgxSpinnerService,
     private toastr: ToastrService,
     public route: Router,) { }

  ngOnInit(): void {
    
    this.userService.currentUser().subscribe((result: any) => {
      // console.log(result)
      this.userList = result
      this.userData.push(this.userList["data"])
    })
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl(``,[Validators.required]),
      user_password: new FormControl('',[Validators.required]),
      confirm_password: new FormControl(false)
      })
 
  }

  changePassword(){
    
    try{
      this.spinner.hide();
      if (confirm("Are you sure to change it ")){
        if (this.changePasswordForm.valid) {
          
            const data = this.userService.changePassword(this.changePasswordForm.value).subscribe(
              (result:any) => {
                this.spinner.hide();
                this.toastr.success('Success', result.message);
                
                this.route.navigateByUrl('layout/userprofile');
              },
              (err:any) => {
                this.toastr.error(err.error.message);
                if(err.error.message=='token not verified'){
                  this.spinner.hide();
                  this.toastr.error(err.error.message);
      
                  this.route.navigateByUrl('/login');
                }
               if(err.error.message=="Only Admin Can Edit The Post"){
                this.spinner.hide();
                this.toastr.error(err.error.message);
      
                  this.route.navigateByUrl('layout/userprofile');
                }
                
              }
            );
            
          }
      }
      this.route.navigateByUrl('layout/userprofile');
    }
    catch (error:any) {
      this.spinner.hide();
      this.toastr.error(error);
      
      return;
    }
  }

}

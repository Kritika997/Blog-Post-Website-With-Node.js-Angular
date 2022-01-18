import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPostService } from 'src/app/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  file: any
  postform: any
  tempImagePage:any

  constructor(private userService: BlogPostService, 
    public router:Router, 
    private spinner: NgxSpinnerService,
    private toastr: ToastrService ){}

 
  ngOnInit(): void {

    this.postform = new FormGroup({
      Title: new FormControl('', [Validators.required]),
      Blog: new FormControl('', [Validators.required]),
      Picture: new FormControl('', [Validators.required]),
    })
  }

  
  readURL(event: any): void {

    this.tempImagePage = event.target.files[0]
    // alert(this.tempImagePage)
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.file = reader.result;

        reader.readAsDataURL(file);

    }
}

  
  postcreate() {
    try{
      if (this.postform.valid) {
        this.spinner.show();
        
        let user_data : FormData = new FormData();
        user_data.append("Title",this.postform.value.Title)
        user_data.append("Blog",this.postform.value.Blog)
        user_data.append("testimage",  this.tempImagePage)
  
        const data = this.userService.createPost(user_data).subscribe(
          (result:any) => {
            this.spinner.hide();
            this.toastr.success('Success', result.message);
            
            this.router.navigateByUrl('layout/homepage');
          },
          (err:any) => {
            this.spinner.hide();
            this.toastr.error(err.error.message);

            if(err.error.message=='token not verified'){
              this.toastr.error(err.error.message);

              this.router.navigateByUrl('layout/login');
            }
            
          }
        );
       
          
      } 
    }
    catch (error:any) {
      this.spinner.hide();
      this.toastr.error(error);
      
      return;
    }
  }

}

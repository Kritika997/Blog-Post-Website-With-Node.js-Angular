import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogPostService } from 'src/app/services';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { baseUrl } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  public id: any;
  file: any
  public postList:any
  
  image:any = `${baseUrl}/`
  userForm:any
  tempImagePage:any
  blog:any

  constructor(private userService: BlogPostService,
     private router:ActivatedRoute, public route: Router, 
     private spinner: NgxSpinnerService,
     private toastr: ToastrService) {
    
   }
  
  editPostForm: any

  
   ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.userService.postList(this.id).subscribe((result)=>{
      // console.log("result",result)
      this.postList = result
      this.blog=this.postList[0].Blog
      // console.log(this.blog);

    this.editPostForm = new FormGroup({
      Blog: new FormControl(`${this.blog}`),
      Picture: new FormControl(''),
      })
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
  
  
  updatepost() {
    
    try{
      this.spinner.hide();
      if (confirm("Are you sure to edit it " + this.id)){
        if (this.editPostForm.valid) {
      
          this.id = this.router.snapshot.paramMap.get('id');
         
            let post_data: FormData = new FormData();
            post_data.append("Blog", this.editPostForm.value.Blog)
            post_data.append("testimage", this.tempImagePage);
      
            const data = this.userService.editpost(this.id,post_data).subscribe(
              (result:any) => {
                this.spinner.hide();
                this.toastr.success('Success', result.message);
                
                this.route.navigateByUrl('layout/userprofile');
              },
              (err:any) => {
               
               
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

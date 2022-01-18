import { Component, OnInit } from '@angular/core';
import { BlogPostService } from 'src/app/services';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { baseUrl } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  commentList:any
  // commentList1:any = [{abc:"lol",name:"kishan"}]

  image:any = `${baseUrl}/`
  postList:any
  
  constructor(private userService: BlogPostService,
     private router: ActivatedRoute, 
     public route: Router,
     private spinner: NgxSpinnerService,
     private toastr: ToastrService) {
    this.id = this.router.snapshot.paramMap.get('id');
    this.userService.userComment(this.id).subscribe((list)=>{
      // console.log(list)
     
      this.commentList = list
      // console.log(this.commentList)
    })
    this.id = this.router.snapshot.paramMap.get('id');
    this.userService.postList(this.id).subscribe((result)=>{
      
      // console.log("result",result)
      this.postList = result
      // console.log(this.postList[0].Picture)
    })
   }

  public id: any
  commentform: any
  

  ngOnInit(): void {

    this.getAllComment();

    this.commentform = new FormGroup({

      comment: new FormControl('', [Validators.required]),

    })
  }

  getAllComment(){
    this.id = this.router.snapshot.paramMap.get('id');
    this.userService.userComment(this.id).subscribe((list)=>{
      
      // console.log("list",list)
      this.commentList = list
    })
  }

  deleteComment(id:any){
    try{
    
      // alert("Are you sure you want to delete this comment.!!!");
      if(confirm("Are you sure to delete "+id)) {
        this.userService.deleteComment(id).subscribe(
          (result:any) => {
            this.spinner.hide();
            this.getAllComment()
            this.toastr.success('Success', result.message);
    
            // this.route.navigateByUrl('/homepage');
          },
          (err:any) => {
            this.spinner.hide();
            this.toastr.error(err.error.message);
    
            if(err.error.message=='token not verified'){
              this.toastr.error(err.error.message);
    
              this.route.navigateByUrl('layout/login');
            }
            
          }
        );
        // console.log("Implement delete functionality here");
      }else{
        this.getAllComment()
      }
    
    }
    catch (error:any) {
      this.spinner.hide();
      this.toastr.error(error);
      
      return;
    }
  };

  commentPost() {
    // console.log(this.commentform.value)
    try{
      if (this.commentform.valid) {
        // this.spinner.show();
        this.id = this.router.snapshot.paramMap.get('id');
       
  
        this.userService.comment(this.id, this.commentform.value).subscribe(
          (result:any) => {
            this.toastr.success('Success', result.message);
            
            this.route.navigateByUrl('layout/homepage');
          },
          (err:any) => {
            this.spinner.hide();
            this.toastr.error(err.error.message);
            
            if(err.error.message=='token not verified'){
              this.toastr.error(err.error.message);

              this.route.navigateByUrl('layout/login');
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

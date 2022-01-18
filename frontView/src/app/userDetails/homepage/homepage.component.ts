import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPostService } from 'src/app/services';
import { baseUrl } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  // tampData = [1,2,3,4,5,6,7,8,9,0,10,11,12,13,14,15];
  // p:number = 1;

  postList: any
  image: any = `${baseUrl}/`
  data: any
  userList: any
  pageNum: any = 1
  totalRecords!: any;
  limit: any = 2
  userData: any = []
  role:any

  constructor(private Services: BlogPostService,
    public router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
  }

  navigat(id: any) {

    this.router.navigate(['/editpost', id])
    this.router.navigate(["/commentpost", id])

  }

  ngOnInit(): void {
    this.Services.currentUser().subscribe((result: any) => {

      this.userList = result
      this.userData.push(this.userList["data"])
      // console.log("55555555555",this.userData)


    })
    this.getAllPosts();

  }

  onPageChange(n: any) {

    this.pageNum = n;
    this.getAllPosts()
  }

  getAllPosts() {
    // console.log("this is " + this.pageNum);
    this.Services.usersPost(this.pageNum, this.limit).subscribe((data) => {
      this.postList = data
      this.data = this.postList["data"]
      // console.log(this.data)
      this.totalRecords = this.postList["postCount"]
    })


  }

  speciesName: string = "";


  getSearchResult() {
    // console.log(this.speciesName)
    this.Services.postSearch(this.speciesName).subscribe((result: any) => {
      this.data = result
      this.totalRecords = result.length
      this.pageNum = 1

    })
  }


  likepost(id: any) {

    this.Services.like(id).subscribe(

      (result: any) => {

        this.toastr.success('Success', result.message);
        this.spinner.hide();
        this.getAllPosts()
      },
      err => {
        this.spinner.hide();
        this.toastr.error(err.error.message);

        if (err.error.message == 'token not verified') {
          alert("you have to login first...");
          this.router.navigateByUrl('layout/login');
        }

      }
    );

  };


  // delete post by admin functionlity

  deletePost(id: any) {
    try {
      // this.spinner.show();
      if (confirm("Are you sure to delete " + id)) {
        
        this.Services.deletepost(id).subscribe(
          (result: any) => {
            this.toastr.success('Success', result.message);
            this.router.navigateByUrl('layout/homepage');
            // this.getUser()
          },
          (err: any) => {
            this.spinner.hide();

            if (err.error.message == 'token not verified') {
              this.spinner.hide();
              this.toastr.error(err.error.message);


              this.router.navigateByUrl('/login');
            }
            if (err.error.message == "Only Admin Can Delete The Post") {
              this.spinner.hide();
              // console.log(err)
              this.toastr.error(err.error.message);

              this.router.navigateByUrl('layout/homepage');
            };
          }

        );
      }
      else {
        this.router.navigateByUrl('layout/userprofile');

      }

    }
    catch (error: any) {
      this.spinner.hide();
      this.toastr.error(error);

      return;
    }

  };

  isAdmin(){
    this.role = localStorage.getItem('role')
    if(this.role=="admin"){
      return this.role
    }
  }

};

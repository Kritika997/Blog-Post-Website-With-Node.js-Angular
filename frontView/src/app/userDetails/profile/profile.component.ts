import { Component, OnInit } from '@angular/core';
import { BlogPostService } from 'src/app/services';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
import { baseUrl } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userList: any
  image: any = `${baseUrl}/`
  id: any
  singleUserPosts: any;
  userData:any=[]
  forList:any
  

  constructor(private userService: BlogPostService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }
  

  ngOnInit(): void {

    this.userService.currentUser().subscribe((result: any) => {
      // console.log(result)
      this.userList = result
      this.userData.push(this.userList["data"])
      this.forList = this.userData[0]
      // console.log(this.forList)

      this.userService.singleUserPosts(this.id).subscribe((userPosts: any) => {

        this.singleUserPosts = userPosts["data"]
        // console.log(this.singleUserPosts)
      })

    })


  }

  getUser() {

    this.userService.currentUser().subscribe((result: any) => {
      // console.log(result)
      this.userList = result

    })

  }


  deleteUser(id: any) {

    if (confirm("Are you sure to delete " + id)) {
      this.userService.deleteUser(id).subscribe(
        (result: any) => {
          this.spinner.hide();
          this.toastr.success('Success', result.message);
          this.route.navigateByUrl('layout/userprofile');

          this.route.navigateByUrl('');
          localStorage.removeItem('usertoken')
        },
        (err: any) => {
          this.spinner.hide();
          this.toastr.error(err.error.message);

          if (err.error.message == "sorry you can not delete this account..") {

            this.route.navigateByUrl('layout/homepage');
          }
        }
      );
    } else {
      this.route.navigateByUrl('layout/userprofile');
    }


  };


  deletePost(id: any) {
    // alert("Are you sure you want to delete this post.!!!");
    try {
      if (confirm("Are you sure to delete " + id)) {
        this.spinner.show();
        this.userService.deletepost(id).subscribe(
          (result: any) => {
            this.toastr.success('Success', result.message);
            this.route.navigateByUrl('layout/userprofile');
            // this.getUser()
          },
          (err: any) => {
            this.spinner.hide();

            if (err.error.message == 'token not verified') {
              this.spinner.hide();
              this.toastr.error(err.error.message);


              this.route.navigateByUrl('/login');
            }
            if (err.error.message == "Only Admin Can Delete The POst") {
              this.spinner.hide();
              this.toastr.error(err.error.message);

              this.route.navigateByUrl('layout/userprofile');
            }
          }

        );
      }
      else {
        this.route.navigateByUrl('layout/userprofile');

      }

    }
    catch (error: any) {
      this.spinner.hide();
      this.toastr.error(error);

      return;
    }

  };

}

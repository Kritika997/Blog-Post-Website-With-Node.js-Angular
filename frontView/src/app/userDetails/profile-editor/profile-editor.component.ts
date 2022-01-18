import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogPostService } from 'src/app/services';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { baseUrl } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {

  constructor(private userService: BlogPostService,
    public route: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,) { }

  profileEditForm: any
  file: any
  image: any = `${baseUrl}/`
  tempImagePage: any
  id: any
  userData: any

  ngOnInit(): void {

    this.userService.currentUser().subscribe((result: any) => {

      this.userData = result

      this.profileEditForm = new FormGroup({
        user_name: new FormControl(`${this.userData.data.user_name}`, [Validators.required]),
        user_gender: new FormControl(`${this.userData.data.user_gender}`, [Validators.required]),
        user_profile: new FormControl(``, [Validators.required]),
        user_location: new FormControl(`${this.userData.data.user_location}`, [Validators.required])
      });
    });



  }

  upload(event: any) {
    this.file = event.target.files[0]

  };

  readURL(event: any): void {

    this.tempImagePage = event.target.files[0]
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.file = reader.result;

      reader.readAsDataURL(file);

    }
  }

  update() {
    try {
      this.id = this.userData.data._id
      if (confirm("Are you sure to edit it " + this.id)) {
        let user_data: FormData = new FormData();
        user_data.append("user_name", this.profileEditForm.value.user_name)
        user_data.append("user_gender", this.profileEditForm.value.user_gender)
        user_data.append("testimage", this.tempImagePage)
        user_data.append("user_location", this.profileEditForm.value.user_location)
        const data = this.userService.editProfile(this.id, user_data).subscribe(
          (result: any) => {
            if (result.message == "Successfully updated the item.") {
              this.spinner.hide();
              this.toastr.success('Success', result.message);


              this.route.navigateByUrl('layout/userprofile');
            }

          },
          (err: any) => {
            this.spinner.hide();
            this.toastr.error(err.error.message);
            // console.log(this.errors.message)
            if (err.error.message == 'token not verified') {

              this.route.navigateByUrl('layout/login');
            }
            if (err.error.message == "Only Admin Can Edit The Post") {
              this.spinner.hide();
              this.toastr.error(err.error.message);
              this.route.navigateByUrl('layout/userprofile');
            }

          }
        );
      }else{
        this.route.navigateByUrl('layout/userprofile');
      }

    }
    catch (error: any) {
      this.spinner.hide();
      this.toastr.error(error);
      return;
    }
  }
}

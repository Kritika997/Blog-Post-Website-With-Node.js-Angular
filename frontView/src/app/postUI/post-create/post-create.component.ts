import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPostService } from 'src/app/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  file: any

  constructor(private userService: BlogPostService, public router:Router) { }

  postform: any
  ngOnInit(): void {
    // console.log("fyhxikc")
    // console.log(this.postform.value)

    this.postform = new FormGroup({
      Blog: new FormControl('', [Validators.required]),
      Picture: new FormControl('', [Validators.required]),
      // Like: new FormControl('',[Validators.nullValidator])
    })
  }

  
  upload(event: any) {
    this.file = event.target.files[0]
  };

  
  postcreate() {

    console.log(this.file);
    
    if (this.postform.value) {
      
      let user_data : FormData = new FormData();
      user_data.append("Blog",this.postform.value.Blog)
      user_data.append("testimage",  this.file)

      const data =  this.userService.createPost(user_data)
        
    } 
  }

}

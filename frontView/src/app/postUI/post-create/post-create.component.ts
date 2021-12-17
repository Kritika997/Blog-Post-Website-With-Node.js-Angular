import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  file: any

  constructor(private http: HttpClient, public router: Router) { }

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
      
      let user_token = localStorage.getItem('usertoken');
      
      // console.log(user_data);
      let user_data : FormData = new FormData();
      user_data.append("Blog",this.postform.value.Blog)
      user_data.append("testimage",  this.file)
      

      this.http.post(`${baseUrl}/createPost`, user_data,{headers: new HttpHeaders(
        { 'Authorization': `${localStorage.getItem("usertoken")}`}
      ) }).subscribe((result) => {
        // console.log("yo 3")
        console.log(result)
        if ({ message: "Post created successfully...." }) {
          // console.log("yo 4")
          alert("post have created")
        }
        else {
          console.log("yo 5")
          alert("something went wrong")
          this.router.navigateByUrl('/login')
        }
      });

    } else {
      console.log("yo ")
      alert("this post is not valid tyr again")
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogPostService } from 'src/app/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  public id: any;
  file: any

  constructor(private userService: BlogPostService, private router:ActivatedRoute) { }
  
  editPostForm: any
  
  ngOnInit(): void {
    
    this.editPostForm = new FormGroup({
      
      Blog: new FormControl('', [Validators.required]),
      Picture: new FormControl('', [Validators.required]),
    })
  }
  
  
  
  upload(event: any) {
    this.file = event.target.files[0]
  };
  
  
  updatepost() {
    
    if (this.editPostForm.value) {
    this.id = this.router.snapshot.paramMap.get('id');
    console.log(this.id)
      
      let post_data: FormData = new FormData();
      post_data.append("Blog", this.editPostForm.value.Blog)
      post_data.append("testimage", this.file);

      const data = this.userService.editpost(this.id,post_data);
      
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { BlogPostService } from 'src/app/services';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private userService: BlogPostService, private router: ActivatedRoute) { }

  public id: any
  commentform: any

  ngOnInit(): void {
    this.commentform = new FormGroup({

      comment: new FormControl('', [Validators.required]),

    })
  }

  commentPost() {
    console.log(this.commentform.value)
    if (this.commentform.valid) {
      this.id = this.router.snapshot.paramMap.get('id');
      // console.log(this.id)

      this.userService.comment(this.id, this.commentform.value)

    }

  }
}

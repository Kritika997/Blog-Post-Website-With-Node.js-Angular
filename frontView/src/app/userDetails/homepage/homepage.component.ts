
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPostService } from 'src/app/services';
import { baseUrl } from 'src/environments/environment';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  title = "API Call"
  postList:any
  image:any = `${baseUrl}/`

  constructor(private Services:BlogPostService, public router:Router) { 
    this.Services.users().subscribe((data)=>{
      
      console.log("data",data)
      this.postList = data
    })
  }

  navigat(id:any){
    
    this.router.navigate(['/editpost', id])
    this.router.navigate(["/commentpost",id])
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(){
    this.Services.users().subscribe((data)=>{
      
      // console.log("data",data)
      this.postList = data
    })
  }

  deletePost(id:any){
    alert("Are you sure you want to delete this post.!!!");
    this.Services.deletepost(id).subscribe((data:any)=>{
      if(data.error){
        console.log(data)
      }
      this.getAllPosts();
    });
  };

  likepost(id:any){

    this.Services.like(id).subscribe((data:any) => {
      console.log(data)
      
      if (data.error) {
        console.log(data)
        
      }
      else {
        this.getAllPosts();
        // this.router.navigateByUrl('/login');
      };

    });

  }

  

}

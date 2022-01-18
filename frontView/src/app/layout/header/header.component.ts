import { Component, OnInit } from '@angular/core';
import { BlogPostService } from 'src/app/services';
import { baseUrl } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userList:any
  image: any = `${baseUrl}/`
  userData:any=[]
  

  constructor(private userService:BlogPostService,
  private  route:Router) { }

  ngOnInit(): void {
    this.userService.currentUser().subscribe((result: any) => {
      // console.log("........................",result)
      this.userList = result
      this.userData.push(this.userList["data"])

    })
  }


  loggedIn() {
    return localStorage.getItem('usertoken')
  }

  onLogOut() {
    // this.spinner.hide();
    this.route.navigateByUrl('/login');
    return localStorage.removeItem('usertoken')
    // this.route.navigateByUrl('/login');

  }

}

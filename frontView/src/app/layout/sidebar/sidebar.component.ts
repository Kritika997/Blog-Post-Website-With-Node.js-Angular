import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  loggedIn() {
    return localStorage.getItem('usertoken')
  }

  onLogOut() {
    
    this.route.navigateByUrl('/login');
    return localStorage.removeItem('usertoken')
   
  }


}

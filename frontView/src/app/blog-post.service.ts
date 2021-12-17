import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient , public router : Router) { }

  

  // ekyclist: any = (params:any) => this.http.get(API_URL+"users/list",{headers: new HttpHeaders(   
  //   { 'content-type': 'application/json',Authorization: `${localStorage.getItem("token")}`}
  // ),params: params});
}
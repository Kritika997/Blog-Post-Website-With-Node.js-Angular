import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { baseUrl } from 'src/environments/environment';
// import { Console } from 'console';


@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient, public router: Router) { }


  userRegister(user:any){
    this.http.post(`${baseUrl}/signup`,user).subscribe((result:any) => {

      console.log(result);
      
      if(result.error){
        console.log(result)
        
      }
      else{
        this.router.navigateByUrl('/login');
        
      };
    })
  }

  loginUser(data:any){
    this.http.post(`${baseUrl}/login`,data).subscribe((result:any) => {
      // console.log(result)

      

      if(result.error){
        console.log(result)
        // alert(result.error["msg"])
        
      }
      else{
        localStorage.setItem ('usertoken', result.cookie);
        this.router.navigateByUrl('/homepage')
      };
      
    });
  }

  forgetPassword(result:any){
    return this.http.post(`${baseUrl}/forgetpassword`,result);
      
  }

  otpVerificaton(result:any){
    return this.http.post(`${baseUrl}/otpverification`,result,
    {headers: new HttpHeaders(
      { 'Authorization': `${localStorage.getItem("token")}`}
    )}
    );
      
  }

  users() {
    return this.http.get(`${baseUrl}/usersPosts`)

  }

  createPost(data: any){

    this.http.post(`${baseUrl}/createPost`, data, {
      headers: new HttpHeaders(
        { 'Authorization': `${localStorage.getItem("usertoken")}` }
      )
    }).subscribe((data: any) => {
      if (data.error) {
        
        console.log(data)
      }
      else {
        this.router.navigateByUrl('/homepage');
      };

    });
  }

  editpost(id:any,data:any){

    this.http.put(`${baseUrl}/editPost/${id}`, data,{
      headers: new HttpHeaders(
        { 'Authorization': `${localStorage.getItem("usertoken")}` }
      )
    }).subscribe((data: any) => {
      if (data.error) {
        console.log(data)
      }
      else {
        
        this.router.navigateByUrl('/homepage')
      }
    })
  }

  comment(id: any, data:any) {

    return this.http.post(`${baseUrl}/Comment/${id}`, data,{
      headers: new HttpHeaders(
        { 'Authorization': `${localStorage.getItem("usertoken")}` }
      )
    }).subscribe((data: any) => {
      if (data.error) {
        
      console.log(data)
      }
      else {
        this.router.navigateByUrl('/homepage');
      };

    });
  }

  deletepost(id: any) {

    return this.http.delete(`${baseUrl}/deletePost/${id}`,{
      headers: new HttpHeaders(
        {'Authorization': `${localStorage.getItem("usertoken")}`}
      )
    });
  };

  like(id: any) {

    return this.http.get(`${baseUrl}/likePost/${id}`,{
      headers: new HttpHeaders(
        { 'Authorization': `${localStorage.getItem("usertoken")}` }
      )
    })
  };

  
};
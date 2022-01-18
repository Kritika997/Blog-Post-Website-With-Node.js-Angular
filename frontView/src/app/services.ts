import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { baseUrl } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient, public router: Router,/* private toastr: ToastrService */) { }

  loggedIn() {
    return !! localStorage.getItem('usertoken')
  }

  userRegister(user:any){
    return this.http.post(`${baseUrl}/signup`,user)
  }
  
  editpost(id:any,data:any){

    return this.http.put(`${baseUrl}/editPost/${id}`, data,{
      headers: new HttpHeaders(
        { 'Authorization': `${localStorage.getItem("usertoken")}` }
      )
    })
  }

  deletepost(id: any) {
    return this.http.delete(`${baseUrl}/deletePost/${id}`,{
      headers: new HttpHeaders(
        {'Authorization': `${localStorage.getItem("usertoken")}`}
      )
    });
  };

  deleteUser(id: any) {

    return this.http.delete(`${baseUrl}/userDelete/${id}`,{
      headers: new HttpHeaders(
        {'Authorization': `${localStorage.getItem("usertoken")}`}
      )
    });
  };


  loginUser(data:any){
    return this.http.post(`${baseUrl}/login`,data)
  }


  forgetPassword(result:any){
    return this.http.post(`${baseUrl}/forgetpassword`,result);
      
  }

  changePassword(result:any){
    return this.http.post(`${baseUrl}/ChangePassword`,result,
    {headers: new HttpHeaders(
      { 'Authorization': `${localStorage.getItem("usertoken")}`}
    )}
    );
  }

  otpVerificaton(result:any){
    return this.http.post(`${baseUrl}/otpverification`,result,
    {headers: new HttpHeaders(
      { 'Authorization': `${localStorage.getItem("token")}`}
    )}
    );
      
  }
  editProfile(id:any,data:any){

    return this.http.put(`${baseUrl}/editProfile/${id}`, data,{
      headers: new HttpHeaders(
        { 'Authorization': `${localStorage.getItem("usertoken")}` }
      )
    })
  }

  currentUser() {
    return this.http.get(`${baseUrl}/specificUser`,{
      headers: new HttpHeaders(
        { 'Authorization': `${localStorage.getItem("usertoken")}` }
      )
    })
  }
  
  singleUserPosts(id:any){
    
    return this.http.get(`${baseUrl}/specificUserPost/${id}`,{
      headers: new HttpHeaders(
        { 'Authorization': `${localStorage.getItem("usertoken")}` }
      )
    })
    
  }


  usersPost(pageNum:any,limit:any) {
    return this.http.get(`${baseUrl}/usersPosts?page=${pageNum}&limit=${limit}`)
  }

  userList(pageNum:any,limit:any){
    return this.http.get(`${baseUrl}/usersList?page=${pageNum}&limit=${limit}`)
  }

  userSearch(user_name:any){
    return this.http.get(`${baseUrl}/userSearch?name=${user_name}`)
  }

  postSearch(title:any){
    return this.http.get(`${baseUrl}/postSearch?title=${title}`)
    }
  

  userComment(id:any){
    return this.http.get(`${baseUrl}/userComments/${id}`)
  }

  postList(id:any){
    // console.log("wertyuiop",id)
    return this.http.get(`${baseUrl}/postList/${id}`)
  }

 

  createPost(data: any){

    return this.http.post(`${baseUrl}/createPost`, data, {
      headers: new HttpHeaders(
        { 'Authorization': `${localStorage.getItem("usertoken")}` }
      )
    })
  }

  

  comment(id: any, data:any) {

    return this.http.post(`${baseUrl}/Comment/${id}`, data,{
      headers: new HttpHeaders(
        { 'Authorization': `${localStorage.getItem("usertoken")}` }
      )
    })
  }

  
  deleteComment(id:any){
    // console.log(id)
    return this.http.delete(`${baseUrl}/deleteComment/${id}`,{
      headers: new HttpHeaders(
        {'Authorization': `${localStorage.getItem("usertoken")}`}
      )
    });
  }

  like(id: any) {

    return this.http.get(`${baseUrl}/likePost/${id}`,{
      headers: new HttpHeaders(
        { 'Authorization': `${localStorage.getItem("usertoken")}` }
      )
    })
  };

 
};
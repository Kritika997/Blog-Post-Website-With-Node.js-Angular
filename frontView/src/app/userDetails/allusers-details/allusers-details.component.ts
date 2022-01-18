import { Component, OnInit } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { BlogPostService } from 'src/app/services';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-allusers-details',
  templateUrl: './allusers-details.component.html',
  styleUrls: ['./allusers-details.component.css']
})
export class AllusersDetailsComponent implements OnInit {
  // array:any = [2,3,4,67,876,4,7]
  userImage: any = `${baseUrl}/`
  userList:any
  data: any;
  CurrentUser:any
  pageNum:any = 1
  totalRecords!: any;
  limit:any=2
  users: any;
  userData:any = []
  role:any

  constructor(private Services: BlogPostService,
     private router: Router,
     private spinner:NgxSpinnerService,
     private toastr:ToastrService) {    
   }

   navigat(id: any) {

    this.router.navigate(['/profileEditor', id])
    this.router.navigate(['/homepage', id])
    
  }

  ngOnInit(): void {
    this.Services.currentUser().subscribe((result: any) => {
      // console.log(result)
      this.CurrentUser = result
      this.userData.push(this.CurrentUser["data"])
      console.log(this.userData)
    })
    this.getAllUsers()
    
  }

  onPageChange(num:any){
    
    this.pageNum = num;
    this.getAllUsers()
  }

  getAllUsers(){
    
    this.Services.userList(this.pageNum,this.limit).subscribe((result:any)=>{
      // console.log(result)
      this.userList=result
      // console.log(this.userList)
      this.data =  this.userList["data"]
      // console.log(this.data)
      this.totalRecords = this.userList["total"]
      // console.log(this.totalRecords)
    })
  }

  speciesName: string = "";
  
  getSearchResult() {
    // console.log(this.speciesName)
    this.Services.userSearch(this.speciesName).subscribe((result:any)=>{
      // console.log(result)
      this.data = result

      this.totalRecords = result.length
      // console.log(result.length)
    })
    
  }

  deleteUser(id: any) {
    // console.log(id)
    if (confirm("Are you sure to delete " + id)) {
      this.Services.deleteUser(id).subscribe(
        (result: any) => {
          this.spinner.hide();
          this.toastr.success('Success', result.message);
          this.getAllUsers()
          // this.router.navigateByUrl('layout/alluserdetails');

        },
        (err: any) => {
          this.spinner.hide();
          this.toastr.error(err.error.message);

          if (err.error.message == "sorry you can not delete this account..") {

            this.router.navigateByUrl('layout/homepage');
          }
        }
      );
    } else {
      this.router.navigateByUrl('layout/alluserdetails');
    }


  };

  isAdmin(){
    this.role = localStorage.getItem('role')
    if(this.role=="admin"){
      return this.role
    }
  }


}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule,   } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



import { AppComponent } from './app.component';
import { RegisterComponent } from './userDetails/register/register.component';
import { LoginComponent } from './userDetails/login/login.component';
import { ForgetpasswordComponent } from './userDetails/forgetpassword/forgetpassword.component';
import { OtpverificationComponent } from './userDetails/otpverification/otpverification.component';
import { PostCreateComponent } from './postUI/post-create/post-create.component';
import { HomepageComponent } from './userDetails/homepage/homepage.component';
import { EditPostComponent } from './postUI/edit-post/edit-post.component';
import { CommentComponent } from './postUI/comment/comment.component';
import { AllusersDetailsComponent } from './userDetails/allusers-details/allusers-details.component';
import { ProfileComponent } from './userDetails/profile/profile.component';
import { ProfileEditorComponent } from './userDetails/profile-editor/profile-editor.component';
import { GoogleLoginComponent } from './userDetails/google-login/google-login.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotFoundErrorComponent } from './not-found-error/not-found-error.component';
import { AuthGuard } from './auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgetpasswordComponent,
    OtpverificationComponent,
    PostCreateComponent,
    HomepageComponent,
    EditPostComponent,
    CommentComponent,
    AllusersDetailsComponent,
    ProfileComponent,
    ProfileEditorComponent,
    GoogleLoginComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ChangePasswordComponent,
    NotFoundErrorComponent,
    // PipesPipe,
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    InfiniteScrollModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({timeOut:8000}),
    MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule,
    // ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: LayoutComponent, children:[ { path: '', component: HomepageComponent },] },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgetpassword', component: ForgetpasswordComponent },
      { path: 'otpverification', component:OtpverificationComponent },
      { path: 'googleLogin', component:GoogleLoginComponent},
      { path: 'layout',component:LayoutComponent, canActivate:[AuthGuard], children:[
        { path: 'homepage', component: HomepageComponent },
        { path: 'createpost', component:PostCreateComponent},
        { path: '', component:HomepageComponent},
        { path: 'editpost/:id', component:EditPostComponent},
        { path: 'commentpost/:id', component:CommentComponent},
        { path: 'alluserdetails',component:AllusersDetailsComponent},
        { path: 'userprofile',component:ProfileComponent},
        { path: 'editProfile', component:ProfileEditorComponent},
        { path:'changePassword',component:ChangePasswordComponent},
      ]},
      { path: '**', component:NotFoundErrorComponent},
      
      
    ])

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

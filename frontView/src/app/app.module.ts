import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule,   } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { RegisterComponent } from './userDetails/register/register.component';
import { LoginComponent } from './userDetails/login/login.component';
import { ForgetpasswordComponent } from './userDetails/forgetpassword/forgetpassword.component';
import { OtpverificationComponent } from './userDetails/otpverification/otpverification.component';
import { PostCreateComponent } from './postUI/post-create/post-create.component';
import { HomepageComponent } from './userDetails/homepage/homepage.component';
import { EditPostComponent } from './postUI/edit-post/edit-post.component';
import { CommentComponent } from './postUI/comment/comment.component';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule,
    RouterModule.forRoot([
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgetpassword', component: ForgetpasswordComponent },
      { path: 'otpverification', component:OtpverificationComponent },
      { path: 'createpost', component:PostCreateComponent},
      { path: 'homepage', component:HomepageComponent},
      { path: 'editpost/:id', component:EditPostComponent},
      { path: 'commentpost/:id', component:CommentComponent}
    ])

  ],
  // providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HomepageComponent } from './userDetails/homepage/homepage.component';
// import { LoginComponent } from './userDetails/login/login.component';
// import { RegisterComponent } from './userDetails/register/register.component';
const routes: Routes = [
  // {path:'home', component:HomepageComponent},
  // {path:'registration',component:RegisterComponent},
  // {path: 'login', component:LoginComponent},
  // {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
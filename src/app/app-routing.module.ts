import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AttendanceComponent } from './user/attendance/attendance.component';
import { AddClassComponent } from './user/add-class/add-class.component';
import { ShowComponent } from './user/show/show.component';
import { AddStudentComponent } from './user/add-student/add-student.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'register', component:RegisterComponent}, 
  {path:'login', component:LoginComponent},
  {path:'user',component:UserComponent},
  {path:'user/attendance',component:AttendanceComponent},
  {path:'user/show',component:ShowComponent},
  {path:'user/addclass',component:AddClassComponent},
  {path:'user/addstudent',component:AddStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

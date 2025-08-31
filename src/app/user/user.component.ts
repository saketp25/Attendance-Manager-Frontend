import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor (private myService:MyServiceService,private router:Router){}
  loading:boolean=false;
  user:String=this.myService.getCurrentUser();
  allClasses:any=this.myService.getTeacherData();

  takeAttendance=async(id:string,className:String,total:number)=>{
    this.loading=true;
    await this.myService.getStudent(id);
    this.myService.setClassId(id);
    this.myService.setCurrentClass(className);
    this.myService.setTotal(total)
    this.loading=false;
    this.router.navigate(['/user/attendance'])
  }
  showAttendance=async (clas:any)=>{
    this.loading=true;
    await this.myService.getStudent(clas._id);
    this.myService.setClassId(clas._id);
    this.myService.setCurrentClass(clas.className);
    this.myService.setTotal(clas.Total);
    this.loading=false;
    this.router.navigate(['/user/show'])
  }
}

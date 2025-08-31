import { Component } from '@angular/core';
import { MyServiceService } from 'src/app/my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  constructor(private myService:MyServiceService, private router:Router){}
  className=this.myService.getCurrentClass();
  students:any=this.myService.getStudents();
  total=this.myService.getTotal();
  loading:boolean=false;
  onClick(a:any){
    a.isPresent=!a.isPresent;
  }
  saveAttendance=async()=>{
    try {
      this.loading=true;
      this.myService.increaseTotal();
      this.total=this.myService.getTotal();
      const data ={
        stds:this.students
      }
      await this.myService.saveAttendance(data)
      let id=this.myService.getId();
      await this.myService.getData(id);
      this.loading=false
      this.router.navigate(['/user'])
    } catch (error) {
      console.log(error)
    }
    
  }
}
